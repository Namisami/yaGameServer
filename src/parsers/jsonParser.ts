import { IncomingMessage } from "http";
import logger from "@config/logger";
import { IncomingMessageWithBody } from "@/types/IncomingMessageWithBody";


const jsonParser = (req: IncomingMessage)  => {
  let body = "";
  const parsedReq = { ...req } as IncomingMessageWithBody;
  
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    let parsedBody: object;
    try {
      parsedBody = JSON.parse(body);
      parsedReq.body = parsedBody;
    } catch (err) {
      logger.error(err, "Error when parsing message");
      // parsedRes.statusCode = 400;
      // return parsedRes.end("Invalid request");
    }
    
    // parsedRes.statusCode = 200;
    // parsedRes.setHeader("Content-Type", "application/json");
  });
  return parsedReq;
};

export default jsonParser;
