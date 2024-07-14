import db from "@database/connect";
import { playersInit } from "@database/queries/playersInit";

// Initialize database
const dbInit = async () => {
  await db.init([
    playersInit
  ]);
  return db;
};

export default dbInit;
