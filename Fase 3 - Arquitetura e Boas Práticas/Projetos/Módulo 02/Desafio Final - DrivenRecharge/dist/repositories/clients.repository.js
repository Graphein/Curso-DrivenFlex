"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByDocument = findByDocument;
exports.insertClient = insertClient;
const database_1 = __importDefault(require("../config/database"));
async function findByDocument(document) {
    const result = await database_1.default.query(`SELECT * FROM clients WHERE document = $1`, [document]);
    return result.rows[0] || null;
}
async function insertClient(data) {
    const result = await database_1.default.query(`
    INSERT INTO clients (name, document)
    VALUES ($1, $2)
    RETURNING *;
    `, [data.name, data.document]);
    return result.rows[0];
}
const clientsRepository = {
    findByDocument,
    insertClient
};
exports.default = clientsRepository;
