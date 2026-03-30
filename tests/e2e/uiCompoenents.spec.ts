import { test, expect } from "@playwright/test";
import { NavigationPage } from "../../Page-Objects/navigationPage";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test.describe("Form Layout Page", () => {
  test.beforeEach(async ({ page }) => {
    const navigateTo = new NavigationPage(page);
    await navigateTo.formLayoutPage("Form Layouts");
  });

  test("input field", async ({ page }) => {
    const emailInput = page
      .locator("nb-card", { hasText: "Using the Grid" })
      .getByRole("textbox", { name: "Email" });

    await emailInput.fill("test@test.com");
    await emailInput.clear();
    await emailInput.pressSequentially("test@test.com", { delay: 500 }); // simulate typing with delay

    // generic assertion
    const inputValue = await emailInput.inputValue();
    expect(inputValue).toEqual("test@test.com");

    // locator assertion
    await expect(emailInput).toHaveValue("test@test.com");
  });

  test("radio button", async ({ page }) => {
    const usingTheGridForm = page.locator("nb-card", {
      hasText: "Using the Grid",
    });
    await usingTheGridForm.getByLabel("Option 1").check({ force: true });
    await usingTheGridForm
      .getByRole("radio", { name: "Option 1" })
      .check({ force: true });
    const radioStatus = await usingTheGridForm
      .getByLabel("Option 1")
      .isChecked();
    expect(radioStatus).toBeTruthy();
  });
});

test.describe("Toastr page", () => {
  test.beforeEach(async ({ page }) => {
    const navigateTo = new NavigationPage(page);
    await navigateTo.toastr();
  });

  test("check box", async ({ page }) => {
    await page
      .getByRole("checkbox", { name: "Hide on click" })
      .uncheck({ force: true });
    const isNotChecked = await page
      .getByRole("checkbox", { name: "Hide on click" })
      .isChecked();
    expect(isNotChecked).toBeFalsy();

    await page
      .getByRole("checkbox", { name: "Prevent arising of duplicate toast" })
      .check({ force: true });
    const isChecked2 = await page
      .getByRole("checkbox", { name: "Prevent arising of duplicate toast" })
      .isChecked();
    expect(isChecked2).toBeTruthy();

    const allBoxes = page.getByRole("checkbox");
    for (const box of await allBoxes.all()) {
      await box.uncheck({ force: true });
      expect(await box.isChecked()).toBeFalsy();
    }
  });

  test("check all checkboxes", async ({ page }) => {
    const allBoxes = page.getByRole("checkbox");
    // Check all checkboxes
    for (const box of await allBoxes.all()) {
      await box.check({ force: true });
      expect(await box.isChecked()).toBeTruthy();
    }
  });

  test("list dropdowns", async ({ page }) => {
    const dropdownMenu = page.locator("ngx-header nb-select");
    await dropdownMenu.click();

    page.getByRole("list"); // when the list has ul tag
    page.getByRole("listitem"); // when the list has Li tag

    //const listItems = page.getByRole('list').locator('nb-option');
    const listItems = page.locator("nb-option-list nb-option");
    await expect(listItems).toHaveText([
      "Light",
      "Dark",
      "Cosmic",
      "Corporate",
    ]);
    console.log(listItems);

    const darkOption = listItems.filter({ hasText: "Dark" });
    await darkOption.click();
    await expect(page.locator("nb-layout-header")).toContainText("Dark");

    await dropdownMenu.click();
    const allOptions = await listItems.all();
    for (const option of allOptions) {
      const themeText = await option.innerText();
      await option.click();
      await expect(page.locator("nb-layout-header")).toContainText(themeText);
      if (themeText.trim() === "Corporate") {
        break;
      }
      await dropdownMenu.click();
    }
  });
});

test.describe("Tooltips page", () => {
  test.beforeEach(async ({ page }) => {
    const navigateTo = new NavigationPage(page);
    await navigateTo.tooltips();
  });

  test("tooltips", async ({ page }) => {
    const toolitpCard = page.locator("nb-card", {
      hasText: "Tooltip Placements",
    });
    const topButton = toolitpCard.getByRole("button", { name: "Top" });
    await topButton.hover();
    const tooltip = await page.locator("nb-tooltip").textContent();
    expect(tooltip).toContain("This is a tooltip");
  });
});

test.describe("Tables & Data", () => {
  test.beforeEach(async ({ page }) => {
    const navigateTo = new NavigationPage(page);
    await navigateTo.tablesAndDate();
  });

  test("dialog box", async ({ page }) => {
    page.on("dialog", (dialog) => {
      expect(dialog.message()).toEqual("Are you sure you want to delete?");
      dialog.accept();
    });
    await page
      .getByRole("table")
      .locator("tbody tr", { hasText: "mdo@gmail.com" })
      .locator(".nb-trash")
      .click();
    await expect(page.locator("table tr").first()).not.toHaveText(
      "mdo@gmail.com",
    );
  });

  test("table", async ({ page }) => {
    // 1. get the row by any test in this row
    const targetRow = page.getByRole("row", { name: "mdo@gmail.com" });
    await targetRow.locator(".nb-edit").click();
    await page.locator("input-editor").getByPlaceholder("Age").clear();
    await page.locator("input-editor").getByPlaceholder("Age").fill("25");
    await page.locator("input-editor").getByPlaceholder("Age").press("Enter");

    // 2. get the row based on the value in the specific column
    // await page.locator('.ng2-smart-pagination-nav').getByText('2').click()
    // const targetRowById = page.getByRole('row', {name: '11'}).filter({has: page.locator('td').nth(1).getByText('11')})
    // await targetRowById.locator('.nb-edit').click()

    // 3. test filter of the table

    // const ages = [20, 30, 40, 50, 60, 70, 80];

    // for (let age of ages) {
    //   await page.locator("input-filter").getByPlaceholder("Age").clear();
    //   await page.locator("input-filter").getByPlaceholder("Age").fill(age.toString());
    //   await page.waitForTimeout(500);

    //   const ageRows = page.locator("tbody tr");

    //   for (let row of await ageRows.all()) {
    //     const cellValue = await row.locator("td").last().textContent();
    //     if (age == 50) {
    //       break;
    //     } else {
    //       expect(cellValue).toEqual(age.toString());
    //     }
    //   }
    // }
  });
});

test.describe("DatePicker", () => {
  test.beforeEach(async ({ page }) => {
    const navigateTo = new NavigationPage(page);
    await navigateTo.datepickerPage();
  });

  test("Datepicker", async ({ page }) => {
    const calendarInputFiled = page.getByPlaceholder("Form Picker");
    await calendarInputFiled.click();
    await page
      .locator("nb-calendar-day-cell:not(.bounding-month)")
      .getByText("1", { exact: true })
      .click();
    await expect(calendarInputFiled).toHaveValue("Mar 1, 2026");
  });

  test("DatePickerByDateObject", async ({ page }) => {
    const calendarInputFiled = page.getByPlaceholder("Form Picker");
    await calendarInputFiled.click();

    let date = new Date();
    date.setDate(date.getDate() + 5);
    const expectedDate = date.getDate().toString();
    const expectedMonthShort = date.toLocaleString("en-US", {
      month: "short",
    });
    const expectedYear = date.getFullYear();
    const expectedDay = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;

    await page
      .locator("nb-calendar-day-cell:not(.bounding-month)")
      .getByText(expectedDate, { exact: true })
      .click();
    await expect(calendarInputFiled).toHaveValue(expectedDay);
  });

  test("DatePickFromNextMOnths", async ({ page }) => {
    const daysFromToday = 880;
    const calendarInputFiled = page.getByPlaceholder("Form Picker");
    await calendarInputFiled.click();
    const today = new Date();
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + daysFromToday);

    const targetDay = targetDate.getDate().toString();
    const targetMonthShort = targetDate.toLocaleString("en-US", {
      month: "short",
    });
    const targetMonthLong = targetDate.toLocaleString("en-US", {
      month: "long",
    });
    const targetYear = targetDate.getFullYear();
    const targetDateString = `${targetMonthShort} ${targetDay}, ${targetYear}`;
    const targetMonthYear = `${targetMonthLong} ${targetYear}`;

    let currentMonthYear = await page
      .locator("nb-calendar-view-mode button")
      .textContent();

    while (currentMonthYear?.trim() !== targetMonthYear) {
      await page.locator("nb-calendar-pageable-navigation .next-month").click();
      currentMonthYear = await page
        .locator("nb-calendar-view-mode button")
        .textContent();
    }

    await page
      .locator("nb-calendar-day-cell:not(.bounding-month)")
      .getByText(targetDay, { exact: true })
      .click();
    await expect(calendarInputFiled).toHaveValue(targetDateString);
  });
});

test.describe("Slider", () => {
  test.beforeEach(async ({ page }) => {
    const navigateTo = new NavigationPage(page);
    await navigateTo.slider();
  });

  test("slider", async ({ page }) => {
    //const tempGauge = page.locator('nb-tabset .tab-text.ng-star-inserted').filter({ hasText: 'Temperature' })
    const tempGauge = page.locator(
      '[TabTitle = "Temperature"] ngx-temperature-dragger circle',
    );
    await tempGauge.click();
  });
});
