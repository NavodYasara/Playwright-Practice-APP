import { expect, test} from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://uitestingplayground.com/ajax");
});

test("Auto waiting", async ({ page }) => {
  await page.getByText("Button Triggering AJAX Request").click();
  const successButton = page.locator(".bg-success");
  await successButton.waitFor({ state: "visible" });
  expect(await successButton.textContent()).toBe(
    "Data loaded with AJAX get request.",
  );
});

test("Alternative waiting", async ({ page }) => {
  const successButton = page.locator(".bg-success");
  await Promise.all([
    page.waitForResponse((response) => response.url().includes("/ajaxdata")),
    page.getByText("Button Triggering AJAX Request").click(),
  ]);
  await page.waitForSelector(".bg-success");

  // Check the Button text
  const text = await successButton.allTextContents();
  expect(text).toContain("Data loaded with AJAX get request.");
});

test("NetworkCall", async ({ page }) => {
  await page.getByText("Button Triggering AJAX Request").click();
  const successButton = page.locator(".bg-success");
  
  // Wait for network to be idle
  await page.waitForLoadState("networkidle"); // not recommended

  // Check the text
  expect(await successButton.allTextContents()).toContain(
    "Data loaded with AJAX get request.",
  );
});


test ('timeouts', async({page})=>{
    test.setTimeout (15000); // sets the default timeout for all the actions in this page to 15 seconds
    page.setDefaultTimeout (20000); // sets the default timeout for all the actions in this page to 20 seconds
    page.setDefaultNavigationTimeout (20000); // sets the default timeout for navigation actions to 20 seconds

    const ajaxTriggerButton = page.getByText("Button Triggering AJAX Request");
    await expect(ajaxTriggerButton).toBeVisible();
    await ajaxTriggerButton.click();
    await expect(ajaxTriggerButton).toBeEnabled();
})