// class User {
//   constructor(id, username, password) {
//     this.id = id;
//     this.username = username;
//     this.password = password;
//   }

//   static async findUserById(id, db) {
//     const user = await db.query(`SELECT * FROM users WHERE id = ${id}`);
//     return user.length > 0 ? new User(user[0].id, user[0].username, user[0].password) : null;
//   }

//   static async createUser(username, password, db) {
//     const [result] = await db.query(`INSERT INTO users (username, password) VALUES ('${username}', '${password}') RETURNING *`);
//     return new User(result.id, result.username, result.password);
//   }
// }
