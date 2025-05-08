---
id: kHv3JW
featured: false
slug: scaling-with-ruby-on-rails
title: 'Scaling with Ruby on Rails: An Introduction'
date: 2024-03-19T17:00:00.000Z
excerpt: >-
  Ruby on Rails is a popular web application framework known for its
  productivity and developer-friendly features.
tags:
  - startups
  - Scaling
  - Ruby on Rails
  - postgres
author:
  name: Sean Silvius
  picture: /images/profile.jpg
draft: false
---

Since the release of Ruby on Rails 7.0 (RoR) the framework has had a large resurgence in popularity. A few months ago with the release of Turbo 8, it is full steam ahead again. The founder of RoR and CTO at 37 Signals has written a few articles about how 37 Signals has taken their apps out of the cloud and is seeing massive successes as well as much lower costs. With future versions of Rails, we expect full support for simple PWA installable websites drastically simplifying deploying to mobile. With all of this, Rails is again the framework to go from idea to unicorn, swiftly.

Here are some basic scaling strategies for Ruby on Rails applications:

### Database Scaling:

- Horizontal Scaling: Implement database replication and sharding to distribute data across multiple servers, improving read performance and fault tolerance. The use of [Maglev](https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/44824.pdf)](https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/44824.pdf) is highly suggested.
  Materialized Views: Not just cached queries but the data too. Materialized views need to be refreshed periodically. See the [Scenic Gem](https://github.com/scenic-views/scenic) for more info.
  
  ### Application Scaling:
  
  - Implement load balancing and deploy multiple application server instances behind a load balancer to distribute incoming requests across multiple servers. The author of Ruby on Rails has crafted [Kamal](https://kamal-deploy.org/) to help with this.
  - Background Jobs: Offload time-consuming tasks like file processing, email sending, or data analysis to background jobs using Solid Queue, freeing up your application servers for handling web requests. [Solid Queue](https://github.com/basecamp/solid_queue) has become very rapidly the easiest way to handle and manage background jobs.
  - Asset Serving and Content Delivery:
    - Content Delivery Network (CDN): Leverage a CDN like Cloudflare or AWS CloudFront to serve static assets (images, CSS, JavaScript) from edge locations closer to your users, reducing latency and improving load times.
    - Asset Hosting: Host static assets separately from your application servers, using services like Amazon S3 or DigitalOcean Spaces, offloading asset serving from your application servers.
  - Caching and Performance Optimization:
    - Page Caching: Implement page caching to serve cached versions of frequently accessed pages, reducing server load.
    - Query Caching: Utilize Rails' built-in query caching to cache the results of expensive database queries, improving response times. In addition, creating sub-queries of expensive but slow-changing data has become one of the first steps to high-performance Rails. Take a look at [Solid](https://github.com/rails/solid_cache) Cache](https://github.com/rails/solid_cache) as it can provide much larger caches at drastically lower pricing than using Redis or Memedcache. It will also keep your DevOps people sane.

### Monitoring and Logging:

- Performance Monitoring: Implement monitoring tools like New Relic or Skylight to monitor your application's performance, identify bottlenecks, and receive alerts when performance degrades.
- Logging: Implement centralized logging (e.g., using a service like Logstash or Papertrail) to aggregate and analyze logs from all application components, aiding in debugging and performance optimization.

By implementing these basic scaling strategies, you can ensure that your Ruby on Rails application can handle increasing traffic and user loads while maintaining optimal performance and reliability.
