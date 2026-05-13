import { test } from "@playwright/test";
import { FormLayoutPage } from "../Page-Objects/form-layoutPage";
import { formLayoutsData } from "../test-data/formLayouts.data";

test.describe("Form Layouts Page Coverage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4300/pages/forms/layouts");
  });

  test("Inline form supports name, email, checkbox, and submit", async ({
    page,
  }) => {
    const onFormLayoutsPage = new FormLayoutPage(page);
    await onFormLayoutsPage.assertInlineForm(formLayoutsData.inline);
  });

  test("Using the Grid supports email, password, radios, and Sign in", async ({
    page,
  }) => {
    const onFormLayoutsPage = new FormLayoutPage(page);
    await onFormLayoutsPage.assertGridForm(formLayoutsData.grid);
  });

  test("Form without labels supports recipients, subject, message, and send", async ({
    page,
  }) => {
    const onFormLayoutsPage = new FormLayoutPage(page);
    await onFormLayoutsPage.assertNoLabelForm(formLayoutsData.noLabel);
  });

  test("Basic form supports email, password, checkbox, and submit", async ({
    page,
  }) => {
    const onFormLayoutsPage = new FormLayoutPage(page);
    await onFormLayoutsPage.assertBasicForm(formLayoutsData.basic);
  });

  test("Block form supports first name, last name, email, website, and submit", async ({
    page,
  }) => {
    const onFormLayoutsPage = new FormLayoutPage(page);
    await onFormLayoutsPage.assertBlockForm(formLayoutsData.block);
  });

  test("Horizontal form supports email, password, remember me, and sign in", async ({
    page,
  }) => {
    const onFormLayoutsPage = new FormLayoutPage(page);
    await onFormLayoutsPage.assertHorizontalForm(formLayoutsData.horizontal);
  });
});
