import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ConnectPage from '@/app/connect/page';

// Mock the Cal component
jest.mock('@calcom/embed-react', () => ({
  __esModule: true,
  default: ({ calLink }: { calLink: string }) => (
    <div data-testid="cal-embed" data-callink={calLink}>
      Cal.com Embed Component (Mocked)
    </div>
  ),
}));

describe('ConnectPage Component', () => {
  it('renders the connect page correctly', () => {
    render(<ConnectPage />);

    // Check that the heading and description are rendered
    expect(screen.getByText('Connect')).toBeInTheDocument();
    expect(screen.getByText(/If you've found value in my writing and insights/)).toBeInTheDocument();
    
    // Check that the Cal.com component is rendered
    const calComponent = screen.getByTestId('cal-embed');
    expect(calComponent).toBeInTheDocument();
    expect(calComponent).toHaveAttribute('data-callink', 'ssilvius');
  });
});