"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRecharge = createRecharge;
exports.getRechargesByNumber = getRechargesByNumber;
const phones_repository_1 = __importDefault(require("../repositories/phones.repository"));
const recharges_repository_1 = __importDefault(require("../repositories/recharges.repository"));
const NotFoundError_1 = __importDefault(require("../errors/NotFoundError"));
const UnprocessableEntityError_1 = __importDefault(require("../errors/UnprocessableEntityError"));
async function createRecharge(data) {
    const { phoneId, value } = data;
    const phone = await phones_repository_1.default.findById(phoneId);
    if (!phone) {
        throw new NotFoundError_1.default("Telefone não encontrado.");
    }
    if (value < 10 || value > 1000) {
        throw new UnprocessableEntityError_1.default("Valor da recarga deve ser entre R$10 e R$1000.");
    }
    const recharge = await recharges_repository_1.default.insertRecharge({ phoneId, value });
    return recharge;
}
async function getRechargesByNumber(number) {
    const phone = await phones_repository_1.default.findByNumber(number);
    if (!phone) {
        throw new NotFoundError_1.default("Telefone não encontrado.");
    }
    return recharges_repository_1.default.findByPhoneId(phone.id);
}
const rechargesService = {
    createRecharge,
    getRechargesByNumber
};
exports.default = rechargesService;
