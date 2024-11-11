import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { sql } from 'drizzle-orm';
import { z } from 'zod';

export const messages = pgTable('messages', {
  id: uuid('id').default(sql`uuidv7()`).primaryKey(),
  name: text('name').notNull(),
  company: text('company'),
  email: text('email').notNull(),
  phone: text('phone'),
  message: text('message').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const insertMessageSchema = createInsertSchema(messages, {
  name: z.string().min(2, 'Please share your name'),
  email: z.string().email('Invalid email address'),
  message: z.string().max(1000).min(10, 'Message must be at least 10 characters'),
})

export const selectMessageSchema = createSelectSchema(messages)

export type Message = z.infer<typeof selectMessageSchema>
export type NewMessage = z.infer<typeof insertMessageSchema>