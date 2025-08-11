"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRecharge = createRecharge;
exports.getRechargesByNumber = getRechargesByNumber;
const recharges_service_1 = __importDefault(require("../services/recharges.service"));
async function createRecharge(req, res, next) {
    try {
        const recharge = await recharges_service_1.default.createRecharge(req.body);
        res.status(201).send(recharge);
    }
    catch (err) {
        next(err);
    }
}
async function getRechargesByNumber(req, res, next) {
    try {
        const { number } = req.params;
        const recharges = await recharges_service_1.default.getRechargesByNumber(number);
        res.send(recharges);
    }
    catch (err) {
        next(err);
    }
}
const rechargesController = {
    createRecharge,
    getRechargesByNumber
};
exports.default = rechargesController;
