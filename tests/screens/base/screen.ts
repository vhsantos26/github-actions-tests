export default abstract class Screen {
  abstract androidLocators: Record<string, string>;
  abstract iosLocators: Record<string, string>;

  get locators() {
    return driver.isAndroid ? this.androidLocators : this.iosLocators;
  }
}
