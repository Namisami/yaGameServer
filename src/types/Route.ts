import { ServerResponse } from "http";
import { IncomingMessageWithBody } from "@/types/IncomingMessageWithBody";


export interface Route {
  url: string;
  cb: (req: IncomingMessageWithBody, res: ServerResponse) => Promise<void>;
}
