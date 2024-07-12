import * as http from "http";
import { Server, Socket } from "socket.io";
import * as dotenv from "dotenv";

dotenv.config();

// Get .env variables
const PORT = process.env.PORT;

// Realise http server
const app = http.createServer((req, res) => {
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
