import { ServerResponse } from "http";
import { IncomingMessageWithBody } from "./IncomingMessageWithBody";

export interface ControllerMethod {
  req: IncomingMessageWithBody
  res: ServerResponse
}
