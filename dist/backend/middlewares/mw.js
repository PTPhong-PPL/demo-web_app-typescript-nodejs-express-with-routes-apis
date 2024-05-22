import { body, validationResult } from 'express-validator';
import { isUidExisted } from '../utils/db.js';
export function loggingmd(req, res, next) {
    console.log(`${req.method} - ${req.url}`);
    next();
}
// can be used to make sure json sent by people must not be null as well, or else database gonna throw error and crash the server.
export async function validateDBUidPhone(req, res, next) {
    await body('id')
        .exists().withMessage('ID is required!')
        .notEmpty().withMessage('ID can not be empty!')
        .custom(async (id) => {
        if (await isUidExisted(id)) {
            throw new Error();
        }
    }).withMessage((id) => { return `${id} is already existed!`; })
        .run(req);
    await body('phone')
        .exists().withMessage('Phone is required!')
        .notEmpty().withMessage('Phone can not be empty!')
        .run(req);
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.status(400).send({ error: result.array() });
    }
    else {
        next();
    }
}
;
