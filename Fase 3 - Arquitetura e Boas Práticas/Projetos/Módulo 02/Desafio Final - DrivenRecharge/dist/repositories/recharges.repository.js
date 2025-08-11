"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertRecharge = insertRecharge;
exports.findByPhoneId = findByPhoneId;
const database_1 = __importDefault(require("../config/database"));
async function insertRecharge(data) {
    const result = await database_1.default.query(`
    INSERT INTO recharges (phone_id, value)
    VALUES ($1, $2)
    RETURNING *;
    `, [data.phoneId, data.value]);
    return result.rows[0];
}
async function findByPhoneId(phoneId) {
    const result = await database_1.default.query(`
    SELECT * FROM recharges
    WHERE phone_id = $1
    ORDER BY timestamp DESC;
    `, [phoneId]);
    return result.rows;
}
const rechargesRepository = {
    insertRecharge,
    findByPhoneId
};
exports.default = rechargesRepository;
