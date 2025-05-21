import { test, expect } from '@playwright/test';

// Test the topbar component on desktop and mobile viewports
test.describe('Topbar Visual Tests', () => {
  test('topbar should look correct on desktop', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/');
    
    // Wait for the topbar to be visible
    const topbar = page.locator('div[role="navigation"]');
    await expect(topbar).toBeVisible();
    
    // Take a screenshot of just the topbar
    await expect(topbar).toHaveScreenshot('topbar-desktop.png', {
      // Only capture the topbar area
      clip: { x: 0, y: 0, width: page.viewportSize()?.width || 1280, height: 64 }
    });
  });

  // Mobile test using iPhone 12 viewport
  test('topbar should look correct on mobile', async ({ page }) => {
    // Set viewport to mobile dimensions
    await page.setViewportSize({ width: 390, height: 844 });
    
    // Navigate to the homepage
    await page.goto('/');
    
    // Wait for the topbar to be visible
    const topbar = page.locator('div[role="navigation"]');
    await expect(topbar).toBeVisible();
    
    // Take a screenshot of just the topbar
    await expect(topbar).toHaveScreenshot('topbar-mobile.png', {
      // Only capture the topbar area
      clip: { x: 0, y: 0, width: 390, height: 64 }
    });
  });
});
