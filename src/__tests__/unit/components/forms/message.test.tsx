import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MessageForm } from '@/components/forms/message'
import { createMessage } from '@/actions/message'

jest.mock('@/actions/message', () => ({
  createMessage: jest.fn(),
}))

describe('MessageForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders all form fields', () => {
    render(<MessageForm />)
    
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
  })

  it('shows validation errors for required fields', async () => {
    render(<MessageForm />)
    
    const submitButton = screen.getByRole('button', { name: /send message/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText((content) => content.includes('Please share your name'))).toBeInTheDocument()
      expect(screen.getByText((content) => content.includes('Invalid email address'))).toBeInTheDocument()
      expect(screen.getByText((content) => content.includes('Message must be at least 10 characters'))).toBeInTheDocument()
    })
    
  })

  it('submits form successfully', async () => {
    (createMessage as jest.Mock).mockResolvedValue({ success: true })

    render(<MessageForm />)
    
    await userEvent.type(screen.getByLabelText(/name/i), 'John Doe')
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com')
    await userEvent.type(screen.getByLabelText(/message/i), 'This is a test message that is long enough')
    
    const submitButton = screen.getByRole('button', { name: /send message/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument()
    })

    expect(createMessage).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      company: '',
      phone: '',
      message: 'This is a test message that is long enough',
    })
  })

  it('handles submission error', async () => {
    (createMessage as jest.Mock).mockResolvedValue({ 
      success: false, 
      errors: { form: ['Failed to send message'] } 
    })

    render(<MessageForm />)
    
    await userEvent.type(screen.getByLabelText(/name/i), 'John Doe')
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com')
    await userEvent.type(screen.getByLabelText(/message/i), 'This is a test message that is long enough')
    
    const submitButton = screen.getByRole('button', { name: /send message/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/failed to send message/i)).toBeInTheDocument()
    })
  })
})
