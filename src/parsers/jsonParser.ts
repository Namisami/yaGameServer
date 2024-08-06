import { IncomingMessage, ServerResponse } from "http";
import { IncomingMessageWithBody } from "@/types/IncomingMessageWithBody";
import { IncomingMessageBody } from "@/types/IncomingMessageBody";

const jsonParser = (req: IncomingMessage, res: ServerResponse): Promise<IncomingMessageWithBody> => {
  return new Promise((resolve, reject) => {
    let body = "";
    const parsedReq = { ...req } as IncomingMessageWithBody;

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      let parsedBody: IncomingMessageBody;
      try {
        parsedBody = JSON.parse(body);
        parsedReq.body = parsedBody;
        resolve(parsedReq);
      } catch (err) {
        res.statusCode = 400;
        res.end("Invalid request");
        reject(err);
      }
    });
  });
};

export default jsonParser;
