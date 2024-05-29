import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '12345',
    database: 'Milk_Shop',
});

export async function getMembers() {
        const [result] = await pool.query('SELECT * FROM member');
        return result as any[];
}

export async function getMember(id:string) {
    const [result] = await pool.query('SELECT * FROM member WHERE UserID=?', [id]);
    return result as any[];
}
export async function isUidExisted(id:string) {
    const [result] = await pool.query('SELECT * FROM member WHERE UserID=?', [id]) as any[];
    return result.length > 0
}

export async function getMemberX(id:string, pass:string) {
    const [result] = await pool.query('SELECT * FROM member WHERE UserID=? AND Password=?', [id, pass]);
    return result;
}

export async function createMember(userData:any) {
    const {id, pass, name, email, phone, address} = userData;
  
    await pool.query(`INSERT INTO member (UserID, Password, Name, RewardPoints, Email, Phone, Address) 
                    VALUES (?, ?, ?, 0, ?, ?, ?)`, [id, pass, name, email, phone, address]);

    const [newUser] = await pool.query('SELECT * FROM member WHERE UserID=?', [id]);
    return newUser;
}

export async function getProducts(name: string) {
    const search = `%${name}%`;
    const [products] = await pool.query('SELECT * FROM product WHERE Name LIKE ?', [search]);
    return products;
}