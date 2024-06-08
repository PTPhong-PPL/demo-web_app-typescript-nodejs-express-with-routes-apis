import { FieldPacket, QueryResult, RowDataPacket } from "mysql2";
import { pool } from "../utils/db.js"

export class UserService {

    async getMemberLogin(id:string, pass:string) {
        const [result, field]: [RowDataPacket[], FieldPacket[]] = await pool.query('SELECT * FROM member WHERE UserID=? AND Password=?', [id, pass]);
        return result;
    }

    async getMemberById(id: string) {
        const [result, field]: [RowDataPacket[], FieldPacket[]] = await pool.query('SELECT * FROM member WHERE UserID=?', [id]);
        return result;
    }
}