'use server'

import { db } from '@/db'
import { messages, insertMessageSchema, type NewMessage } from '@/db/schema'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export async function createMessage(formData: NewMessage) {
  console.log('Received formData:', formData) // Log incoming data

  try {
    // Validation phase
    console.log('Attempting to validate fields...')
    const validatedFields = insertMessageSchema
      .omit({
        id: true,
        createdAt: true,
        updatedAt: true
      })
      .parse(formData)
    console.log('Validation successful:', validatedFields)

    // Database insertion phase
    console.log('Attempting database insertion...')
    const [message] = await db.insert(messages).values({
      ...validatedFields,
      company: validatedFields.company || null,
      phone: validatedFields.phone || null,
    }).returning()
    console.log('Database insertion successful:', message)

    revalidatePath('/connect')
    return { success: true, data: message }
  } catch (error) {
    // Detailed error logging
    console.error('Error in createMessage:', error)
    
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.flatten().fieldErrors)
      return { success: false, errors: error.flatten().fieldErrors }
    }

    // Database errors
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        name: error.name,
        stack: error.stack
      })

      // Check for specific database errors
      if (error.message.includes('duplicate key')) {
        return {
          success: false,
          errors: {
            form: ['A record with this information already exists.']
          }
        }
      }

      if (error.message.includes('foreign key')) {
        return {
          success: false,
          errors: {
            form: ['Invalid reference to related data.']
          }
        }
      }
    }
    
    return { 
      success: false, 
      errors: { 
        form: ['Failed to send message. Please try again.'] 
      } 
    }
  }
}