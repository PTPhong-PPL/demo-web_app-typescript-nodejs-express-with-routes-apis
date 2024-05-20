import { getMember } from '../utils/db.js';
import { DatabaseDuplicateIDError } from '../entities/errorType.js';
export function loggingmd(req, res, next) {
    console.log(`${req.method} - ${req.url}`);
    next();
}
// can be used to make sure json sent by people must not be null as well, or else database gonna throw error and crash the server.
// normal routes probably wont need these as frontend already made sure all data sent were valid.
export async function checkDuplicateUID(req, res, next) {
    try {
        const { id } = req.body;
        const result = await getMember(id);
        if (result.length > 0) {
            throw new DatabaseDuplicateIDError(`ID: ${id} has already existed!`, 409);
        }
        else {
            next();
        }
    }
    catch (err) {
        next(err);
    }
}
;
