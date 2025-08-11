"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findById = findById;
const database_1 = __importDefault(require("../config/database"));
async function findById(id) {
    const result = await database_1.default.query(`
    SELECT * FROM carriers WHERE id = $1
  `, [id]);
    return result.rows[0] || null;
}
const carriersRepository = {
    findById
};
exports.default = carriersRepository;
