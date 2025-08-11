"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSummary = getSummary;
const clients_repository_1 = __importDefault(require("../repositories/clients.repository"));
const phones_repository_1 = __importDefault(require("../repositories/phones.repository"));
const recharges_repository_1 = __importDefault(require("../repositories/recharges.repository"));
const carriers_repository_1 = __importDefault(require("../repositories/carriers.repository"));
const NotFoundError_1 = __importDefault(require("../errors/NotFoundError"));
async function getSummary(document) {
    const client = await clients_repository_1.default.findByDocument(document);
    if (!client) {
        throw new NotFoundError_1.default("Cliente não encontrado.");
    }
    const phones = await phones_repository_1.default.findPhonesByDocument(document);
    const phonesWithDetails = await Promise.all(phones.map(async (phone) => {
        const carrier = await carriers_repository_1.default.findById(phone.carrierId);
        const recharges = await recharges_repository_1.default.findByPhoneId(phone.id);
        return {
            ...phone,
            carrier,
            recharges
        };
    }));
    return {
        document,
        phones: phonesWithDetails
    };
}
const summaryService = {
    getSummary
};
exports.default = summaryService;
