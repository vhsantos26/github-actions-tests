import NotificationScreen from '../screens/notification.screen';
import SetupScreen from '../screens/setup.screen';
import HomeScreen from '../screens/home.screen';
import Gestures from '../../helpers/gestures.helper';

describe('Home screen @in-progress', () => {
  before(async () => {
    await SetupScreen.header.waitForDisplayed();
    SetupScreen.getStartedBtn.click();
    if (!driver.isAndroid) {
      await NotificationScreen.header.waitForDisplayed();
      NotificationScreen.notificationNoThanksBtn.click();
    }
    await HomeScreen.headerLogo.waitForDisplayed();
  });

  it('should display the latest stories', async () => {
    await HomeScreen.topStoriesLabel.waitForDisplayed();
    await Gestures.swipeUntilElementPresent(
      await HomeScreen.latestStoriesLabel,
      10,
    );
    expect(await HomeScreen.latestStoriesLabel).toBeExisting();
  });
});
