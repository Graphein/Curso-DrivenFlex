"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const connection = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.MODE === "PROD" ? { rejectUnauthorized: false } : false,
});
exports.default = connection;
