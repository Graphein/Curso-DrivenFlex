"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.phoneSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.phoneSchema = joi_1.default.object({
    number: joi_1.default.string().length(11).required(),
    name: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    carrierId: joi_1.default.number().required(),
    document: joi_1.default.string().length(11).required()
});
