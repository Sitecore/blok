import { test, expect, Page } from '@playwright/test';

export async function testFieldDefault(page: Page){
    // Verify that display field default section
    const defaultSection = page.locator('[id="field-default"]');
    await expect(defaultSection).toBeVisible();

    // Verify that display fieldset
    const fieldset = defaultSection.locator('[data-slot="fieldset"]');

    // Verify that display field default title
    const title = fieldset.locator('[data-slot="field-legend"]');
    await expect(title).toContainText('Profile');
    // Verify that display field default description
    const description = fieldset.locator('[data-slot="field-description"]').first();
    await expect(description).toContainText('This appears on invoices and emails.');

    // Verify field group
    const fieldGroup = defaultSection.locator('[data-slot="field-group"]');

    // Verify that display Full Name section
    const fullName = fieldGroup.locator('[data-slot="field"]').nth(0);
    // Verify that display Full Name label
    const labelFullName = fullName.locator('[data-slot="field-label"]');
    await expect(labelFullName).toContainText('Full name');
    // Verify that display Full Name input
    const inputFullName = fullName.locator('[data-slot="input"][id="field-name"]');
    await expect(inputFullName).toBeVisible();
    await expect(inputFullName).toHaveAttribute('placeholder', 'Vijithan Ramalingam');
    // Verify that display Full Name message
    await expect(fieldGroup.locator('[data-slot="field-description"]')).toContainText('This appears on invoices and emails.');

    // Verify that display Username section
    const username = fieldGroup.locator('[data-slot="field"]').nth(1);
    // Verify that display Username label
    const labelUsername = username.locator('[data-slot="field-label"]');
    await expect(labelUsername).toContainText('Username');
    // Verify that display Username input
    const inputUsername = username.locator('[data-slot="input"][id="field-username"]');
    await expect(inputUsername).toBeVisible();
    // Verify that display Username errormessage
    await expect(fieldGroup.locator('[data-slot="field-error"]')).toContainText('Choose another username.');

    // Verify that display Switch section
    const switchField = fieldGroup.locator('[data-slot="field"]').nth(2);
    // Verify that display Switch button
    const switchButton = switchField.locator('[type="button"][data-slot="switch"]');
    await expect(switchButton).toBeVisible();
    // Verify that display Switch label
    const switchLabel = switchField.locator('[data-slot="field-label"]');
    await expect(switchLabel).toContainText('Subscribe to the newsletter');
}

export async function testFieldInput(page: Page){
    // Verify that display field input section
    const inputSection = page.locator('[id="field-input"]');
    await expect(inputSection).toBeVisible();

    // Verify that display fieldset
    const fieldset = inputSection.locator('[data-slot="fieldset"]');

    // Verify that display field input title
    const title = fieldset.locator('[data-slot="field-legend"]');
    await expect(title).toContainText('Account Information');

    // Verify field group
    const fieldGroup = fieldset.locator('[data-slot="field-group"]');

    // Verify that display Username field
    const username = fieldGroup.locator('[data-slot="field"]').nth(0);
    // Verify that display Username label
    const labelUsername = username.locator('[data-slot="field-label"]');
    await expect(labelUsername).toContainText('Username');
    // Verify that display Username input
    const inputUsername = username.locator('[data-slot="input"][id="field-input-username"]');
    await expect(inputUsername).toBeVisible();
    await expect(inputUsername).toHaveAttribute('placeholder', 'Enter username');
    // Verify that display Username message
    await expect(username.locator('[data-slot="field-description"]')).toContainText('Choose a unique username for your account.');

    // Verify that display Password section
    const password = fieldGroup.locator('[data-slot="field"]').nth(1);
    // Verify that display Password label
    const labelPassword = password.locator('[data-slot="field-label"]');
    await expect(labelPassword).toContainText('Password');
    // Verify that display Password input
    const inputPassword = password.locator('[data-slot="input"][id="field-input-password"]');
    await expect(inputPassword).toBeVisible();
    await expect(inputPassword).toHaveAttribute('placeholder', 'Enter password');
    // Verify that display Password message
    await expect(password.locator('[data-slot="field-description"]')).toContainText('Must be at least 8 characters long.');
}

export async function testFieldTextarea(page: Page){
    // Verify that display field textarea section
    const textareaSection = page.locator('[id="field-textarea"]');
    await expect(textareaSection).toBeVisible();

    // Verify that display fieldset
    const fieldset = textareaSection.locator('[data-slot="fieldset"]');

    // Verify that display field textarea title
    const title = fieldset.locator('[data-slot="field-legend"]');
    await expect(title).toContainText('Message');
    
    // Verify field group
    const fieldGroup = fieldset.locator('[data-slot="field-group"]');

    // Verify that display Textarea field
    const textareaField = fieldGroup.locator('[data-slot="field"]');
    // Verify that display Textarea label
    const labelMessage = textareaField.locator('[data-slot="field-label"]');
    await expect(labelMessage).toContainText('Your message');
    // Verify that display Textarea input
    const textarea = textareaField.locator('[data-slot="textarea"][id="field-textarea-message"]');
    await expect(textarea).toBeVisible();
    await expect(textarea).toHaveAttribute('placeholder', 'Enter your message here');
    // Verify that display Textarea message
    await expect(textareaField.locator('[data-slot="field-description"]')).toContainText('Please provide details about your inquiry.');
}

export async function testFieldSelect(page: Page){
    // Verify that display field select section
    const selectSection = page.locator('[id="field-select"]');
    await expect(selectSection).toBeVisible();

    // Verify that display fieldset
    const fieldset = selectSection.locator('[data-slot="fieldset"]');

    // Verify that display field select title
    const title = fieldset.locator('[data-slot="field-legend"]');
    await expect(title).toContainText('Preferences');
    
    // Verify field group
    const fieldGroup = fieldset.locator('[data-slot="field-group"]');

    // Verify that display Select field
    const selectField = fieldGroup.locator('[data-slot="field"]');
    // Verify that display Select label
    const labelMessage = selectField.locator('[data-slot="field-label"]');
    await expect(labelMessage).toContainText('Country');

    // Verify that display Select trigger
    const select = selectField.locator('button[data-slot="select-trigger"][id="field-select-country"]');
    await expect(select).toBeVisible();
    const selectValue = selectField.locator('span[data-slot="select-value"]');
    await expect(selectValue).toContainText('Select a country');
    // Verify that display Select message
    await expect(selectField.locator('[data-slot="field-description"]')).toContainText('Select your country of residence.');

    // Verify that display Select content
    await select.click();
    const selectContent = page.locator('[data-slot="select-content"]');
    await expect(selectContent).toBeVisible();
    // Verify that display Select dropdown option
    const selectItem1 = selectContent.locator('[data-slot="select-item"]').nth(0);
    await expect(selectItem1).toContainText('United States');
    const selectItem2 = selectContent.locator('[data-slot="select-item"]').nth(1);
    await expect(selectItem2).toContainText('United Kingdom');
    const selectItem3 = selectContent.locator('[data-slot="select-item"]').nth(2);
    await expect(selectItem3).toContainText('Canada');

    // Verify that select an option from dropdown
    await selectItem1.click();
    await expect(selectValue).toContainText('United States');
}

export async function testFieldCheckbox(page: Page){
    // Verify that display field checkbox section
    const checkboxSection = page.locator('[id="field-checkbox"]');
    await expect(checkboxSection).toBeVisible();

    // Verify that display fieldset
    const fieldset = checkboxSection.locator('[data-slot="fieldset"]');

    // Verify that display field checkbox title
    const title = fieldset.locator('[data-slot="field-legend"]');
    await expect(title).toContainText('Notifications');
    // Verify that display field default description
    const description = fieldset.locator('[data-slot="field-description"]');
    await expect(description).toContainText('Manage how you receive updates.');
    
    // Verify field group
    const fieldGroup = fieldset.locator('[data-slot="field-group"]');

    // Verify that display Checkbox Email field
    const emailField = fieldGroup.locator('[data-slot="field"]').nth(0);
    // Verify that display Email checkbox
    const emailButton = emailField.locator('button[data-slot="checkbox"][id="field-checkbox-email"]');
    await expect(emailButton).toBeVisible();
    // Verify that display Email label
    const emailLabel = emailField.locator('label[data-slot="field-label"][for="field-checkbox-email"]');
    await expect(emailLabel).toContainText('Email notifications');

    // Verify that display Checkbox SMS field
    const smsField = fieldGroup.locator('[data-slot="field"]').nth(1);
    // Verify that display SMS checkbox
    const smsButton = smsField.locator('button[data-slot="checkbox"][id="field-checkbox-sms"]');
    await expect(smsButton).toBeVisible();
    // Verify that display SMS label
    const smsLabel = smsField.locator('label[data-slot="field-label"][for="field-checkbox-sms"]');
    await expect(smsLabel).toContainText('SMS notifications');

    // Verify that Email checkbox is checked
    await emailButton.click();
    await expect(emailButton).toBeChecked();
    // Verify that SMS checkbox is checked
    await smsButton.click();
    await expect(smsButton).toBeChecked();

    // Verify that Email checkbox is unchecked
    await emailButton.click();
    await expect(emailButton).not.toBeChecked();
    // Verify that SMS checkbox is unchecked
    await smsButton.click();
    await expect(smsButton).not.toBeChecked();
}

export async function testFieldRadioGroup(page: Page){
    // Verify that display field Radio Group section
    const radioGroupSection = page.locator('[id="field-radioGroup"]');
    await expect(radioGroupSection).toBeVisible();

    // Verify that display fieldset
    const fieldset = radioGroupSection.locator('[data-slot="fieldset"]');

    // Verify that display field Radio Group title
    const title = fieldset.locator('[data-slot="field-legend"]');
    await expect(title).toContainText('Payment Method');
    
    // Verify field group
    const fieldGroup = fieldset.locator('[data-slot="field-group"]');

    // Verify that display Radio Group field
    const field = fieldGroup.locator('[data-slot="field"]');
    // Verify that display Radio Group label - use first() to get the main label, not the radio option labels
    const labelMessage = field.locator('label[data-slot="field-label"]').first();
    await expect(labelMessage).toHaveText('Select payment method');

    // Verify that display Radio Group trigger
    const radioGroup = field.locator('[data-slot="radio-group"]');
    await expect(radioGroup).toBeVisible();

    // Verify that display Radio Group Credit Cardfield
    const fieldCreditCard = radioGroup.locator('[data-slot="field"]').nth(0);
    // Verify that display Credit Card radio button
    const creditCardButton = fieldCreditCard.locator('button[data-slot="radio-group-item"][id="field-radio-card"]');
    await expect(creditCardButton).toBeVisible();
    // Verify that display Credit Card label
    const creditCardLabel = fieldCreditCard.locator('label[data-slot="field-label"][for="field-radio-card"]');
    await expect(creditCardLabel).toContainText('Credit Card');

    // Verify that display Radio Group PayPal field
    const fieldPayPal = radioGroup.locator('[data-slot="field"]').nth(1);
    // Verify that display PayPal radio button
    const paypalButton = fieldPayPal.locator('button[data-slot="radio-group-item"][id="field-radio-paypal"]');
    await expect(paypalButton).toBeVisible();
    // Verify that display PayPal label
    const paypalLabel = fieldPayPal.locator('label[data-slot="field-label"][for="field-radio-paypal"]');
    await expect(paypalLabel).toContainText('PayPal');

    // Verify that display Radio Group message
    await expect(field.locator('[data-slot="field-description"]')).toContainText('Choose your preferred payment method.');

    // Verify that change selection when clicking different radio button
    await paypalButton.click();
    await expect(paypalButton).toBeChecked();
    await expect(creditCardButton).not.toBeChecked();

    // Verify that selectable by clicking the label
    await creditCardLabel.click();
    await expect(creditCardButton).toBeChecked();
    await expect(paypalButton).not.toBeChecked();
}

export async function testFieldSwitch(page: Page){
    // Verify that display field Switch section
    const switchSection = page.locator('[id="field-switch"]');
    await expect(switchSection).toBeVisible();

    // Verify that display fieldset
    const fieldset = switchSection.locator('[data-slot="fieldset"]');

    // Verify that display field Switch title
    const title = fieldset.locator('[data-slot="field-legend"]');
    await expect(title).toContainText('Settings');
    
    // Verify field group
    const fieldGroup = fieldset.locator('[data-slot="field-group"]');

    // Verify that display Switch Dark Mode field
    const fieldDarkMode = fieldGroup.locator('[data-slot="field"]').nth(0);
    // Verify that display Dark Mode switch button
    const darkModeButton = fieldDarkMode.locator('button[data-slot="switch"][id="field-switch-dark"]');
    await expect(darkModeButton).toBeVisible();
    // Verify that display Dark Mode label
    const darkModeLabel = fieldDarkMode.locator('label[data-slot="field-label"][for="field-switch-dark"]');
    await expect(darkModeLabel).toContainText('Dark mode');

    // Verify that display Switch Enable notifications field
    const fieldEnableNotifications = fieldGroup.locator('[data-slot="field"]').nth(1);
    // Verify that display Dark Mode switch button
    const enableNotificationsButton = fieldEnableNotifications.locator('button[data-slot="switch"][id="field-switch-notifications"]');
    await expect(enableNotificationsButton).toBeVisible();
    // Verify that display Dark Mode label
    const enableNotificationsLabel = fieldEnableNotifications.locator('label[data-slot="field-label"][for="field-switch-notifications"]');
    await expect(enableNotificationsLabel).toContainText('Enable notifications');

    // Verify that Switch Dark Mode is checked when clicking dark mode button
    await darkModeButton.click();
    await expect(darkModeButton).toBeChecked();
    // Verify that Switch Enable notifications is checked when clicking enable notifications button
    await enableNotificationsButton.click();
    await expect(enableNotificationsButton).toBeChecked();

    // Verify that Switch Dark Mode is unchecked when clicking dark mode button
    await darkModeButton.click();
    await expect(darkModeButton).not.toBeChecked();
    // Verify that Switch Enable notifications is unchecked when clicking dark mode button
    await enableNotificationsButton.click();
    await expect(enableNotificationsButton).not.toBeChecked();

    // Verify that Switch Dark Mode is checked when clicking dark mode label
    await darkModeLabel.click();
    await expect(darkModeButton).toBeChecked();
    // Verify that Switch Enable notifications is checked when clicking enable notifications label
    await enableNotificationsLabel.click();
    await expect(enableNotificationsButton).toBeChecked();
}

export async function testFieldSeparator(page: Page){
    // Verify that display field Separator section
    const separatorSection = page.locator('[id="field-separator"]');
    await expect(separatorSection).toBeVisible();

    // Verify that display main field group
    const fieldGroup = separatorSection.locator('[data-slot="field-group"]');

    // Verify that display Personal Information field 
    const fieldPersonalInformation = fieldGroup.locator('fieldset[data-slot="fieldset"]').nth(0);
    // Verify that display Personal Information title
    const titlePersonalInformation = fieldPersonalInformation.locator('legend[data-slot="field-legend"]');
    await expect(titlePersonalInformation).toContainText('Personal Information');

    // Verify that display Personal Information field group
    const fieldGroupPersonalInformation = fieldPersonalInformation.locator('[data-slot="field-group"]');

    // Verify that display First Name in the Personal Information field group
    const fieldFirstName = fieldGroupPersonalInformation.locator('[data-slot="field"]').nth(0);
    // Verify that display First Name label
    const labelFirstName = fieldFirstName.locator('label[data-slot="field-label"]');
    await expect(labelFirstName).toContainText('First name');
    // Verify that display First Name input
    const inputFirstName = fieldFirstName.locator('input[data-slot="input"][id="field-sep-first"]');
    await expect(inputFirstName).toBeVisible();
    await expect(inputFirstName).toHaveAttribute('placeholder', 'John');

    // Verify that display Last Name in the Personal Information field group
    const fieldLastName = fieldGroupPersonalInformation.locator('[data-slot="field"]').nth(1);
    // Verify that display Last Name label
    const labelLastName = fieldLastName.locator('label[data-slot="field-label"]');
    await expect(labelLastName).toContainText('Last name');
    // Verify that display Last Name input
    const inputLastName = fieldLastName.locator('input[data-slot="input"][id="field-sep-last"]');
    await expect(inputLastName).toBeVisible();
    await expect(inputLastName).toHaveAttribute('placeholder', 'Doe');

    // Verify that display the Separator between the Personal Information field group and the Contact Information field group
    const separator = fieldGroup.locator('[data-slot="field-separator"]');
    await expect(separator).toBeVisible();
    // Display class attributs
    const classList = await separator.getAttribute('class');
    expect(classList).toContain('border-t');
    expect(classList).toContain('border-border');

    // Verify that display Contact Information field
    const fieldContactInformation = fieldGroup.locator('fieldset[data-slot="fieldset"]').nth(1);
    // Verify that display Contact Information title
    const titleContactInformation = fieldContactInformation.locator('legend[data-slot="field-legend"]');
    await expect(titleContactInformation).toContainText('Contact Information');

    // Verify that display Contact Information field group
    const fieldGroupContactInformation = fieldContactInformation.locator('[data-slot="field-group"]');

    // Verify that display Email in the Contact Information field group
    const fieldEmail = fieldGroupContactInformation.locator('[data-slot="field"]');
    // Verify that display Email label
    const labelEmail = fieldEmail.locator('label[data-slot="field-label"]');
    await expect(labelEmail).toContainText('Email');
    // Verify that display Email input
    const inputEmail = fieldEmail.locator('input[data-slot="input"][id="field-sep-email"]');
    await expect(inputEmail).toBeVisible();
    await expect(inputEmail).toHaveAttribute('placeholder', 'john@example.com');
}

export async function testFieldError(page: Page){
    // Verify that display field Error section
    const errorSection = page.locator('[id="field-error"]');
    await expect(errorSection).toBeVisible();

    // Verify that display fieldset
    const fieldset = errorSection.locator('fieldset[data-slot="fieldset"]');
    // Verify that display field title
    const title = fieldset.locator('legend[data-slot="field-legend"]');
    await expect(title).toContainText('Login');

    // Verify that display field group
    const fieldGroup = fieldset.locator('[data-slot="field-group"]');

    // Verify that display Email field
    const fieldEmail = fieldGroup.locator('[data-slot="field"]').nth(0);
    // Verify that display Email label
    const labelEmail = fieldEmail.locator('label[data-slot="field-label"]');
    await expect(labelEmail).toContainText('Email');
    // Verify that display Email input
    const inputEmail = fieldEmail.locator('input[data-slot="input"][id="field-error-email"]');
    await expect(inputEmail).toBeVisible();
    await expect(inputEmail).toHaveAttribute('placeholder', 'Enter email');
    // Verify that display Email error message
    await expect(fieldEmail.locator('[data-slot="field-error"]')).toContainText('Please enter a valid email address.');

    // Verify that display Password field
    const fieldPassword = fieldGroup.locator('[data-slot="field"]').nth(1);
    // Verify that display Password label
    const labelPassword = fieldPassword.locator('label[data-slot="field-label"]');
    await expect(labelPassword).toContainText('Password');
    // Verify that display Password input
    const inputPassword = fieldPassword.locator('input[data-slot="input"][id="field-error-password"]');
    await expect(inputPassword).toBeVisible();
    // Verify that display Password error messages
    const fieldPasswordError = fieldPassword.locator('[data-slot="field-error"]');
    await expect(fieldPasswordError.locator('li').nth(0)).toContainText('Password must be at least 8 characters');
    await expect(fieldPasswordError.locator('li').nth(1)).toContainText('Password must contain a number');
}

export async function testFieldIcon(page: Page){
    // Verify that display field Icon section
    const iconSection = page.locator('[id="field-icon"]');
    await expect(iconSection).toBeVisible();

    // Verify that display fieldset
    const fieldset = iconSection.locator('fieldset[data-slot="fieldset"]');
    // Verify that display field title
    const title = fieldset.locator('legend[data-slot="field-legend"]');
    await expect(title).toContainText('Contact');

    // Verify that display field group
    const fieldGroup = fieldset.locator('[data-slot="field-group"]');

    // Verify that display Input with icon field
    const fieldInputWithIcon = fieldGroup.locator('[data-slot="field"]');
    // Verify that display Input with icon label
    const labelInputWithIcon = fieldInputWithIcon.locator('label[data-slot="field-label"]');
    await expect(labelInputWithIcon).toContainText('Input with icon');

    // Verify that display Input with icon input
    const groupInputWithIcon = fieldInputWithIcon.locator('[data-slot="input-group"]');
    // Verify that display Input with icon input section
    const inputSection = groupInputWithIcon.locator('input[data-slot="input-group-control"][id="field-input-icon"]');
    await expect(inputSection).toBeVisible();
    await expect(inputSection).toHaveAttribute('placeholder', 'Enter phone number');
    // Verify that display Icon in the Input with icon
    const icon = groupInputWithIcon.locator('[data-slot="input-group-addon"]');
    await expect(icon).toBeVisible();

    // Verify that display Input with icon message
    await expect(fieldInputWithIcon.locator('[data-slot="field-description"]')).toContainText('Helper text with a link at the end');
}

export async function testFieldAddon(page: Page){
    // Verify that display field Addon section
    const addonSection = page.locator('[id="field-addon"]');
    await expect(addonSection).toBeVisible();

    // Verify that display fieldset
    const fieldset = addonSection.locator('fieldset[data-slot="fieldset"]');
    // Verify that display field title
    const title = fieldset.locator('legend[data-slot="field-legend"]');
    await expect(title).toContainText('Phone Number');

    // Verify that display field group
    const fieldGroup = fieldset.locator('[data-slot="field-group"]');

    // Verify that display Input with addon field
    const fieldInputWithAddon = fieldGroup.locator('[data-slot="field"]');
    // Verify that display Input with addon label
    const labelInputWithAddon = fieldInputWithAddon.locator('label[data-slot="field-label"]');
    await expect(labelInputWithAddon).toContainText('Input with addon');

    // Verify that display Input with addon input
    const groupInputWithAddon = fieldInputWithAddon.locator('[data-slot="input-group"]');
    // Verify that display Addon in the Input with addon
    const addon = groupInputWithAddon.locator('[data-slot="input-group-addon"]');
    await expect(addon).toBeVisible();
    await expect(addon).toContainText('+234');
    // Verify that display Input with addon input section   
    const inputSection = groupInputWithAddon.locator('input[data-slot="input-group-control"][id="field-input-addon"]');
    await expect(inputSection).toBeVisible();
    await expect(inputSection).toHaveAttribute('placeholder', 'Enter phone number');
    
    // Verify that display Input with addon message
    await expect(fieldInputWithAddon.locator('[data-slot="field-description"]')).toContainText('Helper text');
}

export async function testFieldDisabled(page: Page){
    // Verify that display field Disabled section
    const disabledSection = page.locator('[id="field-disabled-input"]');
    await expect(disabledSection).toBeVisible();

    // Verify that display fieldset
    const fieldset = disabledSection.locator('fieldset[data-slot="fieldset"]');
    // Verify that display field title
    const title = fieldset.locator('legend[data-slot="field-legend"]');
    await expect(title).toContainText('Account Settings');

    // Verify that display field group
    const fieldGroup = fieldset.locator('[data-slot="field-group"]');

    // Verify that display Input disabled field
    const fieldInputDisabled = fieldGroup.locator('[data-slot="field"]');
    // Verify that display Input with addon label
    const labelInputDisabled = fieldInputDisabled.locator('label[data-slot="field-label"]');
    await expect(labelInputDisabled).toContainText('Input disabled');  

    // Verify that display Input with disabled input section   
    const inputSection = fieldInputDisabled.locator('input[data-slot="input"][id="field-disabled"]');
    await expect(inputSection).toBeVisible();
    await expect(inputSection).toHaveAttribute('value', "You can't edit this value");
    // Verify that input is disabled
    await expect(inputSection).toBeDisabled();
    await expect(inputSection).toHaveAttribute('disabled');
    
    // Verify that display Input disabled message
    await expect(fieldInputDisabled.locator('[data-slot="field-description"]')).toContainText('Helper text');
}

export async function testFieldReadOnly(page: Page){
    // Verify that display field ReadOnly section
    const readOnlySection = page.locator('[id="field-readOnly"]');
    await expect(readOnlySection).toBeVisible();

    // Verify that display fieldset
    const fieldset = readOnlySection.locator('fieldset[data-slot="fieldset"]');
    // Verify that display field title
    const title = fieldset.locator('legend[data-slot="field-legend"]');
    await expect(title).toContainText('Account Settings');

    // Verify that display field group
    const fieldGroup = fieldset.locator('[data-slot="field-group"]');

    // Verify that display Input readOnly field
    const fieldInputReadOnly = fieldGroup.locator('[data-slot="field"]');

    // Verify that display Input readOnly label
    const labelInputReadOnly = fieldInputReadOnly.locator('label[data-slot="field-label"]');
    await expect(labelInputReadOnly).toContainText('Input readOnly');  

    // Verify that display Input readOnly input section   
    const inputReadOnly = fieldInputReadOnly.locator('input[data-slot="input"][id="field-readonly"]');
    await expect(inputReadOnly).toBeVisible();
    await expect(inputReadOnly).toHaveAttribute('value', "You can't edit this value");
    // Verify that input is readOnly
    await expect(inputReadOnly).toHaveAttribute('readonly');
    
    // Verify that display Input readOnly message
    await expect(fieldInputReadOnly.locator('[data-slot="field-description"]')).toContainText('Helper text');
}

export async function testFieldSmallSize(page: Page){
    // Verify that display field Small Size section
    const smallSizeSection = page.locator('[id="field-smallSize"]');
    await expect(smallSizeSection).toBeVisible();

    // Verify that display fieldset
    const fieldset = smallSizeSection.locator('fieldset[data-slot="fieldset"]');
    // Verify that display field title
    const title = fieldset.locator('legend[data-slot="field-legend"]');
    await expect(title).toContainText('Small Inputs');

    // Verify that display field group
    const fieldGroup = fieldset.locator('[data-slot="field-group"]');

    // Verify that display Input sm field
    const fieldInputSm = fieldGroup.locator('[data-slot="field"]').nth(0);

    // Verify that display Input sm label
    const labelInputSm = fieldInputSm.locator('label[data-slot="field-label"]');
    await expect(labelInputSm).toContainText('Input sm');  

    // Verify that display Input sm input section   
    const inputSm = fieldInputSm.locator('input[data-slot="input"][id="field-sm-input"]');
    await expect(inputSm).toBeVisible();
    await expect(inputSm).toHaveAttribute('placeholder', "Small input");
    // Verify that input sm has the class attribute small
    const classList = await inputSm.getAttribute('class');
    expect(classList).toContain('file:text-sm');
    expect(classList).toContain('md:text-sm');
    expect(classList).toContain('text-sm');
    
    // Verify that display Input sm message
    await expect(fieldInputSm.locator('[data-slot="field-description"]')).toContainText('This Input has the prop size="sm" enabled');


    // Verify that display Select sm field
    const fieldSelectSm = fieldGroup.locator('[data-slot="field"]').nth(1);

    // Verify that display Select sm label
    const labelSelectSm = fieldSelectSm.locator('label[data-slot="field-label"]');
    await expect(labelSelectSm).toContainText('Select sm');

    // Verify that display Select trigger
    const select = fieldSelectSm.locator('button[data-slot="select-trigger"][id="field-sm-select"]');
    await expect(select).toBeVisible();
    const selectValue = select.locator('span[data-slot="select-value"]');
    await expect(selectValue).toContainText('Select option');
    
    // Verify that display Select content
    await select.click();
    const selectContent = page.locator('[data-slot="select-content"]');
    await expect(selectContent).toBeVisible();
    // Verify that display Select dropdown option
    const selectItem1 = selectContent.locator('[data-slot="select-item"]').nth(0);
    await expect(selectItem1).toContainText('Content');
    const selectItem2 = selectContent.locator('[data-slot="select-item"]').nth(1);
    await expect(selectItem2).toContainText('Engagement');
    const selectItem3 = selectContent.locator('[data-slot="select-item"]').nth(2);
    await expect(selectItem3).toContainText('Commerce');

    // Verify that display Input sm message
    await expect(fieldSelectSm.locator('[data-slot="field-description"]')).toContainText('This Select has the prop size="sm" enabled');

    // Verify that display Input sm with addon field
    const fieldInputSmWithAddon = fieldGroup.locator('[data-slot="field"]').nth(2);

    // Verify that display Input with addon label
    const labelInputSmWithAddon = fieldInputSmWithAddon.locator('label[data-slot="field-label"]');
    await expect(labelInputSmWithAddon).toContainText('Input sm with addon');

    // Verify that display Input with addon input
    const groupInputWithAddon = fieldInputSmWithAddon.locator('[data-slot="input-group"]');
    // Verify that display Addon in the Input with addon
    const addon = groupInputWithAddon.locator('[data-slot="input-group-addon"]');
    await expect(addon).toBeVisible();
    await expect(addon).toContainText('+234');
    // Verify that display Input with addon input section   
    const inputSection = groupInputWithAddon.locator('input[data-slot="input-group-control"][id="field-sm-addon"]');
    await expect(inputSection).toBeVisible();
    await expect(inputSection).toHaveAttribute('placeholder', 'Small input');
}

export async function testFieldInputTypes(page: Page){
    // Verify that display field Input Types section
    const inputTypesSection = page.locator('[id="field-inputTypes"]');
    await expect(inputTypesSection).toBeVisible();

    // Verify that display fieldset
    const fieldset = inputTypesSection.locator('fieldset[data-slot="fieldset"]');
    // Verify that display field title
    const title = fieldset.locator('legend[data-slot="field-legend"]');
    await expect(title).toContainText('Various Input Types');

    // Verify that display field group
    const fieldGroup = fieldset.locator('[data-slot="field-group"]');

    // Verify that display Input color field
    const fieldInputColor = fieldGroup.locator('[data-slot="field"]').nth(0);
    // Verify that display Input with addon label
    const labelInputColor = fieldInputColor.locator('label[data-slot="field-label"]');
    await expect(labelInputColor).toContainText('Input color');
    // Verify that display Input color input section   
    const inputSection = fieldInputColor.locator('input[data-slot="input"][id="field-color"]');
    await expect(inputSection).toBeVisible();
    await expect(inputSection).toHaveAttribute('type', 'color');

    // Verify that display Input Date Picker field
    const fieldInputDatePicker = fieldGroup.locator('[data-slot="field"]').nth(1)
    // Verify that display Input Date Picker label
    const labelInputDatePicker = fieldInputDatePicker.locator('label[data-slot="field-label"]');
    await expect(labelInputDatePicker).toContainText('Date Picker');
    // Verify that display Input Date Picker section   
    const DatePickerSection = fieldInputDatePicker.locator('button[data-slot="popover-trigger"]');
    await expect(DatePickerSection).toBeVisible();
    await expect(DatePickerSection).toHaveAttribute('type', 'button');
    await expect(DatePickerSection).toContainText('Pick a date');
    // Verify that display Input Date Picker message
    await expect(fieldInputDatePicker.locator('[data-slot="field-description"]')).toContainText('Select a single date using the Blok date picker.');

    // Verify that display Input Date Range Picker field
    const fieldInputDateRangePicker = fieldGroup.locator('[data-slot="field"]').nth(2)
    // Verify that display Input Date Range Picker label
    const labelInputDateRangePicker = fieldInputDateRangePicker.locator('label[data-slot="field-label"]');    
    await expect(labelInputDateRangePicker).toContainText('Date Range Picker');
    // Verify that display Input Date Range Picker section   
    const DateRangePickerSection = fieldInputDateRangePicker.locator('button[data-slot="popover-trigger"]');
    await expect(DateRangePickerSection).toBeVisible();
    await expect(DateRangePickerSection).toHaveAttribute('type', 'button');
    await expect(DateRangePickerSection).toContainText('Pick a date');
    // Verify that display Input Date Range Picker message
    await expect(fieldInputDateRangePicker.locator('[data-slot="field-description"]')).toContainText('Select a date range using the Blok date picker.');

    // Verify that display Input email field
    const fieldInputEmail = fieldGroup.locator('[data-slot="field"]').nth(3)
    // Verify that display Email label
    const labelEmail = fieldInputEmail.locator('label[data-slot="field-label"]');
    await expect(labelEmail).toContainText('Input email');
    // Verify that display Email input
    const inputEmail = fieldInputEmail.locator('input[data-slot="input"][id="field-email"]');
    await expect(inputEmail).toBeVisible();
    await expect(inputEmail).toHaveAttribute('placeholder', 'email@example.com');

    // Verify that display Input file field
    const fieldInputFile = fieldGroup.locator('[data-slot="field"]').nth(4)
    // Verify that display Input file label
    const labelInputFile = fieldInputFile.locator('label[data-slot="field-label"]');
    await expect(labelInputFile).toContainText('Input file');
    // Verify that display Input file input
    const inputFile = fieldInputFile.locator('input[data-slot="input"][id="field-file"]');
    await expect(inputFile).toBeVisible();
    await expect(inputFile).toHaveAttribute('type', 'file');

    // Verify that display Input number field
    const fieldInputNumber = fieldGroup.locator('[data-slot="field"]').nth(5)
    // Verify that display Input number label
    const labelInputNumber = fieldInputNumber.locator('label[data-slot="field-label"]');
    await expect(labelInputNumber).toContainText('Input number');
    // Verify that display Input number input
    const inputNumber = fieldInputNumber.locator('input[data-slot="input"][id="field-number"]');
    await expect(inputNumber).toBeVisible();
    await expect(inputNumber).toHaveAttribute('type', 'number');
    await expect(inputNumber).toHaveAttribute('placeholder', 'Enter number');

    // Verify that display Input search field
    const fieldInputSearch = fieldGroup.locator('[data-slot="field"]').nth(6)
    // Verify that display Input search label
    const labelInputSearch = fieldInputSearch.locator('label[data-slot="field-label"]');
    await expect(labelInputSearch).toContainText('Input search');
    // Verify that display Input search input
    const inputSearch = fieldInputSearch.locator('input[data-slot="input"][id="field-search"]');
    await expect(inputSearch).toBeVisible();
    await expect(inputSearch).toHaveAttribute('type', 'search');
    await expect(inputSearch).toHaveAttribute('placeholder', 'Search...');

    // Verify that display Input tel field
    const fieldInputTel = fieldGroup.locator('[data-slot="field"]').nth(7)
    // Verify that display Input tel label
    const labelInputTel = fieldInputTel.locator('label[data-slot="field-label"]');
    await expect(labelInputTel).toContainText('Input tel');
    // Verify that display Input tel input
    const inputTel = fieldInputTel.locator('input[data-slot="input"][id="field-tel"]');
    await expect(inputTel).toBeVisible();
    await expect(inputTel).toHaveAttribute('type', 'tel');
    await expect(inputTel).toHaveAttribute('placeholder', 'Enter phone number');

    // Verify that display Input Time Picker field
    const fieldInputTimePicker = fieldGroup.locator('[data-slot="field"]').nth(8)
    // Verify that display Input Time Picker label
    const labelInputTimePicker = fieldInputTimePicker.locator('label[data-slot="field-label"]');
    await expect(labelInputTimePicker).toContainText('Time Picker');
    // Verify that display Input Time Picker section   
    const TimePickerSection = fieldInputTimePicker.locator('button[data-slot="popover-trigger"]');
    await expect(TimePickerSection).toBeVisible();
    await expect(TimePickerSection).toHaveAttribute('type', 'button');
    await expect(TimePickerSection).toContainText('Pick a time');
    // Verify that display Input Time Picker message
    await expect(fieldInputTimePicker.locator('[data-slot="field-description"]')).toContainText('Select time using dropdown selects for hour, minute, and period.');

    // Verify that display Input URL field
    const fieldInputURL = fieldGroup.locator('[data-slot="field"]').nth(9)
    // Verify that display Input URL label
    const labelInputURL = fieldInputURL.locator('label[data-slot="field-label"]');
    await expect(labelInputURL).toContainText('Input url');
    // Verify that display Input URL input
    const inputURL = fieldInputURL.locator('input[data-slot="input"][id="field-url"]');
    await expect(inputURL).toBeVisible();
    await expect(inputURL).toHaveAttribute('type', 'url');
    await expect(inputURL).toHaveAttribute('placeholder', 'https://example.com');
}

