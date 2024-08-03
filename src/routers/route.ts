export default class Route {
  url = "";
  cb: () => Promise<object[] | undefined>;

  constructor(url: string, cb: () => Promise<object[] | undefined>) {
    this.url = url;
    this.cb = cb;
  }
}
