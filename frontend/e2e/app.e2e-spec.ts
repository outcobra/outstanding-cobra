import { FrontendPage } from './app.po';
import {by, ElementFinder, ExpectedConditions} from 'protractor';

describe('frontend App', function() {
  let page: FrontendPage;

  beforeEach(() => {
    page = new FrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
  });
});
