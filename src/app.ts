import * as http from "http";

import socketInit from "@/socket";
import logger from "@config/logger";
import { Database } from "@database/database";
import dbInit from "@database/init";
import Router from "@routers/router";

// Get .env variables
const PORT = process.env.PORT || 8000;

class App {
  #server: http.Server;
  #db: Database;
  #router: Router | undefined;

  // Initialize parts of the app
  private async init() {
    // Initialize http server
    this.serverInit();

    // Initialize socket.io
    socketInit(this.#server);

    // Initialize DB
    this.#db = await dbInit();
  }

  // Initialize http server
  private serverInit() {
    const server = http.createServer(async (req, res) => {
      if (!this.#router) return res.end("No routes");
      const route = this.#router.findRoute(req.url);

      // !!! Make 404 Handling
      if (!route) return res.end("No such route");
      // const { data } = route.cb();
      const data = await route.cb();
      res.setHeader("Content-Type", "application/json");
      res.end(data);
    });
    this.#server = server;
    logger.info("Server created");
  }

  // Implement router to the app
  useRouter(router: Router) {
    this.#router = router;
  }

  // Start server
  async run() {
    await this.init();
    this.#server.listen(PORT, () => {
      logger.info(`Server is running on: http://localhost:${PORT}`);
    });
  }
}

function createApp() {
  return new App();
}

export default createApp;
