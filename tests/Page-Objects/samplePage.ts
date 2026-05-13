import { Page, expect, test } from "@playwright/test";

export class sample {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async submitInlineFormWIthNameAndEmail() {
    const field = await this.page.locator('input[type="text"]').first().fill("sfdsff");
  }
}
