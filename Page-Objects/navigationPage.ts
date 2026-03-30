import playwrightConfig, { Page, test } from "@playwright/test";

export class NavigationPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private async selectGroupItem(groupTitle: string, itemTitle: string) {
    const groupMenu = this.page.getByTitle(groupTitle);
    await this.page.waitForTimeout(1000);
    const expanded = await groupMenu.getAttribute("aria-expanded");
    if (expanded !== "true") {
      await groupMenu.click();
    }
    await this.page.getByText(itemTitle, { exact: true }).click();
  }

  async formLayoutPage(itemTitle: string = "Form Layouts") {
    await this.selectGroupItem("Forms", itemTitle);
  }

  async toastr() {
    await this.selectGroupItem("Modal & Overlays", "Toastr");
  }

  async tooltips() {
    await this.selectGroupItem("Modal & Overlays", "Tooltip");
  }

  async tablesAndDate() {
    await this.selectGroupItem("Tables & Data", "Smart Table");
  }

  async slider() {
    await this.page.getByTitle("IoT Dashboard").click();
  }

  async datepickerPage() {
    await this.selectGroupItem("Forms", "Datepicker");
  }

  async smartTabPage() {
    await this.tablesAndDate();
  }

  async toastrPage() {
    await this.toastr();
  }

  async tooltipPage() {
    await this.tooltips();
  }
}
