export async function resetEnvironment(appPackage?: string): Promise<void> {
  if (driver.isMobile) {
    if (appPackage) {
      console.log(`🔄 Terminating and activating app: ${appPackage}`);
      await driver.terminateApp(appPackage);
      await driver.activateApp(appPackage);
    } else {
      console.log('🔄 Resetting mobile app...');
      await (driver as WebdriverIO.Browser & { resetApp: () => Promise<void> }).resetApp();
    }
  } else {
    console.log('🔄 Reloading browser session...');
    await driver.reloadSession();
  }
}