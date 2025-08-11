"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rechargeSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.rechargeSchema = joi_1.default.object({
    phoneId: joi_1.default.number().integer().positive().required(),
    value: joi_1.default.number().min(10).max(1000).required()
});
