class ElementHelper {
  /**
   * The isSwitchEnabled() function takes an element as an argument and returns a
   * boolean indicating whether the switch is enabled or not. It determines the
   * state of the switch based on the platform, either by checking the checked
   *  attribute on Android or the value attribute on other platforms (e.g.: iOS).
   * @param element
   * @returns boolean
   */
  static async isSwitchEnabled({
    element,
  }: {
    element: WebdriverIO.Element;
  }): Promise<boolean> {
    if (driver.isAndroid) {
      return (await element.getAttribute('checked')) === 'true';
    } else {
      return (await element.getAttribute('value')) === '1';
    }
  }

  /**
   * The changeSwitchState() function takes an element and a boolean state as arguments
   * and changes the state of the switch to the desired state. It first checks the
   * current state of the switch with isSwitchEnabled() and only clicks the element
   * if the current state is different from the desired state. If the state does not
   * change after clicking the element, the function recursively calls itself until
   * the switch state is changed.
   * @param element
   * @param state
   */
  static async changeSwitchState({
    element,
    state,
  }: {
    element: WebdriverIO.Element;
    state: boolean;
  }) {
    const switchState = await this.isSwitchEnabled({element});

    if (state !== switchState) {
      await element.click();
      const newSwitchState = await this.isSwitchEnabled({element});
      if (state !== newSwitchState) {
        await this.changeSwitchState({element, state});
      }
    }
  }

  /**
   * The getElementText() function takes an element as an argument and returns the
   * text or label of the element, depending on the platform. It returns the text
   * attribute on Android and the label attribute on other platforms.
   * @param element
   * @returns string
   */
  static async getElementText({
    element,
  }: {
    element: WebdriverIO.Element;
  }): Promise<string> {
    if (driver.isAndroid) {
      return (
        (await element.getText()) ??
        (await element.getAttribute('content-desc'))
      );
    } else {
      return await element.getAttribute('label');
    }
  }

  /**
   * The isButtonEnabled method checks whether an element is enabled, with the check
   * varying based on the platform. For iOS, it directly checks if the element is enabled.
   * For other platforms (e.g., Android), it checks if the 'index' attribute of the element is '1'.
   *
   * @param element - The element whose enabled status is to be checked.
   * @returns boolean - The enabled status of the element.
   */
  static async isButtonEnabled({
    element,
  }: {
    element: WebdriverIO.Element;
  }): Promise<boolean> {
    if (driver.isIOS) {
      return await element.isEnabled();
    } else {
      return (await element.getAttribute('index')) === '1';
    }
  }

  /**
   * The isSwitch method checks whether an element is a switch, with the check varying
   * based on the platform. For iOS, it checks if the element has a type attribute with
   * the value 'XCUIElementTypeSwitch'. For other platforms (e.g., Android), it checks
   * if the element has a class attribute with the value 'android.widget.Switch'.
   * @param element - The element whose type is to be checked.
   * @returns boolean - The type of the element.
   */
  static async isSwitch(element: WebdriverIO.Element): Promise<boolean> {
    if (driver.isIOS) {
      return (await element.getAttribute('type')) === 'XCUIElementTypeSwitch';
    } else {
      return (await element.getAttribute('class')) === 'android.widget.Switch';
    }
  }
}

export default ElementHelper;
