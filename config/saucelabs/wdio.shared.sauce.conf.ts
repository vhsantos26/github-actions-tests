import {config} from '../wdio.shared.conf';
import {conf} from '../wdio.shared.conf';

conf.reportPortalClientConfig.launch = 'E2E Remote Execution';

config.services = (config.services ? config.services : []).concat([
  ['sauce', {}],
]);

config.user = process.env.SAUCE_USERNAME;
config.key = process.env.SAUCE_ACCESS_KEY;
config.region = 'us';
config.connectionRetryTimeout = 180000;
config.port = 443;
config.path = '/wd/hub';
config.protocol = 'https';
config.hostname = 'ondemand.us-west-1.saucelabs.com';

config.specs = ['../../tests/**/*.spec.ts'];

export default config;
