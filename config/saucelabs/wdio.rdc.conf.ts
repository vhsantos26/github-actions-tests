import config from './wdio.shared.sauce.conf';
import {conf} from '../wdio.shared.conf';

conf.reportPortalClientConfig.attributes.push({
  key: 'platform',
  value: process.env.REMOTE_PLATFORM_NAME ?? 'unknown',
}, {
  key: 'actor',
  value: process.env.RP_GITHUB_ACTOR ?? 'unknown',
  }
);

config.capabilities = [
  {
    'appium:app': `storage:${process.env.REMOTE_APP_FILE_ID}`,
    'appium:automationName': process.env.REMOTE_PLATFORM_NAME?.toLowerCase() === 'ios' ? 'XCUITest' : 'UiAutomator2',
    'appium:deviceName': process.env.REMOTE_DEVICE_NAME,
    'appium:platformVersion': process.env.REMOTE_PLATFORM_VERSION,
    'appium:useNewWDA': true,
    'appium:waitForQuiescence': false,
    'appium:wdaStartupRetryInterval': 1000,
    'appium:clearSystemFiles': true,
    'appium:shouldUseSingletonTestManager': false,
    'appium:autoDismissAlerts': true,
    platformName: process.env.REMOTE_PLATFORM_NAME,
    'appium:orientation': 'portrait',
    'sauce:options': {
      appiumVersion: process.env.APPIUM_VERSION ?? '2.0.0',
      build: process.env.BRANCH_NAME ?? 'develop',
    },
  },
];

exports.config = config;
