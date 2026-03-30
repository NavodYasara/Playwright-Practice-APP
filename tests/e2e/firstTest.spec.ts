import { expect, test } from "@playwright/test";
import { ADDRGETNETWORKPARAMS } from "dns";
import { filter } from "rxjs-compat/operator/filter";

test.beforeEach("the first test", async ({ page }) => {
  await page.goto("http://localhost:4200/");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});


test("Using the grid", async ({ page }) => {
  // this locator means, the locator which has the id "inputEmail1" and the placeholder "Email"
  await page.locator('#inputEmail1[placeholder="Email"]').fill("saf@afs.com");
  
  // this locator means, the locator which has the id "inputPassword2" and the placeholder "Password"
  await page.locator('#inputPassword2[placeholder="Password"]').fill("password123");

});

// Find the child element
test("Find child element", async ({ page }) => {

  // give me the child element which has the text "Option 1"
  await page.locator('nb-card nb-radio-group :text-is("Option 1")').click();

  // give me the child element which has the text "Option 2"
  await page.locator("nb-card").locator("nb-radio-group").locator("text=Option 2").click();
  
  // give me the child element which has the text "Sign in"
  await page.locator("nb-card").getByRole("button", { name: "Sign in" }).first().click();

  // give me the child element which has the data-testid "SignIn"
  await page.getByTestId("SignIn").click();

  // give me the child element which has the role "button" and is the 3rd child element
  await page.locator("nb-card").nth(2).getByRole("button").click();
});

// Find parent element
test("Find parent element", async ({ page }) => {
  
  // give me the parent element which has the text "Using the Grid"
  await page.locator("nb-card", { hasText: "Using the Grid" }).getByRole("button", { name: "Sign in" }).click(); 
  
  // give me the parent element which has the id "inputEmail1"
  await page.locator("nb-card", { has: page.locator("#inputEmail1") }).getByRole("button", { name: "Sign in" }).click(); 

  // give me the parent element which has the text "Basic form"
  await page.locator("nb-card").filter({ hasText: "Basic form" }).getByRole("button", { name: "Submit" }).click();
  
  // give me the parent element which has the class "status-danger"
  await page.locator("nb-card").filter({ has: page.locator(".status-danger") }).getByRole("textbox", { name: "Password" }).click(); 

  // give me the parent element which has the class "nb-checkbox" and text "Sign in"
  await page.locator("nb-card").filter({ has: page.locator("nb-checkbox") }).filter({ hasText: "Sign in" }).getByRole("textbox", { name: "Email" }).click(); 
});

// Reuse the locators
test("Reuse the Locators", async ({ page }) => {
  const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" });
  const emailInput = basicForm.getByRole("textbox", { name: "Email" });
  const passwordInput = basicForm.getByRole("textbox", { name: "Password" });

  await emailInput.fill("saf@afs.com");
  await passwordInput.fill("password123");
});

// Extract values
test("Extract values", async ({ page }) => {
  const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" });
  const buttonText = await basicForm.getByRole("button", { name: "Submit" }).textContent();
  
  // single test value extraction
  expect(buttonText).toEqual("Submit");

  // All values extraction
  const allRadioRadioButtonLabels = await page.locator("nb-radio").allTextContents();
  expect(allRadioRadioButtonLabels).toContain("Option 1");

  // Input Value
  const emailField = basicForm.getByRole("textbox", { name: "Email" });
  await emailField.fill("test@test.com");
  const emailFieldValue = await emailField.inputValue();
  expect(emailFieldValue).toEqual("test@test.com");

  // Attribute value
  const placeholderValue = await emailField.getAttribute("placeholder");
  expect(placeholderValue).toEqual("Email");

});

test("assertions", async ({ page }) => {
  const basicFormButton = page.locator("nb-card").filter({hasText: "Basic form"}).locator("button");

  // General assertion
  const text = await basicFormButton.textContent();
  expect(text).toEqual("Submit");

  // Locator assertion
  expect(basicFormButton).toHaveText("Submit");

  // Soft assertion
  await expect.soft(basicFormButton).toHaveText("Submit");
  await basicFormButton.click();
  // await expect(basicFormButton).toHaveText("Submit");

  // // State assertion
  // await expect(basicFormButton).toBeVisible();
  // await expect(basicFormButton).toBeEnabled();
});
  
