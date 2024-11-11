import { render, screen } from '@testing-library/react'
import ContactPage from '@/app/connect/page'

jest.mock('@/components/forms/message', () => ({
  MessageForm: () => <div data-testid="message-form">Mocked MessageForm</div>
}))

describe('ContactPage', () => {
  it('renders contact page with title and description', () => {
    render(<ContactPage />)
    
    expect(screen.getByRole('heading', { name: /contact sean/i })).toBeInTheDocument()
    expect(screen.getByText(/fill out the form below/i)).toBeInTheDocument()
    expect(screen.getByTestId('message-form')).toBeInTheDocument()
  })
})