import { browser, by, element } from 'protractor';

export class AppPage {
  navigateToSignInPage() {
    return browser.get('/signin');
  }

  signIn() {
    element(by.css('input[type="email"]')).sendKeys('test@email.com');
    element(by.css('input[type="password"')).sendKeys('pass');
    element(by.css('button')).click();
  }

  getTaxPageHeader() {
    return element(by.css('.header-tax')).getText();
  }
}
