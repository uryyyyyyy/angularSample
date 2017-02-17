import { AngularSamplePage } from './app.po';

describe('angular-sample App', () => {
  let page: AngularSamplePage;

  beforeEach(() => {
    page = new AngularSamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
