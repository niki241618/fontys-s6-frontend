const { test, expect } = require('@playwright/test');
test.describe('Browse Books Page Tests', () => {
    test('should display correct books with details', async ({ page }) => {
        await page.goto('http://localhost:3000/books'); // Adjust the URL if your app's base URL is different

        // Check if exactly three books are displayed
        const bookItems = await page.locator('[data-e2e-test="book-item"]');
        await expect(bookItems).toHaveCount(3);

        // Define expected books data
        const expectedBooks = [
            {
                name: "Be Useful: Seven Tools for Life",
                author: "Arnold Schwarzenegger",
                rating: 0
            },
            {
                name: "The Black Veil",
                author: "Boz",
                rating: 0
            },
            {
                name: "The 3 Questions",
                author: "Leo Tolstoy",
                rating: 0
            }
        ];

        // Verify each book's details
        for (let i = 0; i < expectedBooks.length; i++) {
            const bookName = await bookItems.nth(i).locator('[data-e2e-test="book-name"]').textContent();
            const bookAuthor = await bookItems.nth(i).locator('[data-e2e-test="book-author"]').textContent();
            const bookRating = await bookItems.nth(i).locator('[data-e2e-test="book-rating"]').textContent();

            await expect(bookName).toBe(expectedBooks[i].name);
            await expect(bookAuthor).toBe(expectedBooks[i].author);
            await expect(bookRating).toBe(`${expectedBooks[i].rating}`);
        }
    });
});