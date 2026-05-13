import { Page } from "@playwright/test";

export class FormLayoutPage {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async submitUsingTheGridFormWithCredentialsAndSelectOption(
    email: string,
    password: string,
    optionText: string,
  ) {
    const usingGridForm = this.page.locator("nb-card", {
      hasText: "Using the Grid",
    });
    await usingGridForm.getByPlaceholder("Email").fill(email);
    await usingGridForm.getByPlaceholder("Password").fill(password);
    await usingGridForm
      .getByRole("radio", { name: optionText })
      .check({ force: true });
    await usingGridForm.getByRole("button").click();
  }

  async submitInlineForm(name: string, email: string) {
    const inlineForm = this.page.locator("nb-card", { hasText: "Inline form" });
    await inlineForm.getByPlaceholder("Jane Doe").fill(name);
    await inlineForm.getByPlaceholder("Email").fill(email);
    await inlineForm.getByRole("button", { name: "Submit" }).click();
  }
}
