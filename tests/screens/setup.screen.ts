import Screen from './base/screen';

class SetupScreen extends Screen {
  androidLocators = {
    header: '//*[@resource-id="channelSelectionHeader"]',
    arabicLabel: '//*[@resource-id="channel_عربي"]',
    arabicSwitch: '//*[@resource-id="switch_عربي"]',
    mubasherLabel: '//*[@resource-id="channel_مباشر"]',
    mubasherSwitch: '//*[@resource-id="switch_مباشر"]',
    documentaryLabel: '//*[@resource-id="channel_الوثائقية"]',
    documentarySwitch: '//*[@resource-id="switch_الوثائقية"]',
    englishLabel: '//*[@resource-id="channel_English"]',
    englishSwitch: '//*[@resource-id="switch_English"]',
    balkansLabel: '//*[@resource-id="channel_Balkans"]',
    balkansSwitch: '//*[@resource-id="switch_Balkans"]',
    chineseLabel: '//*[@resource-id="channel_中文网"]',
    chineseSwitch: '//*[@resource-id="switch_中文网"]',
    updateSelectionInfo: '//*[@resource-id="updateSelectionInfoText"]',
    agreementPrivacyPolicy: '//*[@resource-id="agreementText"]',
    getStartedBtn: '//*[@resource-id="getStartedBtn"]',
  };
  iosLocators = {
    header: '~channelSelectionHeader',
    groupSwitch: '~channelGroupSwitch',
    arabicLabel: '~channel_عربي',
    arabicSwitch: '~switch_عربي',
    mubasherLabel: '~channel_مباشر',
    mubasherSwitch: '~switch_مباشر',
    documentaryLabel: '~channel_الوثائقية',
    documentarySwitch: '~switch_الوثائقية',
    englishLabel: '~channel_English',
    englishSwitch: '~switch_English',
    balkansLabel: '~channel_Balkans',
    balkansSwitch: '~switch_Balkans',
    chineseLabel: '~channel_中文网',
    chineseSwitch: '~switch_中文网',
    updateSelectionInfo: '~updateSelectionInfoText',
    agreementPrivacyPolicy: '~agreementText',
    getStartedBtn: '~getStartedBtn',
  };

  get header() {
    return $(this.locators.header);
  }

  get groupSwitch() {
    return $(this.locators.groupSwitch);
  }

  get arabicLabel() {
    return $(this.locators.arabicLabel);
  }

  get arabicSwitch() {
    return $(this.locators.arabicSwitch);
  }

  get mubasherLabel() {
    return $(this.locators.mubasherLabel);
  }

  get mubasherSwitch() {
    return $(this.locators.mubasherSwitch);
  }

  get documentaryLabel() {
    return $(this.locators.documentaryLabel);
  }

  get documentarySwitch() {
    return $(this.locators.documentarySwitch);
  }

  get englishLabel() {
    return $(this.locators.englishLabel);
  }

  get englishSwitch() {
    return $(this.locators.englishSwitch);
  }

  get balkansLabel() {
    return $(this.locators.balkansLabel);
  }

  get balkansSwitch() {
    return $(this.locators.balkansSwitch);
  }

  get chineseLabel() {
    return $(this.locators.chineseLabel);
  }

  get chineseSwitch() {
    return $(this.locators.chineseSwitch);
  }

  get updateSelectionInfo() {
    return $(this.locators.updateSelectionInfo);
  }

  get agreementPrivacyPolicy() {
    return $(this.locators.agreementPrivacyPolicy);
  }

  get getStartedBtn() {
    return $(this.locators.getStartedBtn);
  }

  get headerText() {
    return 'Select channels';
  }

  get privacyPolicyText() {
    return 'By continuing you agree to the terms in our privacy policy';
  }

  get updateSelectionInfoText() {
    return 'You can update your selection at any time in settings.';
  }

  getChannelSwitch(channel: string) {
    switch (channel.toLowerCase()) {
      case 'aja':
        return this.arabicSwitch;
      case 'ajm':
        return this.mubasherSwitch;
      case 'ajd':
        return this.documentarySwitch;
      case 'aje':
        return this.englishSwitch;
      case 'ajb':
        return this.balkansSwitch;
      case 'ajc':
        return this.chineseSwitch;
      default:
        throw new Error(`Channel ${channel} is not supported`);
    }
  }
}

export default new SetupScreen();
