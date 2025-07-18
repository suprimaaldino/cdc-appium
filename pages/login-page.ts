import TestData from '@data/test-data';
import { ChainablePromiseElement } from 'webdriverio';
import { resetEnvironment } from '../utils/reset-environment';

export default class loginPage {
  private readonly appPackage = 'com.example.myapp'; // Replace with actual package

  get loginMenu(): ChainablePromiseElement { return $('android=new UiSelector().text("Login")'); }
  get signupOption(): ChainablePromiseElement { return $('android=new UiSelector().text("Sign up")'); }
  get loginOption(): ChainablePromiseElement { return $('android=new UiSelector().text("Login").instance(0)'); }
  get loginBtn(): ChainablePromiseElement { return $('~button-LOGIN'); }
  get emailField(): ChainablePromiseElement { return $('~input-email'); }
  get passwordField(): ChainablePromiseElement { return $('~input-password'); }
  get confirmPasswordField(): ChainablePromiseElement { return $('~input-repeat-password'); }
  get signupBtn(): ChainablePromiseElement { return $('//android.view.ViewGroup[@content-desc="button-SIGN UP"]/android.view.ViewGroup'); }
  get successToast(): ChainablePromiseElement { return $('//android.widget.TextView[@resource-id="android:id/message" and @text="You successfully signed up!"]'); }
  get successToastOkBtn(): ChainablePromiseElement { return $('//android.widget.Button[@resource-id="android:id/button1" and @text="OK"]'); }

  async fillSignupForm(email: string, password: string): Promise<void> {
    await this.loginMenu.tap();
    await expect(this.signupOption).toBeDisplayed({ message: 'Signup option not visible' });
    await this.signupOption.tap();
    await this.emailField.setValue(email);
    await this.passwordField.setValue(password);
    await this.confirmPasswordField.setValue(password);
    await this.signupBtn.tap();
  }

  async assertSignupSuccess(): Promise<void> {
    await this.successToast.waitForDisplayed({ timeout: 10000 });
    await expect(this.successToast).toHaveText('You successfully signed up!');
    await this.successToastOkBtn.waitForDisplayed({ timeout: 5000 });
    await this.successToastOkBtn.tap({ direction: 'down', maxScrolls: 15 });
    await browser.pause(1000);
  }

  async userLogin(email = TestData.validUser.email, password = TestData.validUser.password): Promise<void> {
    await this.loginOption.waitForDisplayed({ timeout: 10000 });
    await expect(this.loginOption).toBeDisplayed();
    await this.loginOption.tap();
    await this.emailField.waitForDisplayed({ timeout: 5000 });
    await this.passwordField.waitForDisplayed({ timeout: 5000 });
    await this.emailField.setValue(email);
    await this.passwordField.setValue(password);
    await this.loginBtn.tap();
  }

  async assertLoginSuccess(): Promise<void> {
    await this.successToast.waitForDisplayed({ timeout: 10000 });
    await expect(this.successToast).toHaveText('You are logged in!');
    await this.successToastOkBtn.waitForDisplayed({ timeout: 5000 });
    await this.successToastOkBtn.tap({ direction: 'down', maxScrolls: 15 });
  }

  async closeApp(): Promise<void> {
    return browser.closeApp();
  }

  async navigateToLoginScreen(): Promise<void> {
    try {
      await this.loginMenu.waitForDisplayed({ timeout: 5000 });
      await this.loginMenu.tap();
    } catch (error) {
      console.log('Login menu not found, assuming already on login screen');
    }
  }

  async assertLoginScreenVisible(): Promise<void> {
    await this.loginOption.waitForDisplayed({ timeout: 10000 });
    await expect(this.loginOption).toBeDisplayed({ message: 'Login option not visible' });
    await this.emailField.waitForDisplayed({ timeout: 5000 });
    await this.passwordField.waitForDisplayed({ timeout: 5000 });
    await expect(this.loginBtn).toBeDisplayed({ message: 'Login button not visible' });
  }

  async resetAppAndNavigateToLogin(): Promise<void> {
    await resetEnvironment(this.appPackage);
    await this.navigateToLoginScreen();
    await this.assertLoginScreenVisible();
  }
}