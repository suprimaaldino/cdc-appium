import { ChainablePromiseElement } from 'webdriverio';

export default class homePage {

  get homeMenu(): ChainablePromiseElement {
    return $('android=new UiSelector().text("Home")');
  }

  get webviewMenu(): ChainablePromiseElement {
    return $('android=new UiSelector().text("Webview")');
  }

  get formsMenu(): ChainablePromiseElement {
    return $('android=new UiSelector().text("Forms")');
  }

  get swipeMenu(): ChainablePromiseElement {
    return $('android=new UiSelector().text("Swipe")');
  }

  get dragMenu(): ChainablePromiseElement {
    return $('android=new UiSelector().text("Drag")');
  }

  async tapHomeMenu() {
    await this.homeMenu.tap();
  }

  async tapWebviewMenu() {
    await this.webviewMenu.tap();
  }

  async tapFormsMenu() {
    await this.formsMenu.tap();
  }

  async tapSwipeMenu() {
    await this.swipeMenu.tap();
  }

  async tapDragMenu() {
    await this.dragMenu.tap();
  }
}