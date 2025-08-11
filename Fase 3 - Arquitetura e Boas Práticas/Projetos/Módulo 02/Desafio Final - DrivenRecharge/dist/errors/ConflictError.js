"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConflictError extends Error {
    constructor(message) {
        super(message);
        this.name = "ConflictError";
    }
}
exports.default = ConflictError;
