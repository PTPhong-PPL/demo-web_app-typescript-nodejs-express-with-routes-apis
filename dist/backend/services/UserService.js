import { pool } from "../utils/db.js";
export class UserService {
    async getMemberLogin(id, pass) {
        const [result] = await pool.query('SELECT * FROM member WHERE UserID=? AND Password=?', [id, pass]);
        return result;
    }
}
