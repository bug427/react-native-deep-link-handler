class DeepLinkHandlerClass {
  links: string[] = [];
  linkHandler: (url: string[]) => Promise<boolean>;
  handleLinksAutomatically = true;
  linksAreBeiningHandled = false;

  addLink(link: string) {
    // can't add links while they are being handled
    if (this.linksAreBeiningHandled) return;

    if (this.links.find((l) => l === link)) return;

    this.links.push(link);

    if (this.handleLinksAutomatically) {
      this.handleLinks();
    }
  }

  markLinkAsHandled(link?: string) {
    if (link) {
      const index = this.links.findIndex((l) => l === link);
      this.links.splice(index, 1);
    } else {
      this.links.pop();
    }
  }

  markAllLinksAsHandled() {
    this.links = [];
  }

  async handleLinks(): Promise<boolean> {
    if (!this.linkHandler) return false;

    if (this.links.length === 0) return false;

    if (this.linksAreBeiningHandled) return false;

    this.linksAreBeiningHandled = true;
    const result = await this.linkHandler(this.links);
    this.linksAreBeiningHandled = false;

    return result;
  }

  startHandlingLinksAutomatically() {
    this.handleLinksAutomatically = true;
  }

  stopHandlingLinksAutomatically() {
    this.handleLinksAutomatically = false;
  }

  addLinkHandler(handler: (url: string[]) => Promise<boolean>) {
    this.linkHandler = handler;
  }
}

export const deepLinkHandler = new DeepLinkHandlerClass();
