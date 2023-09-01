import NotificationScreen from '../../../screens/notification.screen';
import SetupScreen from '../../../screens/setup.screen';
import HomeScreen from '../../../screens/home.screen';
import Gestures from '../../../../helpers/gestures.helper';
import DeviceHelper from '../../../../helpers/device.helper';

const shouldShowNotificationPermissionScreen: boolean =
  DeviceHelper.shouldShowNotificationPermissionScreen();

describe('Home screen Top Stories section AJE @homepage @aje', () => {
  before(async () => {
    await SetupScreen.header.waitForDisplayed();

    const enableChannel = ['aje'];
    var disableChannel: string[] = ['aja', 'ajm', 'ajb', 'ajc', 'ajd'];

    // enabling channel
    for (let i = 0; i < enableChannel.length; i++) {
      await SetupScreen.enableChannel(enableChannel[i]);
    }

    // disabling channel
    for (let i = 0; i < disableChannel.length; i++) {
      await SetupScreen.disableChannel(disableChannel[i]);
    }

    await (await SetupScreen.getStartedBtn).click();

    if (shouldShowNotificationPermissionScreen) {
      await NotificationScreen.header.waitForDisplayed();
      await NotificationScreen.notificationNoThanksBtn.click();
    }

    await HomeScreen.headerLogo.waitForDisplayed();
  });

  it('Header Logo should be visible', async () => {
    await expect(await HomeScreen.headerLogo).toBeExisting();
  });

  it('Top Stories label should be visible', async () => {
    await expect(await HomeScreen.topStoriesLabel).toBeExisting();
  });

  it('7 stories should be visible', async () => {
    // scrolling to the top before starting the test
    await Gestures.swipeUntilElementPresent(
      await HomeScreen.topStoriesLabel,
      10,
      0,
      'down',
    );

    const postTitleArray = await HomeScreen.getNumberOfTopStoriesInHomepage();

    expect(postTitleArray.length).toEqual(7);
  });

  it('each Post Title should have more than 10 characters', async () => {
    // scrolling to the top before starting the test
    await Gestures.swipeUntilElementPresent(
      await HomeScreen.topStoriesLabel,
      10,
      0,
      'down',
    );

    // getting Titles of all Stories in Top Stories section of Homepage
    const postTitleArray = await HomeScreen.getNumberOfTopStoriesInHomepage();

    // validating that each
    for (let i = 0; i < postTitleArray.length; i++) {
      console.log(`${i + 1}. ${postTitleArray[i]}`);
      await expect(postTitleArray[i].length).toBeGreaterThanOrEqual(10);
    }
  });

  it('Ad should be visible', async () => {
    // scrolling to the top before starting the test
    await Gestures.swipeUntilElementPresent(
      await HomeScreen.topStoriesLabel,
      10,
      0,
      'down',
    );

    await Gestures.swipeUntilElementPresent(
      await HomeScreen.nativeAdMediaView,
      10,
      0,
    );
    expect(await HomeScreen.nativeAdMediaView).toBeExisting();
  });
});
