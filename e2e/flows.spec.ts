import { expect, test } from "@playwright/test";

test.describe("RideTheBike E2E", () => {
	test.beforeEach(async ({ page }) => {
		// Navigate and clear storage to ensure a clean slate
		await page.goto("/");
		await page.evaluate(() => localStorage.clear());
		await page.reload();

		// Handle Onboarding if it appears
		const bikeInput = page.getByPlaceholder(/bike model/i);
		if (await bikeInput.isVisible()) {
			await bikeInput.fill("Pulsar NS200");
			await page.getByRole("button", { name: /start riding/i }).click();
		}

		// Safety check: wait for dashboard load
		await expect(page.getByText(/Active Odometer/i)).toBeVisible();
	});

	test("smoke test: dashboard loads", async ({ page }) => {
		await expect(page).toHaveTitle(/RideTheBike/i);
		await expect(page.getByText(/Active Odometer/i)).toBeVisible();
		await expect(page.getByText(/Optimal \(New\)/i)).toBeVisible();
	});

	test("flow: log a ride and verify odometer", async ({ page }) => {
		// Initial value is 10,000 KM
		await expect(page.getByText("10,000").first()).toBeVisible();

		// Open Plus Menu (The main blue plus button at the bottom center)
		// It's a button with a Plus icon, unique in its container
		await page
			.locator("button")
			.filter({ has: page.locator(".lucide-plus") })
			.click();

		// Choose Ride
		await page.getByRole("button", { name: /ride/i }).click();

		// Input 50 KM
		const distanceInput = page.getByPlaceholder(/distance/i);
		await distanceInput.fill("50");

		// Confirm
		await page.getByRole("button", { name: /confirm/i }).click();

		// Verify success toast
		await expect(page.getByText(/50 KM Ride Logged/i)).toBeVisible();

		// Verify Odometer update (10,000 + 50 = 10,050)
		await expect(page.getByText("10,050").first()).toBeVisible();
	});

	test("flow: refuel calculation and persistence", async ({ page }) => {
		// Open Plus Menu
		await page
			.locator("button")
			.filter({ has: page.locator(".lucide-plus") })
			.click();

		// Choose Refuel
		await page.getByRole("button", { name: /refuel/i }).click();

		// Input Price = 100
		const priceInput = page.getByPlaceholder(/price per litre/i);
		await priceInput.fill("100");

		// Input Liters = 15
		const litersInput = page.getByPlaceholder(/liters/i);
		await litersInput.fill("15");

		// Verify Cost is 1500 (100 * 15)
		const costInput = page.getByPlaceholder(/total cost/i);
		await expect(costInput).toHaveValue("1500.00");

		// Confirm
		await page.getByRole("button", { name: /confirm/i }).click();

		// Verify success toast
		await expect(page.getByText(/fuel refilled/i)).toBeVisible();

		// Open Refuel again to verify price persistence
		await page
			.locator("button")
			.filter({ has: page.locator(".lucide-plus") })
			.click();
		await page.getByRole("button", { name: /refuel/i }).click();
		await expect(page.getByPlaceholder(/price per litre/i)).toHaveValue("100");
	});

	test("flow: settings update and persistence", async ({ page }) => {
		// Open Settings (Gear icon in header)
		await page
			.locator("button")
			.filter({ has: page.locator(".lucide-settings") })
			.click();

		// Open Bike Profile Section (it's a button with "Bike Profile" text)
		// The button contains an H3 with the text.
		const profileSection = page
			.locator("button")
			.filter({ hasText: /bike profile/i });
		await profileSection.click();

		// Change Bike Model
		const modelInput = page.getByPlaceholder(/e\.g\. Pulsar NS200/i);
		await modelInput.fill("Yamaha R15");

		// Save Settings
		await page.getByRole("button", { name: /save settings/i }).click();

		// Verify UI reflects change
		await expect(page.getByText("Yamaha R15")).toBeVisible();

		// Reload and verify persistence
		await page.reload();
		await expect(page.getByText("Yamaha R15")).toBeVisible();
	});
});
