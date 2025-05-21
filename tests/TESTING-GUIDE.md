# Testing Guidelines for the Website Project

## Overview

This document outlines best practices for writing and maintaining tests for our website project.

## Test Organization

Our tests are organized as follows:

- `tests/unit/`: Contains all unit tests using Jest

## Running Tests

```bash
# Run all tests
pnpm test

# Run unit tests
pnpm test:unit
```

## Debugging Failures

1. Check Jest output for detailed error information
2. Use Jest's `--verbose` flag for more detailed output
3. Consider using Jest's watch mode for development

## CI Integration

Tests run automatically on pull requests.
