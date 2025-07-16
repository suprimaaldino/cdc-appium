import TestData from '@data/test-data';
import { ChainablePromiseElement } from 'webdriverio';

export default class loginPage {
  get loginMenu(): ChainablePromiseElement {
    return $('(//android.widget.TextView[@text="Login"])[2]');
  }

  get signupOption(): ChainablePromiseElement {
    return $('//android.widget.TextView[@text="Sign Up"]');
  }

  get loginOption(): ChainablePromiseElement {
    return $('(//android.widget.TextView[@text="Login"])[1]');
  }

  get emailField(): ChainablePromiseElement {
    return $('~input-email');
  }

  get passwordField(): ChainablePromiseElement {
    return $('~input-password');
  }

  get confirmPasswordField(): ChainablePromiseElement {
    return $('~input-repeat-password');
  }

  get signupBtn(): ChainablePromiseElement {
    return $('//android.view.ViewGroup[@content-desc="button-SIGN UP"]/android.view.ViewGroup');
  }

  get signupSuccessToast(): ChainablePromiseElement {
    return $('~You successfully signed up!');
  }

  async fillSignupForm(
    email = TestData.validUser.email,
    password = TestData.validUser.password
  ): Promise<void> {
    await this.loginMenu.tap();
    await this.signupOption.tap();
    await this.emailField.setValue(email);
    await this.passwordField.setValue(password);
    await this.confirmPasswordField.setValue(password);
    await this.signupBtn.tap();
  }

  async assertSignupSuccess(): Promise<void> {
    await this.signupSuccessToast.waitForDisplayed({ timeout: 5000 });
    await expect(this.signupSuccessToast).toBeDisplayed();
  }
}