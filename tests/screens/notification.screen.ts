import Screen from './base/screen';

class NotificationScreen extends Screen {
  androidLocators = {
    header: '//*[@resource-id="notificationRequestHeader"]',
    description: '//*[@resource-id="notificationDescriptionTxt"]',
    enableNotificationBtn: '//*[@resource-id="enableNotificationsBtn"]',
    notificationNoThanksBtn: '//*[@resource-id="notificationNoThanksBtn"]',
  };
  iosLocators = {
    header: '~notificationRequestHeader',
    description: '~notificationDescriptionTxt',
    enableNotificationBtn: '~enableNotificationsBtn',
    notificationNoThanksBtn: '~notificationNoThanksBtn',
  };

  get header() {
    return $(this.locators.header);
  }

  get description() {
    return $(this.locators.description);
  }

  get enableNotificationBtn() {
    return $(this.locators.enableNotificationBtn);
  }

  get notificationNoThanksBtn() {
    return $(this.locators.notificationNoThanksBtn);
  }

  get notificationHeaderText(): string {
    return 'Notifications';
  }

  get notificationDescriptionText(): string {
    return `Enabling notifications is the best way to stay up to date with the latest news and stories from Al Jazeera.\n\nAfter tapping the button below your phone will show you a prompt. Choose OK to allow this app to send you notifications.`;
  }

  get enableNotificationBtnText(): string {
    return 'Enable Notifications';
  }

  get notificationNoThanksBtnText(): string {
    return 'No, thanks';
  }
}

export default new NotificationScreen();
