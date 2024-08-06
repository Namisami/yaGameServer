import { ServerResponse } from "http";
import jsonParser from "@/parsers/jsonParser";
import { IncomingMessageWithBody } from "@/types/IncomingMessageWithBody";
import { Route as IRoute } from "@/types/Route";
import logger from "@/config/logger";


export default class Route implements IRoute {
  url;
  cb;

  constructor(url: IRoute["url"], cb: IRoute["cb"]) {
    this.url = url;
    this.cb = cb;
  }

  async execute(req: IncomingMessageWithBody, res: ServerResponse) {
    switch (req.method) {
      case "GET":
        await this.cb(req, res);
        break;
      case "POST":
        jsonParser(req, res)
          .then(async (parsedReq) => await this.cb(parsedReq, res))
          .catch((err) => logger.error(err, "Error when parsing incoming message"));
        break;
      default:
        await this.cb(req, res);
    }
  }
}
