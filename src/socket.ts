import { Server } from "socket.io";
import { Server as HttpServer } from "http";

import socketConfig from "@config/socketConfig";
import logger from "@config/logger";
import connectionHandler from "@handlers/connectionHandler";


const socketConnection = (httpServer: HttpServer) => {
  // Declare WS server
  try {
    const socketIO = new Server(httpServer, socketConfig);
    logger.info("SocketIO connected");
    return socketIO;
  } catch(err) {
    logger.error(err, "SocketIO connection aborted");
  } 
};

const socketInit = (httpServer: HttpServer) => {
  const socketIO = socketConnection(httpServer);
  
  // Abort function if connection error occured
  if (!socketIO) return;
  
  socketIO.on("connection", connectionHandler); 
};

export default socketInit;
