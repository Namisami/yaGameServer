import { IncomingMessage } from "http";
import { IncomingMessageBody } from "@/types/IncomingMessageBody";

export interface IncomingMessageWithBody extends IncomingMessage {
  body?: IncomingMessageBody
}
