export class DatabaseDuplicateIDError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'DatabaseError';
    }
}
export class testerr extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'DatabaseError';
    }
}
