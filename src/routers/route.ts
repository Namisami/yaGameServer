import { IncomingMessageWithBody } from "@/types/IncomingMessageWithBody";
import { ServerResponse } from "http";

export default class Route {
  url = "";
  cb: (req: IncomingMessageWithBody, res: ServerResponse) => Promise<void>;

  constructor(url: string, cb: (req: IncomingMessageWithBody, res: ServerResponse) => Promise<void>) {
    this.url = url;
    this.cb = cb;
  }
}
