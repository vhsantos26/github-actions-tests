class DeviceHelper {
  /**
   * Determines whether the Notification Permission screen should be shown to the user.
   *
   * The screen is shown to iOS users, and also to Android users with a platform version
   * of 13 or higher.
   *
   * @returns {boolean} - Returns true if the user's device is iOS, or if the device is
   * Android with a platform version of 13 or higher. Returns false otherwise.
   */
  static shouldShowNotificationPermissionScreen(): boolean {
    const capabilities: any = driver.capabilities;
    return (
      driver.isIOS || (driver.isAndroid && capabilities.platformVersion >= 13)
    );
  }
}

export default DeviceHelper;
