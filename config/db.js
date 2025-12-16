import pkg from "pg";
import { Client } from "pg";

const db = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "Shiv@199",
  database: "demoDB"
});

db.connect()
  .then(() => console.log("Database Connected Successfully"))
  .catch(err => console.log("DB Connection Error:", err));

export default db;
