import { test, expect, devices } from '@playwright/test';

// Test that specifically checks topbar responsiveness
test.describe('Topbar Responsive Behavior', () => {
  // Define the test for each device
  for (const [deviceName, viewport] of Object.entries({
    'Desktop': { width: 1280, height: 720 },
    'Tablet': { width: 768, height: 1024 },
    'Mobile': { width: 375, height: 667 }
  })) {
    test(`topbar should be responsive on ${deviceName}`, async ({ page }) => {
      // Set the viewport for this test
      await page.setViewportSize(viewport);
      
      // Navigate to the homepage
      await page.goto('/');
      
      // Wait for the page to be loaded
      await page.waitForLoadState('networkidle');
      
      // Ensure topbar is visible
      const topbar = page.locator('div[role="navigation"]');
      await expect(topbar).toBeVisible();
      
      // Take a screenshot of just the topbar
      await expect(topbar).toHaveScreenshot(`topbar-${deviceName.toLowerCase()}.png`);
      
      // Verify logo is visible on all devices
      await expect(page.locator('div[role="navigation"] img[alt="Logo"]')).toBeVisible();
      
      // Verify site name is visible
      await expect(page.locator('div[role="navigation"] p', { hasText: 'sean.silvius.me' })).toBeVisible();
      
      // Verify index link is visible (this is a good check for potential mobile menu failures)
      await expect(page.locator('div[role="navigation"] a[href="/posts"]')).toBeVisible();
    });
  }
});
