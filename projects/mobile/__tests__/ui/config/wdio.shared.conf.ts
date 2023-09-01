const reportportal = require('wdio-reportportal-reporter');
const RpService = require('wdio-reportportal-service');
import {
  formatFilename,
  getOutputDir,
  saveScreenshot,
  sendScreenshotToReport,
} from '../helpers/config.helper';

export const conf = {
  reportPortalClientConfig: {
    endpoint: 'https://reportportal.ajmn.digital/api/v1',
    token: process.env.RP_TOKEN,
    launch: '',
    project: 'ump',
    debug: false,
    attributes: [{key: 'branch', value: process.env.BRANCH_NAME ?? 'develop'}],
    reportSeleniumCommands: true,
    seleniumCommandsLogLevel: 'debug',
    autoAttachScreenshots: false,
    screenshotsLogLevel: 'info',
    parseTagsFromTestTitle: false,
    sanitizeErrorMessages: true,
  },
};

export const config: WebdriverIO.Config = {
  runner: 'local',
  specs: ['../tests/specs/**/*.ts'],
  exclude: [],
  capabilities: [],
  logLevel: 'debug',
  bail: 0,
  waitforTimeout: 25000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: [[RpService, {}]],
  framework: 'mocha',
  reporters: ['spec', [reportportal, conf]],
  mochaOpts: {
    ui: 'bdd',
    timeout: 180000,
    retries: 0,
  },

  async afterTest(test: any, _: any, result: any) {
    if (!result.passed) {
      const filename = formatFilename(test.title);
      const outputDir = getOutputDir();

      await saveScreenshot(outputDir, filename);
      sendScreenshotToReport(test, outputDir, filename);
    }
  },
};
