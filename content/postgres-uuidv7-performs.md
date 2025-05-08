---
id: Lqj8a0
slug: postgres-uuidv7-performs
featured: true
title: Primary Key UUIDs Finally Make Sense with v7
date: 2024-08-22T18:00:00.000Z
excerpt: >-
  Relational databases have been using sequences as primary keys since dBASE and
  FoxPro. As our databases have become exceedingly large, and stored in multiple
  locations across many parts of clusters the sequential keys have become
  problematic.
tags:
  - PostgreSQL
  - architecture
author:
  name: Sean Silvius
  picture: /images/profile.jpg
draft: false
---

**UPDATE: 27 Sept 2024** *Postgres 17 was released a couple days ago and UUIDv7 is still in review [UUID v7](https://commitfest.postgresql.org/47/4388/) status. I suggest staying with these solitions for the foreseeable future. I've added how to use UUIDv7 with NextJS and Drizzle. You can modify it for everything else type/javascript.*

Random string formats have become required for big data and fashionable to disguise identifiers from prying eyes on the web. There has been way too much time spent on the question, "What is a good primary key?". At first, the Universally Unique IDentifier (UUID) was a bad idea for lookups backed by an index, especially a standard [BTREE]([B-tree - Wikipedia](https://en.wikipedia.org/wiki/B-tree)). The index storage space was double or triple the data on disk. Using [BRIN]([Block Range Index - Wikipedia](https://en.wikipedia.org/wiki/Block_Range_Index)) indexes solved this for Postgres, Oracle has Exadata, on MySQL, I would not use UUIDs but compound keys, it is out of scope for this article. You can read about how [Shopify solved its performance issues]((https://shopify.engineering/how-to-introduce-composite-primary-keys-in-rails)). Don't worry about index type until you see index performance issues, then switch.

I have been hopeful that UUIDv7 would remove a lot of performance bottlenecks. About a year ago I read an early [benchmark]([Postgres: Benchmark UUIDv4 vs UUIDv7 Primary Keys 🔑 &middot; mblum.me 🥝](https://mblum.me/posts/pg-uuidv7-benchmark/)), I've been waiting since. Well, I'm done waiting. Postgresql 16 will not get native support for UUIDv7, it will be a Postgres 17 feature. I set out to solve this problem for my projects and products.

[RFC 9562](https://www.rfc-editor.org/rfc/rfc9562) was updated last May to finalize UUIDv7. V7 offers the first structure developed with database indexes in mind. The values generated are consecutively sorted based on time. Currently, there are several proof-of-concept extensions for Postgres however they are all in "untrusted languages". I'll wait until the official extension is released. Until then, while using Postgresql 14 - 16, you can write a pure SQL function to provide V7 UUIDs.

## The Spec

A UUID is a 128bit string, v7 is structured as so:

```
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                           unix_ts_ms                          |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|          unix_ts_ms           |  ver  |       rand_a          |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|var|                        rand_b                             |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                            rand_b                             |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

- `unix_ts_ms`:
   Unix Epoch timestamp, occupies bits 0 through 47 (octets 0-5).
- `ver`:
   The 4-bit version field, occupies bits 48 through 51 of octet 6.
- `rand_a`:
   12 bits of pseudorandom data to provide uniqueness, optional constructs to guarantee additional monotonicity. Occupies bits 52 through 63 (octets 6-7).
- `var`:
   The 2-bit variant field set to 0b10. Occupies bits 64 and 65 of octet 8.
- `rand_b`:
   The final 62 bits of pseudorandom data provide uniqueness. Occupies bits 66 through 127 (octets 8-15).

As you can see this structure is very straight forward and when compared to V4, to gain the time-based sequence all we need to do is replace the first half of a V4 with the unix timestamp. Since we do expect 1000s of inserts per second, we need to ensure we store the milliseconds as well. 

### SQL Function

```sql
CREATE FUNCTION uuidv7() RETURNS uuid
AS $$
 select encode(
   substring(int8send(floor(t_ms)::int8) from 3) ||
   int2send((7<<12)::int2 | ((t_ms-floor(t_ms))*4096)::int2) ||
   substring(uuid_send(gen_random_uuid()) from 9 for 8)
  , 'hex')::uuid
  from (select extract(epoch from clock_timestamp())*1000 as t_ms) s
$$ LANGUAGE sql volatile;
```

Here we use the existing `gen_random_uuid()` and replace the first 62 bits with a unix timestamp, the version, and milliseconds of the insert. Simple and easy to use with Postgres installs where you have the privileges to create functions.

### Rails UUIDv7 Primary Keys

First things first, tell Postgres you are going to be using UUIDs. Technically we don't need this to work, but rails will default to the v4 generator. 

```ruby
class EnablePgcrypto < ActiveRecord::Migration[7.2]
  def change
    enable_extension 'pgcrypto'
  end
end
```

Now, let's tell the generators that UUIDs should default primary key, create the file `config/initializers/generators.rb`

```ruby
config.generators do |generate|
  generate.orm :active_record, primary_key_type: :uuid
end
```

Now we need to create the UUID inside the rails app. Since we told rails to use UUID primary keys, let's ensure every create has a UUID and ensure it's v7. Edit `app/models/application_record.rb`

```ruby
# frozen_string_literal: true

require "securerandom"

class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class

  before_create :generate_uuid_v7

  private

  def generate_uuid_v7
    return if self.class.attribute_types["id"].type != :uuid

    self.id ||= SecureRandom.uuid_v7
  end
end
```

**NOTE** If you get errors from `SecureRandom` you are on an older Ruby version, you can upgrade Ruby or use the uuidv7 gem.



## NextJS and Drizzle ORM

As of this writing, Supabase does not support v7, you can use the function above. With Vercel and Neon (same platform) you can add [pg_uuidv7 extension](https://github.com/fboulnois/pg_uuidv7) and specify the use by specifying the default value like so in your tables: 



Extension:

```typescript
export const accounts = pgTable("accounts", {
    id: uuid("id")
        .default(sql`uuid_generate_v7()`)
        .primaryKey(),
    ...
}
```



Function:

```typescript
export const accounts = pgTable("accounts", {
    id: uuid("id")
        .default(sql`uuidv7()`)
        .primaryKey(),
    ...
}
```
