import logger from "../../config/logger";
// !! Make better log for PRIMARY/UNIQUE/NOT NULL
// !! Add CHECK
// !! Add DBField type logic

export class DBField {
  // Basement fields
  name;
  #type;
  
  // Constraint fields
  #nullable = true;
  #unique = false;
  #primaryKey = false;
  #foreignKey = {
    table: "",
    field: "",
  };
  
  constructor(
    name: string,
    type: string,
  ) {
    this.name = name;
    this.#type = type;
  }

  check(...statements: string[]) {
    logger.info(statements);
    return this;
  }
  
  notNull() {
    if (this.#primaryKey) {
      logger.warn(`DB[${this.name}]PRIMARY field is already NOT NULL`);
      return this;
    }
    this.#nullable = false;
    return this;
  }
  
  unique() {
    if (this.#primaryKey) {
      logger.warn(`DB[${this.name}]PRIMARY field is already UNIQUE`);
      return this;
    }
    this.#unique = true;
    return this;
  }

  primaryKey() {
    this.#primaryKey = true;

    if (this.#unique) {
      logger.warn(`DB[${this.name}]PRIMARY field is already UNIQUE`);
      this.#unique = false;
    }
    if (!this.#nullable) {
      logger.warn(`DB[${this.name}]PRIMARY field is already NOT NULL`);  
      this.#nullable = true;
    }

    return this;
  }

  foreignKey(table: string, field: string) {
    this.#foreignKey = {
      table,
      field
    }
    return this;
  }

  private get contraintsSQL() {
    const contraints = [
      this.#nullable ? "" : "NOT NULL",
      this.#unique ? "UNIQUE" : "",
      this.#primaryKey ? "PRIMARY KEY" : "",
      this.#foreignKey.table ? `REFERENCES ${this.#foreignKey.table} (${this.#foreignKey.field})` : "",
    ].filter((constraint) => constraint);
    return `${contraints.join(" ")}`
  }

  get sql() {
    return `\n\t${this.name} ${this.#type} ${this.contraintsSQL},`;
  }
}


export class DBTable {
  name;
  #fields: DBField[] = [];

  constructor(name: string) {
    this.name = name;
  }

  field(field: DBField) {
    this.#fields.push(field);
    return this;
  }

  get sql() {
    let sql = `CREATE TABLE IF NOT EXISTS ${this.name} (`;
    this.#fields.forEach((field) => sql += field.sql);
    sql = sql.slice(0, sql.length - 1) + "\n);";
    return "";
  }
}
