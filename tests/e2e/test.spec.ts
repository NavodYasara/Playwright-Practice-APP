import {test} from "@playwright/test";
import { NavigationPage } from "../Page-Objects/navigationPage";
import { FormLayoutPage } from "../Page-Objects/form-layoutPage";
test.describe("IoT Dashboard Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4300/pages/iot-dashboard");
    const navigateTo = new NavigationPage(page);
    await navigateTo.formLayoutPage("Form Layouts");
  });

  test("submit inline form", async ({page})=>{
    const inlineForm = new FormLayoutPage(page);
    await inlineForm.submitInlineForm("Navod Yasara", "navod@example.com");
  });
});


