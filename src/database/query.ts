import logger from "@config/logger";
import db from "@database/database";


type CreateValues = (string | number)[]

class Query {
  async select(cols: "*" | string[], table: string, conditions?: string[]) {
    let sql = "";
    
    let conditions_template = "";
    if (conditions) conditions_template = `WHERE ${conditions.join(" AND ")}`;

    if (cols === "*") {
      sql = `SELECT * FROM ${table} ${conditions_template}`;
    } else {
      sql = `SELECT ${cols.join(" ")} FROM ${table} ${conditions_template}`;
    }
    logger.info(sql);
    const res = await db.execute(sql);
    return res?.rows;
  }
  async select_one(cols: "*" | string[], table: string, conditions?: string[]) {
    const data = await this.select(cols, table, conditions);
    return data?.at(0);
  }
  async create(cols: "*" | string[], table: string, values: CreateValues) {
    let sql = "";
    const values_template = `(${values.join(", ")})`;
    if (cols === "*") {
      sql = `INSERT INTO ${table} VALUES ${values_template}`;
    } else {
      const cols_template = `(${cols.join(", ")})`;
      sql = `INSERT INTO ${table} ${cols_template} VALUES ${values_template}`;
    }
    const res = await db.execute(sql);
    return res?.rows;
  }
}

const query = new Query;

export default query;
