export class DatabaseDuplicateIDError extends Error {
    constructor(message, statusCode = 500) {
        super();
        this.message = 'DatabaseError: Duplicated User ID!';
        this.statusCode = statusCode;
        this.name = 'DatabaseError';
    }
}
