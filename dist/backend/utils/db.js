import mysql from 'mysql2/promise';
const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '12345',
    database: 'Milk_Shop',
});
export async function getMembers() {
    const [result] = await pool.query('SELECT * FROM member');
    return result;
}
export async function getMember(id) {
    const [result] = await pool.query('SELECT * FROM member WHERE UserID=?', [id]);
    return result;
}
export async function isUidExisted(id) {
    const [result] = await pool.query('SELECT * FROM member WHERE UserID=?', [id]);
    return result.length > 0;
}
export async function getMemberX(id, pass) {
    const [result] = await pool.query('SELECT * FROM member WHERE UserID=? AND Password=?', [id, pass]);
    return result;
}
export async function createMember(userData) {
    const { id, pass, name, email, phone, address } = userData;
    await pool.query(`INSERT INTO member (UserID, Password, Name, RewardPoints, Email, Phone, Address) 
                    VALUES (?, ?, ?, 0, ?, ?, ?)`, [id, pass, name, email, phone, address]);
    const [newUser] = await pool.query('SELECT * FROM member WHERE UserID=?', [id]);
    return newUser;
}
