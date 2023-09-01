import config from './wdio.shared.local.appium.conf';
import {conf} from './wdio.shared.conf';

conf.reportPortalClientConfig.launch = 'E2E Local Execution';
conf.reportPortalClientConfig.attributes.push({
  key: 'platform',
  value: 'android',
});

config.capabilities = [
  {
    maxInstances: 1,
    platformName: 'Android',
    'appium:app':
      '/Users/hugo/Developer/ump/projects/mobile/android/universal.apk',
    'appium:deviceName': 'Pixel 6 pro',
    'appium:platformVersion': '13',
    'appium:orientation': 'PORTRAIT',
    'appium:automationName': 'UiAutomator2',
    'appium:appPackage': 'com.aljazeera.mobile',
    'appium:appWaitActivity': 'MainActivity',
  },
];

exports.config = config;
