// import { getElementText } from '../../helpers/elements.helper';
import Screen from './base/screen';
import Gestures from '../../helpers/gestures.helper';

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

  get postImage() {
    return $(this.locators.postImage);
  }

  get postImages() {
    return $$(this.locators.postImage);
  }

  get postTitle() {
    return $(this.locators.postTitle);
  }

  get postTitles() {
    return $$(this.locators.postTitle);
  }

  get postDate() {
    return $(this.locators.postDate);
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

  async getNumberOfTopStoriesInHomepage() {
    let isLatestStoriesLabelVisible =
      await this.latestStoriesLabel.isDisplayed();

    let postTitleArray = [''];
    let postTitlesCounter = 0;

    // setting max number of iterations to 20 which are more than enough for reaching the "Latest Stories" label
    for (let i = 0; i < 20; i++) {
      // swiping if it's not the first iteration
      if (i !== 0) {
        await Gestures.swipeUp(0.5);
      }

      let numOfPostTitlesInViewPort = (await this.postTitles).length;

      for (let j = 0; j < numOfPostTitlesInViewPort; j++) {
        postTitleArray[postTitlesCounter] = (
          await (await this.postTitles)[j].getText()
        ).toString();
        postTitlesCounter++;
      }

      isLatestStoriesLabelVisible = await (
        await this.latestStoriesLabel
      ).isDisplayed();

      // stop fetching post titles when "Latest Stories" label is visible on the screen
      if (isLatestStoriesLabelVisible) {
        break;
      }
    }

    // removing duplicate titles from array
    let uniquePostTitlesArray = postTitleArray.filter(
      (value, index, array) => array.indexOf(value) === index,
    );

    return uniquePostTitlesArray;
  }
}

export default new HomeScreen();
