// src/errors/ValidationError.js
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
        this.statusCode = 400; // Código de estado HTTP para "Bad Request"
    }
}

module.exports = ValidationError;