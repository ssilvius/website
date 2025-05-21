# Visual Testing with Playwright

This document outlines how to use Playwright for visual regression testing in our project.

## Overview

We use Playwright to detect UI regressions, particularly for responsive design issues on mobile devices. The tests capture screenshots of key UI components across different viewport sizes and compare them against baseline images.

## Running the Tests

To run visual tests:

```bash
# Run all tests
pnpm test

# Run only topbar tests
pnpm test:topbar

# Update visual snapshots (do this after intended UI changes)
pnpm test:visual

# Run tests in UI mode for interactive debugging
pnpm test:visual:ui
```

## Current Test Coverage

- **Topbar**: Tests responsive behavior across desktop, tablet, and mobile viewports
  - Ensures the logo, site name, and navigation links remain visible
  - Verifies proper visual appearance using screenshot comparisons

## Adding New Visual Tests

1. Create a new test file in the `tests/e2e` directory
2. Use `toHaveScreenshot()` to capture and compare visual elements
3. Test across multiple viewport sizes to ensure responsive design
4. Run with `--update-snapshots` to generate initial baseline images

## Best Practices

- Keep screenshots focused on specific components to make failures easier to diagnose
- Test critical UI elements across multiple viewport sizes
- Update baselines only when UI changes are intentional
- Review screenshot diffs carefully when tests fail

## Troubleshooting

If visual tests fail:

1. Check the HTML report (`npx playwright show-report`)
2. Compare the expected vs. actual screenshots
3. Determine if the changes are intentional (requiring baseline updates) or bugs

## GitHub Actions Integration

Visual tests run as part of our CI pipeline but allow for a small threshold of pixel differences to accommodate minor rendering variations between environments.
