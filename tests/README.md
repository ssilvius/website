# Testing Architecture

This document outlines the testing architecture for the website.

## Directory Structure

```
tests/
├── factories/        # Test factories for generating test data
└── unit/             # Jest unit tests
    └── app/          # Tests for Next.js app components
```

## Testing Technologies

- **Unit Tests**: Jest + React Testing Library for component testing

## Running Tests

```bash
# Run all Jest unit tests
pnpm test:unit
```

## Test Configuration Files

- `jest.config.ts`: Configuration for Jest unit tests
- `jest.setup.ts`: Setup file for Jest tests

## Best Practices

1. **Unit Tests**: Focus on component logic and rendering

## CI Integration

All tests run automatically on GitHub Actions:
- Unit tests run on every PR and push to main

## Adding New Tests

- For unit tests: Add to the appropriate folder under `tests/unit/`
- For data factories: Add to `tests/factories/`
