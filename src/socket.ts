import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";

import logger from "@config/logger";
import getNearTilesEvent from "@events/getNearTilesEvent";


const socketConnection = (httpServer: HttpServer) => {
  // Declare WS server
  try {
    const socketIO = new Server(httpServer, {
      cors: {
        // Origin is only for development
        origin: "http://localhost:5173",
      },
    });
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
  
  socketIO.on("connection", (socket: Socket) => {

    // logger.info(`${user} connected`);
    // socketIO.emit("connection", { username: user });
    
    socket.on("get-near-tiles", () => getNearTilesEvent(socketIO));
    
    socket.on("disconnect", () => {
      // logger.info(`${user} disconnected`);
    });
  }); 
};

export default socketInit;
