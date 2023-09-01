import DeviceHelper from '../../helpers/device.helper';
import HomeScreen from '../screens/home.screen';
import NotificationScreen from '../screens/notification.screen';
import SetupScreen from '../screens/setup.screen';

const platform: string = driver.isIOS ? 'iOS' : 'Android version 13';
const shouldShowNotificationPermissionScreen: boolean =
  DeviceHelper.shouldShowNotificationPermissionScreen();

describe('Notification Permission Screen', () => {
  before(async () => {
    await SetupScreen.header.waitForDisplayed();
    await SetupScreen.getStartedBtn.click();
  });

  if (shouldShowNotificationPermissionScreen) {
    context(`Given the app is launched on ${platform}`, () => {
      it('Then the Notification Permission screen should be displayed', async () => {
        await expect(NotificationScreen.header).toBeExisting();
        await expect(NotificationScreen.description).toBeExisting();
        await expect(NotificationScreen.enableNotificationBtn).toBeExisting();
        await expect(NotificationScreen.notificationNoThanksBtn).toBeExisting();
      });

      it('And the screen elements text should be displayed correctly', async () => {
        await expect(NotificationScreen.header).toHaveText(
          NotificationScreen.notificationHeaderText,
        );
        await expect(NotificationScreen.description).toHaveText(
          NotificationScreen.notificationDescriptionText,
        );
        await expect(NotificationScreen.enableNotificationBtn).toHaveText(
          NotificationScreen.enableNotificationBtnText,
        );
        await expect(NotificationScreen.notificationNoThanksBtn).toHaveText(
          NotificationScreen.notificationNoThanksBtnText,
        );
      });
    });
  } else {
    context('Given the app is launched on Android version 12 and below', () => {
      it('Then the Home screen should be displayed', async () => {
        await expect(HomeScreen.headerLogo).toBeExisting();
      });

      it('And the Notification Permission screen should not be displayed', async () => {
        await expect(NotificationScreen.header).not.toBeExisting();
        await expect(NotificationScreen.description).not.toBeExisting();
        await expect(
          NotificationScreen.enableNotificationBtn,
        ).not.toBeExisting();
        await expect(
          NotificationScreen.notificationNoThanksBtn,
        ).not.toBeExisting();
      });
    });
  }
});
