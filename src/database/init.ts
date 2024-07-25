import db from "@database/database";
import { playersInit } from "@/models/players";

// Initialize database
const dbInit = async () => {
  // await db.init([
  //   playersInit
  // ]);
  await db.initm();
  return db;
};

export default dbInit;
