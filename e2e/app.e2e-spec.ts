import { ActionPage } from './app.po';

describe('action App', () => {
  let page: ActionPage;

  beforeEach(() => {
    page = new ActionPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
