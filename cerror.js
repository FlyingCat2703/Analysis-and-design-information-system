class ExError extends Error {
    constructor(statusCode, message, desc = '') {
        super(message);
        this.statusCode = statusCode;
        this.desc = desc;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ExError;