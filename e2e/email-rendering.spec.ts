import { test, expect } from '@playwright/test';

test.describe('Email Rendering in Markdown Preview', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/editor');
        await page.waitForSelector('.previewContainer');
    });

    test('bare email addresses should render as plain text without bold styling', async ({ page }) => {
        // Clear the editor and insert test markdown with a bare email
        const editor = page.locator('.cm-content');
        await editor.click();
        await page.keyboard.press('Control+A');
        await page.keyboard.type('Contact: john.doe@example.com for more info');

        // Wait for preview to update
        await page.waitForTimeout(500);

        // Check the preview container
        const preview = page.locator('.previewContainer');

        // The email should NOT be wrapped in an <a> tag
        const emailLink = preview.locator('a[href="mailto:john.doe@example.com"]');
        await expect(emailLink).toHaveCount(0);

        // The email should be plain text
        const previewText = await preview.textContent();
        expect(previewText).toContain('john.doe@example.com');

        // Verify the email text is NOT bold by checking computed styles
        const paragraph = preview.locator('p').first();
        const emailTextNode = paragraph.locator('text=john.doe@example.com');

        // If it's plain text, it shouldn't have font-weight 600 or bold
        const parentElement = paragraph;
        const fontWeight = await parentElement.evaluate((el) => {
            const range = document.createRange();
            const textNodes: Node[] = [];

            function getTextNodes(node: Node) {
                if (node.nodeType === 3 && node.textContent?.includes('john.doe@example.com')) {
                    textNodes.push(node);
                } else {
                    node.childNodes.forEach(getTextNodes);
                }
            }

            getTextNodes(el);

            if (textNodes.length > 0 && textNodes[0].parentElement) {
                return window.getComputedStyle(textNodes[0].parentElement).fontWeight;
            }
            return null;
        });

        // Plain text should not be bold (400 or 500, not 600 or 700)
        expect(fontWeight).not.toBe('600');
        expect(fontWeight).not.toBe('700');
    });

    test('markdown mailto links should render as styled links with bold', async ({ page }) => {
        // Clear the editor and insert markdown with an intentional mailto link
        const editor = page.locator('.cm-content');
        await editor.click();
        await page.keyboard.press('Control+A');
        await page.keyboard.type('[Contact me](mailto:john.doe@example.com) for info');

        // Wait for preview to update
        await page.waitForTimeout(500);

        // Check the preview container
        const preview = page.locator('.previewContainer');

        // The mailto link SHOULD exist
        const emailLink = preview.locator('a[href="mailto:john.doe@example.com"]');
        await expect(emailLink).toBeVisible();
        await expect(emailLink).toHaveText('Contact me');

        // Verify the link has bold styling (Tehran theme uses font-weight: 600)
        const fontWeight = await emailLink.evaluate((el) =>
            window.getComputedStyle(el).fontWeight
        );

        // Link should be bold (600 or 700)
        expect(['600', '700', 'bold']).toContain(fontWeight);
    });

    test('multiple emails: bare and markdown links mixed', async ({ page }) => {
        // Test mixed scenario
        const editor = page.locator('.cm-content');
        await editor.click();
        await page.keyboard.press('Control+A');
        await page.keyboard.type('Email john@example.com or [contact support](mailto:support@example.com)');

        // Wait for preview to update
        await page.waitForTimeout(500);

        const preview = page.locator('.previewContainer');

        // Bare email should NOT be a link
        const bareEmailLink = preview.locator('a[href="mailto:john@example.com"]');
        await expect(bareEmailLink).toHaveCount(0);

        // Markdown mailto link SHOULD exist
        const mdEmailLink = preview.locator('a[href="mailto:support@example.com"]');
        await expect(mdEmailLink).toBeVisible();
        await expect(mdEmailLink).toHaveText('contact support');
    });

    test('URLs should still autolink correctly', async ({ page }) => {
        // Make sure we didn't break URL autolinking
        const editor = page.locator('.cm-content');
        await editor.click();
        await page.keyboard.press('Control+A');
        await page.keyboard.type('Visit https://example.com for details');

        // Wait for preview to update
        await page.waitForTimeout(500);

        const preview = page.locator('.previewContainer');

        // URL should be autolinked
        const urlLink = preview.locator('a[href="https://example.com"]');
        await expect(urlLink).toBeVisible();
        await expect(urlLink).toHaveText('https://example.com');
    });
});
