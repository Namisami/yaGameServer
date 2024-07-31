import { Client, ClientConfig } from "pg";
import dbConfig from "@config/dbConfig";
import logger from "@config/logger";


// Singleton class
export class Database {
  // #instance uses for Singleton implementation
  static #instance: Database;
  // #client uses for connection to Postgres
  #client: Client;
  
  private constructor(dbConfig: ClientConfig) {
    if (Database.#instance) throw new Error("Database instance already exists");
    this.#client = new Client(dbConfig);
    Database.#instance = this;
  }

  // Get singleton class instance method
  static getInstance(): Database {
    if (!Database.#instance) {
      Database.#instance = new Database(dbConfig);
    }
    return Database.#instance;
  }

  // Connect to Postgres method
  async connect() {
    try {
      await this.#client.connect();
      logger.info("Connected to PostgreSQL database");
    } catch(err) {
      logger.error(err, "Error connecting to PostgreSQL database");
    }
  }

  // Execute queries method
  async execute(sql: string) {
    try {
      const result = await this.#client.query(sql);
      return result;
    } catch(err) {
      logger.error(err, "Error when executing query");
    }
  }
}

const db = Database.getInstance();

export default db;
