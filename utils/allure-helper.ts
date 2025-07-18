import allure from '@wdio/allure-reporter';

export function step(title: string, action: () => Promise<void>) {
  return (async () => {
    allure.startStep(title);
    await action();
    allure.endStep();
  })();
}

export async function capture(title = 'Screenshot') {
  const png = await driver.takeScreenshot();
  allure.addAttachment(title, png, 'image/png');
}

export function annotateTest({
  feature,
  severity = 'normal',
  platform = 'Android',
}: { feature: string; severity?: string; platform?: string }) {
  allure.addFeature(feature);
  allure.addSeverity(severity);
  allure.addLabel('platform', platform);
}