import { deepLinkHandler as deepLinkHandler } from '../DeepLinkHandlerClass';

beforeEach(() => {
  deepLinkHandler.markAllLinksAsHandled();
  deepLinkHandler.startHandlingLinksAutomatically();
});

describe('Deep Link Handler', () => {
  test('adds a new link', () => {
    const linkToAdd = 'https://example.com';
    deepLinkHandler.addLink(linkToAdd);

    expect(deepLinkHandler.links).toEqual([linkToAdd]);
  });

  test('adds a link and then tries to handle it, and marks it as handled', () => {
    const linkToAdd = 'https://example.com';
    deepLinkHandler.addLink(linkToAdd);

    deepLinkHandler.markLinkAsHandled();

    expect(deepLinkHandler.links).toEqual([]);
  });

  test('add link handler', () => {
    const mockHandler = jest.fn();
    deepLinkHandler.addLinkHandler(mockHandler);
    deepLinkHandler.stopHandlingLinksAutomatically();

    const linkToAdd = 'https://example.com';
    deepLinkHandler.addLink(linkToAdd);

    deepLinkHandler.handleLinks();

    expect(mockHandler).toHaveBeenCalled();
  });

  test('handler is called automatically', () => {
    const mockHandler = jest.fn();
    deepLinkHandler.addLinkHandler(mockHandler);

    const linkToAdd = 'https://example.com';
    deepLinkHandler.addLink(linkToAdd);

    expect(mockHandler).toHaveBeenCalled();
  });
});
