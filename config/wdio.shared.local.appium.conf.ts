import {config} from './wdio.shared.conf';

config.services = (config.services ? config.services : []).concat([
  [
    'appium',
    {
      command: 'appium',
      args: {
        relaxedSecurity: true,
        log: './logs/appium.log',
      },
    },
  ],
]);
config.port = 4723;
config.path = '/wd/hub';

export default config;
