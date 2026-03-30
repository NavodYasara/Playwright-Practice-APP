import { test } from "@playwright/test";
import { FormLayoutPage } from "../../Page-Objects/form-layoutPage";
import { NavigationPage } from "../../Page-Objects/navigationPage";

test.beforeEach(async ({ page }) => {
  page.goto("http://localhost:4200/pages/iot-dashboard");
})

test("parameterized method", async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  const onFormLayoutPage = new FormLayoutPage(page);
  
  await navigateTo.formLayoutPage();
  await onFormLayoutPage.submitUsingTheGridFormWithCredentialsAndSelectOption(
    "test@test.com",
    "password123",
    "Option 1",
  );

})