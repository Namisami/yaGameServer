import * as http from "http";
import { Server, Socket } from "socket.io";
import logger from "./config/logger";
import { DBTable, DBField } from "./database/models/baseModel";
import * as dotenv from "dotenv";

dotenv.config();

// Get .env variables
const PORT = process.env.PORT;

// Realise http server
const app = http.createServer((req, res) => {
  const table = new DBTable('players');
  table.field(new DBField('id', 'integer').primaryKey())
        .field(new DBField('hp', 'integer').notNull())
        .field(new DBField('username', 'char(50)').notNull());
  logger.info(table.sql);
  switch (req.url) {
    case "/players":
      res.end("Players");
      break;
    default:
      res.end("Hello!");
  }
});

// Declare WS server
const socketIO = new Server(app, {
  cors: {
    // Origin is only for development
    origin: "http://localhost:5173"
  }
});

const users = [];

socketIO.on("connection", (socket: Socket) => {
  const user = `User ${users.length}`
  users.push(user);
  console.log(`${user} connected`);
  socketIO.emit("connection", { username: user });
  socket.on("disconnect", () => {
    console.log(`${user} disconnected`);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
