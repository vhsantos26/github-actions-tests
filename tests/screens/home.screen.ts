// import { getElementText } from '../../helpers/elements.helper';
import Screen from './base/screen';

class HomeScreen extends Screen {
  androidLocators = {
    headerLogo: '//*[@resource-id="ajHeaderLogo"]',
    topStoriesLabel:
      'android=new UiSelector().text("TOP STORIES").className("android.widget.TextView")',
    latestStoriesLabel:
      'android=new UiSelector().text("LATEST STORIES").className("android.widget.TextView")',
    postImage: '//*[@resource-id="postImage"]',
    postTitle: '//*[@resource-id="postTitle"]',
    postDate: '//*[@resource-id="postDate"]',
    playIcon: '//*[@resource-id="playIcon"]',
    liveUpdatesIcon: '//*[@resource-id="liveUpdatesIcon"]',
    nativeAdMediaView: '//*[@resource-id="NativeAdMediaView"]',
  };
  iosLocators = {
    headerLogo: '~ajHeaderLogo',
    topStoriesLabel: '~Top Stories',
    latestStoriesLabel: '~Latest Stories',
    postImage: '(//*[@name="postImage"])[1]',
    postTitle: '(//*[@name="postTitle"])[1]',
    postDate: '(//*[@name="postDate"])[1]',
    playIcon: '(//*[@name="playIcon"])[1]',
    liveUpdatesIcon: '~liveUpdatesIcon',
    nativeAdMediaView: '~nativeAdMediaView',
  };

  get headerLogo() {
    return $(this.locators.headerLogo);
  }
  get topStoriesLabel() {
    return $(this.locators.topStoriesLabel);
  }
  get latestStoriesLabel() {
    return $(this.locators.latestStoriesLabel);
  }

  get postImages() {
    return $$(this.locators.postImage);
  }

  get postTitles() {
    return $$(this.locators.postTitle);
  }
  get postDates() {
    return $$(this.locators.postDate);
  }

  get playIcon() {
    return $(this.locators.playIcon);
  }
  get liveUpdatesIcon() {
    return $(this.locators.liveUpdatesIcon);
  }
  get nativeAdMediaView() {
    return $(this.locators.nativeAdMediaView);
  }
}

export default new HomeScreen();
