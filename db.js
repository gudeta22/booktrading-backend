
import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

export const db = mysql.createConnection({
  user: "root",
  host: 'localhost',
  database: 'books',
  password: ""
});
