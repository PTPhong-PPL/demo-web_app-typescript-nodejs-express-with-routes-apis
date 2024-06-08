import { pool } from "../utils/db.js";
export class UserService {
    async getMemberLogin(id, pass) {
        const [result, field] = await pool.query('SELECT * FROM member WHERE UserID=? AND Password=?', [id, pass]);
        return result;
    }
    async getMemberById(id) {
        const [result, field] = await pool.query('SELECT * FROM member WHERE UserID=?', [id]);
        return result;
    }
}
