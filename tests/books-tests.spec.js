const { test, expect } = require('@playwright/test');
test.describe('Browse Books Page Tests', () => {
    test('should display correct books with details', async ({ page }) => {
        await page.goto(`http://localhost:3000/books`);

        // Check if exactly three books are displayed
        const bookItems = await page.locator('[data-e2e-test="book-item"]');
        await expect(bookItems).toHaveCount(2);

        // Define expected books data
        const expectedBooks = [
            // {
            //     name: "Be Useful: Seven Tools for Life",
            //     author: "Arnold Schwarzenegger",
            //     rating: 0
            // },
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

// Base URL and book ID for testing
const baseURL = 'http://localhost:3000';
const bookId = '7';

test.describe('BookPage component tests', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to the BookPage before each test
        await page.goto(`${baseURL}/books/${bookId}`);
    });

    test('shows book details after loading', async ({ page }) => {
        // Wait for the loading spinner to disappear
        await expect(page.locator('text="Loading..."')).toBeHidden();

        // Check for book cover, title, and description visibility
        await expect(page.locator('[data-e2e-test="book-cover"]')).toBeVisible();
        await expect(page.locator('[data-e2e-test="book-title"]')).toHaveText('The Black Veil');
        await expect(page.locator('[data-e2e-test="book-description"]')).toBeVisible();
        await expect(page.locator('[data-e2e-test="book-author"]')).toHaveText('Boz');

        await expect(page.locator('span:text("Language") + div > div > span')).toHaveText('English');
        await expect(page.locator('span:text("Genre") + div > div > span')).toHaveText('Horror');
        await expect(page.locator('span:text("Duration") + div > div > span')).toHaveText('32 Minutes');
        await expect(page.locator('span:text("Rating") + div > div > span')).toHaveText('0');
    });

    test('shows book audio after loading', async ({ page }) => {
        // Wait for the loading spinner to disappear
        await expect(page.locator('text="Fetching your book..."')).toBeHidden();

        // Check if the audio player is visible
        const audioPlayer = page.locator('audio');
        await expect(audioPlayer).toBeVisible();

        // Access the <source> element inside the <audio> and check the src attribute
        const sourceElement = page.locator('audio > source');
        const audioSrc = await sourceElement.getAttribute('src');
        expect(audioSrc).toMatch(/^blob:http:\/\/localhost:3000\/.*/);
    });
});