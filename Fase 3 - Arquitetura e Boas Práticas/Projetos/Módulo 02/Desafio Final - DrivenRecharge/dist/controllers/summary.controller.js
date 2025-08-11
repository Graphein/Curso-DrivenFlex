"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSummary = getSummary;
const summary_service_1 = __importDefault(require("../services/summary.service"));
async function getSummary(req, res, next) {
    try {
        const { document } = req.params;
        const result = await summary_service_1.default.getSummary(document);
        res.send(result);
    }
    catch (err) {
        next(err);
    }
}
const summaryController = {
    getSummary
};
exports.default = summaryController;
