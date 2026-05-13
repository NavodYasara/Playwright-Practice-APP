import { expect, Locator, Page } from "@playwright/test";

type InlineFormData = { name: string; email: string; rememberMe: boolean };
type GridFormData = { email: string; password: string; optionText: "Option 1" | "Option 2" };
type NoLabelFormData = { recipients: string; subject: string; message: string };
type BasicFormData = { email: string; password: string; checkMeOut: boolean };
type BlockFormData = { firstName: string; lastName: string; email: string; website: string };
type HorizontalFormData = { email: string; password: string; rememberMe: boolean };

export class FormLayoutPage {
  private page: Page;
  private inlineForm: Locator;
  private gridForm: Locator;
  private noLabelForm: Locator;
  private basicForm: Locator;
  private blockForm: Locator;
  private horizontalForm: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inlineForm = page.locator("nb-card", { hasText: "Inline form" });
    this.gridForm = page.locator("nb-card", { hasText: "Using the Grid" });
    this.noLabelForm = page.locator("nb-card", { hasText: "Form without labels" });
    this.basicForm = page.locator("nb-card", { hasText: "Basic form" });
    this.blockForm = page.locator("nb-card", { hasText: "Block form" });
    this.horizontalForm = page.locator("nb-card", { hasText: "Horizontal form" });
  }

  async submitUsingTheGridFormWithCredentialsAndSelectOption(email: string,password: string,optionText: string) {
    await this.gridForm.getByPlaceholder("Email").fill(email);
    await this.gridForm.getByPlaceholder("Password").fill(password);
    await this.gridForm.getByRole("radio", { name: optionText }).check({ force: true });
    await this.gridForm.getByRole("button", { name: "Sign in" }).click();
  }

  async submitInlineForm(name: string, email: string) {
    await this.inlineForm.getByPlaceholder("Jane Doe").fill(name);
    await this.inlineForm.getByPlaceholder("Email").fill(email);
    await this.inlineForm.getByRole("button", { name: "Submit" }).click();
  }

  async assertInlineForm(data: InlineFormData) {
    const nameInput = this.inlineForm.getByPlaceholder("Jane Doe");
    const emailInput = this.inlineForm.getByPlaceholder("Email");
    const rememberMe = this.inlineForm.getByRole("checkbox", { name: "Remember me" });

    await nameInput.fill(data.name);
    await emailInput.fill(data.email);
    data.rememberMe
      ? await rememberMe.check({ force: true })
      : await rememberMe.uncheck({ force: true });

    await expect(nameInput).toHaveValue(data.name);
    await expect(emailInput).toHaveValue(data.email);
    data.rememberMe ? await expect(rememberMe).toBeChecked() : await expect(rememberMe).not.toBeChecked();
    await expect(this.inlineForm.getByRole("button", { name: "Submit" })).toBeEnabled();
  }

  async assertGridForm(data: GridFormData) {
    const emailInput = this.gridForm.getByPlaceholder("Email");
    const passwordInput = this.gridForm.getByPlaceholder("Password");
    const selectedRadio = this.gridForm.getByRole("radio", { name: data.optionText });
    const otherRadio = this.gridForm.getByRole("radio", {
      name: data.optionText === "Option 1" ? "Option 2" : "Option 1",
    });

    await emailInput.fill(data.email);
    await passwordInput.fill(data.password);
    await selectedRadio.check({ force: true });

    await expect(emailInput).toHaveValue(data.email);
    await expect(passwordInput).toHaveValue(data.password);
    await expect(selectedRadio).toBeChecked();
    await expect(otherRadio).not.toBeChecked();
    await expect(this.gridForm.getByRole("radio", { name: "Disabled Option" })).toBeDisabled();
    await expect(this.gridForm.getByTestId("SignIn")).toBeEnabled();
  }

  async assertNoLabelForm(data: NoLabelFormData) {
    const recipients = this.noLabelForm.getByPlaceholder("Recipients");
    const subject = this.noLabelForm.getByPlaceholder("Subject");
    const message = this.noLabelForm.getByPlaceholder("Message");

    await recipients.fill(data.recipients);
    await subject.fill(data.subject);
    await message.fill(data.message);

    await expect(recipients).toHaveValue(data.recipients);
    await expect(subject).toHaveValue(data.subject);
    await expect(message).toHaveValue(data.message);
    await expect(this.noLabelForm.getByRole("button", { name: "Send" })).toBeEnabled();
  }

  async assertBasicForm(data: BasicFormData) {
    const email = this.basicForm.getByRole("textbox", { name: "Email address" });
    const password = this.basicForm.getByRole("textbox", { name: "Password" });
    const checkbox = this.basicForm.getByRole("checkbox", { name: "Check me out" });

    await email.fill(data.email);
    await password.fill(data.password);
    data.checkMeOut ? await checkbox.check({ force: true }) : await checkbox.uncheck({ force: true });

    await expect(email).toHaveValue(data.email);
    await expect(password).toHaveValue(data.password);
    data.checkMeOut ? await expect(checkbox).toBeChecked() : await expect(checkbox).not.toBeChecked();
    await expect(this.basicForm.getByRole("button", { name: "Submit" })).toBeEnabled();
  }

  async assertBlockForm(data: BlockFormData) {
    const firstName = this.blockForm.getByPlaceholder("First Name");
    const lastName = this.blockForm.getByPlaceholder("Last Name");
    const email = this.blockForm.getByPlaceholder("Email");
    const website = this.blockForm.getByPlaceholder("Website");

    await firstName.fill(data.firstName);
    await lastName.fill(data.lastName);
    await email.fill(data.email);
    await website.fill(data.website);

    await expect(firstName).toHaveValue(data.firstName);
    await expect(lastName).toHaveValue(data.lastName);
    await expect(email).toHaveValue(data.email);
    await expect(website).toHaveValue(data.website);
    await expect(this.blockForm.getByRole("button", { name: "Submit" })).toBeEnabled();
  }

  async assertHorizontalForm(data: HorizontalFormData) {
    const email = this.horizontalForm.getByPlaceholder("Email");
    const password = this.horizontalForm.getByPlaceholder("Password");
    const rememberMe = this.horizontalForm.getByRole("checkbox", { name: "Remember me" });

    await email.fill(data.email);
    await password.fill(data.password);
    data.rememberMe
      ? await rememberMe.check({ force: true })
      : await rememberMe.uncheck({ force: true });

    await expect(email).toHaveValue(data.email);
    await expect(password).toHaveValue(data.password);
    data.rememberMe ? await expect(rememberMe).toBeChecked() : await expect(rememberMe).not.toBeChecked();
    await expect(this.horizontalForm.getByRole("button", { name: "Sign in" })).toBeEnabled();
  }
}
