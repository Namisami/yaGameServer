import * as http from "http";
import logger from "@config/logger";


const uncaughtExceptionHandler = (server: http.Server) => {
  process.on("uncaughtException", (err) => {
    logger.fatal(err, "UncaughtException found");
  
    server.close(() => {
      process.exit(1);
    });
  
    setTimeout(() => {
      process.abort(); 
    }, 1000).unref();
  
    process.exit(1);
  });
};

export default uncaughtExceptionHandler;
