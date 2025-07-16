import loginPage from '../pages/login-page';
import TestData from '../data/test-data';
import allure from '@wdio/allure-reporter';

const login = new loginPage();

describe('User Signup Flow', () => {
  it('should complete signup and show success message', async () => {
    const { email, password } = TestData.validUser;

    allure.addFeature('Signup');
    allure.addSeverity('critical');
    allure.addLabel('platform', 'Android');

    allure.startStep('Fill signup form');
    await login.fillSignupForm(email, password);
    allure.endStep();

    allure.startStep('Verify signup toast');
    await login.assertSignupSuccess();
    allure.endStep();

    allure.addAttachment('Toast Screenshot', await driver.takeScreenshot(), 'image/png');
  });
});