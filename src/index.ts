// IT MUST BE ON THE TOP OF THE ENTRY FILE
import "module-alias/register";
import * as dotenv from "dotenv";
dotenv.config();

import * as http from "http";
import { Server, Socket } from "socket.io";

import getPlayers from "@controllers/players/getPlayers";
import logger from "@config/logger";

// Get .env variables
const PORT = process.env.PORT || 8000;

// Realise http server
const app = http.createServer(async (req, res) => {
  switch (req.url) {
    case "/players":
      (async function() {
        const result = await getPlayers();
        res.end(result);
      })();
      break;
    default:
      res.end("Hello!");
  }
});

// Declare WS server
const socketIO = new Server(app, {
  cors: {
    // Origin is only for development
    origin: "http://localhost:5173",
  },
});

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

app.listen(PORT, () => {
  logger.info(`Server is running on: http://localhost:${PORT}`);
});


// Unexpected errors handling and logging
process.on("uncaughtException", (err) => {
  logger.fatal(err, "UncaughtException found");

  app.close(() => {
    process.exit(1);
  });

  setTimeout(() => {
    process.abort(); 
  }, 1000).unref();

  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  logger.fatal(err, "UnhandledRejection found");

  app.close(() => {
    process.exit(1);
  });

  setTimeout(() => {
    process.abort(); 
  }, 1000).unref();

  process.exit(1);
});
