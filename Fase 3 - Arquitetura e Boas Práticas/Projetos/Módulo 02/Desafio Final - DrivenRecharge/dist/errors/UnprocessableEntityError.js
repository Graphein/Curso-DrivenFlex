"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UnprocessableEntityError extends Error {
    constructor(message) {
        super(message);
        this.name = "UnprocessableEntityError";
    }
}
exports.default = UnprocessableEntityError;
