import { IncomingMessage } from "http";

export interface IncomingMessageWithBody extends IncomingMessage {
  body: object
}
