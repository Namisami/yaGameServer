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

  // CHECK constraint method
  check(...statements: string[]) {
    logger.info(statements);
    return this;
  }
  
  // NOT NULL constraint method
  notNull() {
    if (this.#primaryKey) {
      logger.warn(`DB[${this.name}]PRIMARY field is already NOT NULL`);
      return this;
    }
    this.#nullable = false;
    return this;
  }
  
  // UNIQUE constraint method
  unique() {
    if (this.#primaryKey) {
      logger.warn(`DB[${this.name}]PRIMARY field is already UNIQUE`);
      return this;
    }
    this.#unique = true;
    return this;
  }
  
  // PRIMARY KEY constraint method
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
  
  // FOREIGN KEY constraint method
  foreignKey(table: string, field: string) {
    this.#foreignKey = {
      table,
      field
    }
    return this;
  }
  
  // Generate SQL code for constraints
  private get contraintsSQL() {
    const contraints = [
      this.#nullable ? "" : "NOT NULL",
      this.#unique ? "UNIQUE" : "",
      this.#primaryKey ? "PRIMARY KEY" : "",
      this.#foreignKey.table ? `REFERENCES ${this.#foreignKey.table} (${this.#foreignKey.field})` : "",
    ].filter((constraint) => constraint);
    return `${contraints.join(" ")}`
  }

  // Generate SQL code for the field
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

  // Add new fields
  field(field: DBField) {
    this.#fields.push(field);
    return this;
  }

  // Generate SQL code for the table
  get sql() {
    let sql = `CREATE TABLE IF NOT EXISTS ${this.name} (`;
    this.#fields.forEach((field) => sql += field.sql);
    sql = sql.slice(0, sql.length - 1) + "\n);";
    return "";
  }
}
