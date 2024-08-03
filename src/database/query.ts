import db from "./database";

class Query {
  async select(cols: "*" | string[], table: string) {
    let sql = "";
    if (cols === "*") {
      sql = `SELECT * FROM ${table}`;
    } else {
      sql = `SELECT ${cols.join(" ")} FROM ${table}`;
    }
    const res = await db.execute(sql);
    return res?.rows;
  }
}

const query = new Query;

export default query;
