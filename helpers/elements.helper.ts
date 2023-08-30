import {ChainablePromiseElement} from 'webdriverio';

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
    element: ChainablePromiseElement<WebdriverIO.Element>;
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
    element: ChainablePromiseElement<WebdriverIO.Element>;
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
  static getElementText({
    element,
  }: {
    element: ChainablePromiseElement<WebdriverIO.Element>;
  }): Promise<string> {
    if (driver.isAndroid) {
      return element.getText();
    } else {
      return element.getAttribute('label');
    }
  }
}

export default ElementHelper;
