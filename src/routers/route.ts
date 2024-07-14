export default class Route {
  url = "";
  cb: () => Promise<string | undefined>;

  constructor(url: string, cb: () => Promise<string | undefined>) {
    this.url = url;
    this.cb = cb;
  }
}
