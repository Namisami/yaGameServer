import db from "@database/connect";
import { playersInit } from "@database/queries/playersInit";
import logger from "@config/logger";


logger.info("Running DB initialization");
db.init([
  playersInit
]);

export default db;
