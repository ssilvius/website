# Testing Architecture

This document outlines the testing architecture for the website.

## Directory Structure

```
tests/
├── e2e/              # Playwright end-to-end and visual tests
│   ├── example.spec.ts
│   ├── topbar-responsive.spec.ts
│   └── topbar-visual.spec.ts
├── factories/        # Test factories for generating test data
└── unit/             # Jest unit tests
    └── app/          # Tests for Next.js app components
```

## Testing Technologies

- **Unit Tests**: Jest + React Testing Library for component testing
- **E2E Tests**: Playwright for browser automation and user flow testing
- **Visual Tests**: Playwright for visual regression testing

## Running Tests

```bash
# Run all Jest unit tests
pnpm test:unit

# Run all Playwright E2E tests
pnpm test:e2e

# Run topbar-specific tests
pnpm test:topbar

# Update visual snapshots
pnpm test:visual

# Run tests with UI for debugging
pnpm test:visual:ui
```

## Visual Testing

We use visual regression testing to catch unintended UI changes, especially responsive design issues on mobile devices. See [VISUAL-TESTING.md](./VISUAL-TESTING.md) for details.

## Test Configuration Files

- `jest.config.ts`: Configuration for Jest unit tests
- `jest.setup.ts`: Setup file for Jest tests
- `playwright.config.ts`: Configuration for Playwright E2E and visual tests

## Best Practices

1. **Unit Tests**: Focus on component logic and rendering
2. **E2E Tests**: Focus on user flows and interactions 
3. **Visual Tests**: Focus on UI appearance across different devices

## CI Integration

All tests run automatically on GitHub Actions:
- Unit tests run on every PR and push to main
- Visual tests run on every PR and push to main, with artifacts for review

## Adding New Tests

- For unit tests: Add to the appropriate folder under `tests/unit/`
- For E2E tests: Add to `tests/e2e/`
- For data factories: Add to `tests/factories/`
