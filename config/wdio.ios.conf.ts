import config from './wdio.shared.local.appium.conf';
import {conf} from './wdio.shared.conf';

conf.reportPortalClientConfig.launch = 'E2E Local Execution';
conf.reportPortalClientConfig.attributes.push({
  key: 'platform',
  value: 'ios',
});

config.capabilities = [
  {
    maxInstances: 1,
    platformName: 'iOS',
    'appium:app':
      '/Users/hugo/Developer/ump/projects/mobile/ios/DerivedData/Build/Products/Debug-iphonesimulator/AlJazeeraMobile.app',
    'appium:deviceName': 'iPhone 14',
    'appium:platformVersion': '16.4',
    'appium:orientation': 'PORTRAIT',
    'appium:automationName': 'XCUITest',
    'appium:bundleId': 'com.aljazeera.mobile',
    'appium:autoAcceptAlerts': true,
  },
];

exports.config = config;
