import { remote } from 'webdriverio'

// 🔧 Desired capabilities untuk Settings app
const capabilities = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Android',
  'appium:appPackage': 'com.android.settings',
  'appium:appActivity': '.Settings',
  'appium:adbExecTimeout': 20000
}

// 🔧 Opsi koneksi ke Appium server
const wdOpts = {
  hostname: process.env.APPIUM_HOST || 'localhost',
  port: parseInt(process.env.APPIUM_PORT ?? '4723', 10),
  logLevel: 'info' as const,
  capabilities
}

async function runTest() {
  console.log('🔧 Starting Appium session...')
  const driver = await remote(wdOpts)

  try {
    console.log('📱 Navigating to Settings → Battery')
    const batteryItem = await driver.$('//*[@text="Battery"]')

    if (await batteryItem.isDisplayed()) {
      console.log('✅ Battery item found, clicking...')
      await batteryItem.click()
    } else {
      console.warn('⚠️ Battery item not visible!')
    }
  } catch (err: any) {
    console.error('❌ Error during test:', err.message)
  } finally {
    await driver.pause(1000)
    await driver.deleteSession()
    console.log('🔚 Appium session ended.')
  }
}

runTest().catch(console.error)