import { Client, ClientConfig } from "pg";
import dbConfig from "@config/dbConfig";
import * as fs from "fs/promises";
import * as path from "path";
import { ChildProcess, execFile } from "child_process"; 
import logger from "@config/logger";

const ROOT_PATH = path.resolve(process.env.ROOT_PATH || "src");
const MODELS_PATH = path.join(ROOT_PATH, "/", process.env.MODELS_PATH || "models");

export type InitializerFunction = () => Promise<void>;


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
  private async connect() {
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

  // Initialize models method
  async initm() {
    logger.info("Running DB initialization");
    await this.connect();
    try {
      const files = await fs.readdir(MODELS_PATH);
      
      const modelsInititalizers: (() => ChildProcess)[] = [];
      files.forEach((file) => {
        const filePath = path.join(MODELS_PATH, "/", file);
        modelsInititalizers.push(() => execFile(filePath));
      });
      execFile('D:\\ProgrammingPractice\\web\\node\\yaGameServer\\src\\models\\players.ts');
      // await Promise.all(modelsInititalizers);
      console.log(modelsInititalizers);
    } catch (err) {
      logger.error(err, "Error when inititalize models");
    }
    // await this.connect().then(() => {
    //   initializers.forEach(async (initializer) => await initializer());
    // });
    logger.info("DB initialization completed");
  }

  async init(initializers: InitializerFunction[]) {
    logger.info("Running DB initialization");
    await this.connect().then(() => {
      initializers.forEach(async (initializer) => await initializer());
    });
    logger.info("DB initialization completed");
  }
}

const db = Database.getInstance();

export default db;
