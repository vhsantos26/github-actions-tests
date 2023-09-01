import SetupScreen from '../screens/setup.screen';
import ElementHelper from '../../helpers/elements.helper';
import {channelsCombination} from '../assets/data/channelsCombination';

describe('Setup screen @setup', () => {
  before(async () => {
    await SetupScreen.header.waitForDisplayed();
  });

  context('Given the app is freshly installed', () => {
    it('Then all screen elements should be present', async () => {
      const expectations = SetupScreen.getScreenElements().map(
        async element => {
          await expect(element).toBeExisting();
        },
      );

      await Promise.all(expectations);
    });

    it('And the header text should be displayed correctly', async () => {
      await expect(SetupScreen.header).toHaveText(SetupScreen.headerText);
    });

    it('And only one channel should be enabled by default', async () => {
      const elements = await Promise.all(SetupScreen.getScreenElements());
      const switches = elements.filter(element =>
        ElementHelper.isSwitch(element),
      );

      const states = await Promise.all(
        switches.map(async switchElement => {
          return await ElementHelper.isSwitchEnabled({
            element: switchElement,
          });
        }),
      );

      expect(states.filter(state => state)).toHaveLength(1);
    });

    it('And the privacy policy text should be displayed correctly', async () => {
      const privacyPolicyElement = await SetupScreen.agreementPrivacyPolicy;
      const privacyPolicyText = await ElementHelper.getElementText({
        element: privacyPolicyElement,
      });
      expect(privacyPolicyText).toBe(SetupScreen.privacyPolicyText);
    });

    it('And the channel selection update info text should be displayed correctly', async () => {
      const updateSelectionInfoElement = await SetupScreen.updateSelectionInfo;
      const updateSelectionInfoText = await ElementHelper.getElementText({
        element: updateSelectionInfoElement,
      });
      expect(updateSelectionInfoText).toBe(SetupScreen.updateSelectionInfoText);
    });
  });

  describe('When the user selects different combinations of channels @slow', () => {
    channelsCombination.forEach(channels => {
      it(`Then the "Get Started" button should be enabled with ${channels.enabled.join(
        ', ',
      )} channel(s) enabled`, async () => {
        await Promise.all(
          channels.enabled.map(async channel => {
            changeChannelState(channel, true);
          }),
        );

        await Promise.all(
          channels.disabled.map(async channel => {
            changeChannelState(channel, false);
          }),
        );

        await expect(SetupScreen.getStartedBtn).toBeEnabled();
      });
    });
  });

  describe('When the user disables all channels', () => {
    it('Then the "Get Started" button should not be enabled', async () => {
      const channels = {
        enabled: [],
        disabled: ['aje', 'ajb', 'ajc', 'aja', 'ajm', 'ajd'],
      };

      await Promise.all(
        channels.disabled.map(async channel =>
          changeChannelState(channel, false),
        ),
      );

      const getStartedBtnElement = await SetupScreen.getStartedBtn;
      await expect(
        ElementHelper.isButtonEnabled({element: getStartedBtnElement}),
      ).not.toBe(true);
    });
  });
});

async function changeChannelState(
  channel: string,
  state: boolean,
): Promise<void> {
  const switchElement = await SetupScreen.getChannelSwitch(channel);
  await ElementHelper.changeSwitchState({
    element: switchElement,
    state: state,
  });

  // Assert the switch state has been changed correctly
  const isSwitchEnabled = await ElementHelper.isSwitchEnabled({
    element: switchElement,
  });
  expect(isSwitchEnabled).toBe(state);
}
