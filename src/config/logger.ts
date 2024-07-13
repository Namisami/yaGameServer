import pino from "pino";


export default pino({
  // Logs below the env.LOG_LEVEL || INFO level will not be shown
  level: process.env.LOG_LEVEL || "info",
});
