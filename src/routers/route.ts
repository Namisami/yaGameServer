import { ServerResponse } from "http";
import jsonParser from "@/parsers/jsonParser";
import { IncomingMessageWithBody } from "@/types/IncomingMessageWithBody";
// import { Route as IRoute } from "@/types/Route";
import logger from "@/config/logger";
import { Socket } from "socket.io";

export interface IRoute {
  url: string;
  method: string;
  cb: (req: IncomingMessageWithBody, res: ServerResponse) => Promise<void>;
}

export interface IRouteSocket {
  event: string
  cb: (socket: Socket) => Promise<void>
}

export default class Route {
  url;
  method;
  #cb;

  constructor(url: IRoute["url"], method: IRoute["method"],  cb: IRoute["cb"]) {
    this.url = url;
    this.method = method;
    this.#cb = cb;
  }

  async execute(req: IncomingMessageWithBody, res: ServerResponse) {
    switch (this.method) {
      case "GET":
        await this.#cb(req, res);
        break;
      case "POST":
        jsonParser(req, res)
          .then(async (parsedReq) => await this.#cb(parsedReq, res))
          .catch((err) => logger.error(err, "Error when parsing incoming message"));
        break;
      default:
        await this.#cb(req, res);
    }
  }
}
