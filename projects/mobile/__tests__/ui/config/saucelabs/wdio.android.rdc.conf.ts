import config from './wdio.shared.sauce.conf';
import {conf} from '../wdio.shared.conf';

conf.reportPortalClientConfig.attributes.push({
  key: 'platform',
  value: 'android',
});

config.capabilities = [
  {
    'appium:app': `storage:${process.env.REMOTE_ANDROID_APP_FILE_ID}`,
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': process.env.REMOTE_ANDROID_DEVICE_NAME,
    'appium:platformVersion': process.env.REMOTE_ANDROID_PLATFORM_VERSION,
    'appium:useNewWDA': true,
    'appium:waitForQuiescence': false,
    'appium:wdaStartupRetryInterval': 1000,
    'appium:clearSystemFiles': true,
    'appium:shouldUseSingletonTestManager': false,
    'appium:autoDismissAlerts': true,
    platformName: 'android',
    'sauce:options': {
      appiumVersion: '2.0.0',
      build: process.env.BRANCH_NAME ?? 'develop',
    },
  },
];

exports.config = config;
