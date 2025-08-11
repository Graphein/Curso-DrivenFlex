"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByNumber = findByNumber;
exports.findById = findById;
exports.countPhonesByDocument = countPhonesByDocument;
exports.insertPhone = insertPhone;
exports.findPhonesByDocument = findPhonesByDocument;
const database_1 = __importDefault(require("../config/database"));
async function findByNumber(number) {
    const result = await database_1.default.query(`SELECT * FROM phones WHERE number = $1`, [number]);
    return result.rows[0] || null;
}
async function findById(id) {
    const result = await database_1.default.query(`SELECT * FROM phones WHERE id = $1`, [id]);
    return result.rows[0] || null;
}
async function countPhonesByDocument(document) {
    const result = await database_1.default.query(`
    SELECT COUNT(p.*) FROM phones p
    JOIN clients c ON p.client_id = c.id
    WHERE c.document = $1
  `, [document]);
    return Number(result.rows[0].count);
}
async function insertPhone(data) {
    const result = await database_1.default.query(`
    INSERT INTO phones (number, description, carrier_id, client_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `, [data.number, data.description, data.carrierId, data.clientId]);
    return result.rows[0];
}
async function findPhonesByDocument(document) {
    const result = await database_1.default.query(`
    SELECT p.* FROM phones p
    JOIN clients c ON p.client_id = c.id
    WHERE c.document = $1
    `, [document]);
    return result.rows;
}
const phonesRepository = {
    findByNumber,
    findById,
    countPhonesByDocument,
    insertPhone,
    findPhonesByDocument
};
exports.default = phonesRepository;
