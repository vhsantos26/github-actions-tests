const reportportal = require('wdio-reportportal-reporter');
const fs = require('fs');

export function formatFilename(title: string): string {
  return `${title.replace(/ /g, '_')}.png`;
}

export function getOutputDir(): string {
  return './outputs';
}

export async function saveScreenshot(
  outputDir: string,
  filename: string,
): Promise<void> {
  const path = `${outputDir}/${filename}`;
  await browser.saveScreenshot(path);
}

export function sendScreenshotToReport(
  test: any,
  outputDir: string,
  filename: string,
): void {
  const path = `${outputDir}/${filename}`;
  const data = fs.readFileSync(path);

  reportportal.sendFileToTest(
    test,
    'info',
    filename,
    data,
    'image/png',
    'Last Seen Screenshot',
  );
}
