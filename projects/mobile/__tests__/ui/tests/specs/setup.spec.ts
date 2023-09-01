import SetupScreen from '../screens/setup.screen';
import ElementHelper from '../../helpers/elements.helper';
import {channelsCombination} from '../assets/data/channelsCombination';

describe('Setup screen @setup', () => {
  before(async () => {
    await SetupScreen.header.waitForDisplayed();
  });

  context('when the app is freshly installed', () => {
    it('then all the screen elements must be present', async () => {
      const expectations = [
        SetupScreen.header,
        SetupScreen.arabicLabel,
        SetupScreen.arabicSwitch,
        SetupScreen.mubasherLabel,
        SetupScreen.mubasherSwitch,
        SetupScreen.documentaryLabel,
        SetupScreen.documentarySwitch,
        SetupScreen.englishLabel,
        SetupScreen.englishSwitch,
        SetupScreen.balkansLabel,
        SetupScreen.balkansSwitch,
        SetupScreen.chineseLabel,
        SetupScreen.chineseSwitch,
        SetupScreen.agreementPrivacyPolicy,
        SetupScreen.updateSelectionInfo,
        SetupScreen.getStartedBtn,
      ].map(async element => {
        await expect(element).toBeExisting();
      });

      await Promise.all(expectations);
    });

    it('then the header text must be displayed correctly', async () => {
      await expect(SetupScreen.header).toHaveText(SetupScreen.headerText);
    });

    it('then only one channel must be enabled by default', async () => {
      const switches = [
        SetupScreen.englishSwitch,
        SetupScreen.balkansSwitch,
        SetupScreen.chineseSwitch,
        SetupScreen.arabicSwitch,
        SetupScreen.mubasherSwitch,
        SetupScreen.documentarySwitch,
      ];

      const states = await Promise.all(
        switches.map(async switchElement => {
          return await ElementHelper.isSwitchEnabled({
            element: switchElement,
          });
        }),
      );

      expect(states.filter(state => state)).toHaveLength(1);
      expect(
        await ElementHelper.isSwitchEnabled({
          element: SetupScreen.englishSwitch,
        }),
      ).toBe(true);
    });

    it('then privacy policy text must be displayed correctly', async () => {
      const privacyPolicyText = await ElementHelper.getElementText({
        element: SetupScreen.agreementPrivacyPolicy,
      });
      expect(privacyPolicyText).toBe(SetupScreen.privacyPolicyText);
    });

    it('then the update channel selection info text must be displayed correctly', async () => {
      const updateSelectionInfoText = await ElementHelper.getElementText({
        element: SetupScreen.updateSelectionInfo,
      });
      expect(updateSelectionInfoText).toBe(SetupScreen.updateSelectionInfoText);
    });
  });

  describe('when the user selects different combinations of channels @slow', () => {
    channelsCombination.forEach(channels => {
      it(`then the "Get Started" button must be enabled with ${channels.enabled.join(
        ', ',
      )} channel(s) enabled`, async () => {
        await Promise.all(
          channels.enabled.map(async channel => {
            const switchElement = SetupScreen.getChannelSwitch(channel);
            await ElementHelper.changeSwitchState({
              element: switchElement,
              state: true,
            });
            expect(
              await ElementHelper.isSwitchEnabled({element: switchElement}),
            ).toBe(true);
          }),
        );

        await Promise.all(
          channels.disabled.map(async channel => {
            const switchElement = SetupScreen.getChannelSwitch(channel);
            await ElementHelper.changeSwitchState({
              element: switchElement,
              state: false,
            });
            expect(
              await ElementHelper.isSwitchEnabled({element: switchElement}),
            ).toBe(false);
          }),
        );

        await expect(SetupScreen.getStartedBtn).toBeEnabled();
      });
    });
  });

  describe('when the user disables all channels', () => {
    it('then the "Get Started" button must not be enabled', async () => {
      const channels = {
        enabled: [],
        disabled: ['aje', 'ajb', 'ajc', 'aja', 'ajm', 'ajd'],
      };

      await Promise.all(
        channels.disabled.map(async channel => {
          const switchElement = SetupScreen.getChannelSwitch(channel);
          await ElementHelper.changeSwitchState({
            element: switchElement,
            state: false,
          });
          expect(
            await ElementHelper.isSwitchEnabled({element: switchElement}),
          ).toBe(false);
        }),
      );

      await expect(SetupScreen.getStartedBtn).not.toBeEnabled();
    });
  });
});
