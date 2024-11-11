import '@testing-library/jest-dom'
import fetchMock from 'jest-fetch-mock'
import '@testing-library/jest-dom'

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }
  },
  useParams() {
    return {}
  },
}))

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}))

fetchMock.enableMocks()