import { ServerResponse } from "http";
// import logger from "@/config/logger";
// import jsonParser from "@/parsers/jsonParser";
import { IncomingMessageWithBody } from "@/types/IncomingMessageWithBody";

class controller {
  static async login(req: IncomingMessageWithBody, res: ServerResponse): Promise<void> {
    const { test } = req.body;
    console.log(test);
    // req.on('data', (chunk) => {
    //   logger.info(chunk);
    // });
    // res.setHeader("Content-Type", "application/json");
    // res.end("All ok");
    // const [controllerReq, controllerRes] = jsonParser(req, res);
    res.end("All ok");
  }
}

export default controller;
