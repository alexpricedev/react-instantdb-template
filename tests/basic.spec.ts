import { test, expect } from '@playwright/test';

test.describe('{{PROJECT_NAME}} Application', () => {
  test('home page loads correctly', async ({ page }) => {
    await page.goto('/');
    
    // Check page title
    await expect(page).toHaveTitle(/{{PROJECT_TITLE}}/);
    
    // Check for main heading
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ path: 'test-results/home-page.png' });
  });

  test('navigation works correctly', async ({ page }) => {
    await page.goto('/');
    
    // Test navigation to main app
    await page.goto('/builder');
    await expect(page).toHaveTitle(/{{PROJECT_TITLE}}/);
    await page.screenshot({ path: 'test-results/app-page.png' });
    
    // Test navigation to gallery/community
    await page.goto('/community');
    await expect(page).toHaveTitle(/{{PROJECT_TITLE}}/);
    await page.screenshot({ path: 'test-results/community-page.png' });
  });

  test('about page loads correctly', async ({ page }) => {
    await page.goto('/about');
    await expect(page).toHaveTitle(/{{PROJECT_TITLE}}/);
    await page.screenshot({ path: 'test-results/about-page.png' });
  });
});