import { QueryResult } from "mysql2";
import { pool } from "../utils/db.js"

export class UserService {

    async getMemberLogin(id:string, pass:string) {
        const [result] = await pool.query('SELECT * FROM member WHERE UserID=? AND Password=?', [id, pass]);
        return result as QueryResult[];
    }
}