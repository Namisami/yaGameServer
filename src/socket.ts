import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";

import logger from "@config/logger";


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

  const users = [];
  
  socketIO.on("connection", (socket: Socket) => {
    const user = `User ${users.length}`;
    users.push(user);
    logger.info(`${user} connected`);
    socketIO.emit("connection", { username: user });
    socket.on("disconnect", () => {
      logger.info(`${user} disconnected`);
    });
  });
};

export default socketInit;
