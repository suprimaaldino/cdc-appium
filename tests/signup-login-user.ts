import { step, capture, annotateTest } from '../utils/allure-helper';
import loginPage from '../pages/login-page';
import TestData from '../data/test-data';
import { resetEnvironment } from '../utils/reset-environment';

const login = new loginPage();

describe('User signup and login flow', () => {
  beforeEach(async () => {
    await resetEnvironment();
    await login.navigateToLoginScreen();
  });

  afterEach(async () => {
    await resetEnvironment(); // optional cleanup
  });

  it('should complete signup and show success message', async () => {
    annotateTest({ feature: 'Signup', severity: 'critical' });
    const email = `test_${Date.now()}@example.com`;
    const password = TestData.validUser.password;

    await step('Fill signup form', async () => {
      await login.fillSignupForm(email, password);
    });

    await step('Verify signup success toast', async () => {
      await login.assertSignupSuccess();
    });

    await capture('Signup success toast');
  });

  it('should login using signed-up credentials', async () => {
    annotateTest({ feature: 'Login', severity: 'critical' });
    const email = `test_${Date.now()}@example.com`;
    const password = TestData.validUser.password;

    await step('Setup: Create user account', async () => {
      await login.fillSignupForm(email, password);
      await login.assertSignupSuccess();
    });

    await step('Login with created credentials', async () => {
      await login.userLogin(email, password);
    });

    await step('Verify login success', async () => {
      await login.assertLoginSuccess();
    });

    await capture('Login success toast');
  });
});
