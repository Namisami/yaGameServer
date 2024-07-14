import * as http from "http";
import logger from "@config/logger";


const unhandledRejectionHandler = (server: http.Server) => {
  process.on("unhandledRejection", (err) => {
    logger.fatal(err, "UnhandledRejection found");
  
    server.close(() => {
      process.exit(1);
    });
  
    setTimeout(() => {
      process.abort(); 
    }, 1000).unref();
  
    process.exit(1);
  });
};

export default unhandledRejectionHandler;
