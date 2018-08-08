import { Box2Page } from './app.po';

describe('Box2 App', () => {
    let page: Box2Page;

    beforeEach(() => {
        page = new Box2Page();
    });

    it('should display welcome message', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('Welcome to Box2!');
    });
});
