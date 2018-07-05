import { AppPage } from './app.po';

describe('Login', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should login and see tax page', () => {
    page.navigateToSignInPage();
    page.signIn();
    expect(page.getTaxPageHeader()).toEqual('You can fill your personal income');
  });
});
