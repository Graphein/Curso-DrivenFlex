"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPhone = createPhone;
exports.getPhonesByDocument = getPhonesByDocument;
const phones_repository_1 = __importDefault(require("../repositories/phones.repository"));
const clients_repository_1 = __importDefault(require("../repositories/clients.repository"));
const ConflictError_1 = __importDefault(require("../errors/ConflictError"));
async function createPhone(data) {
    const { number, description, carrierId, name, document } = data;
    const phoneCount = await phones_repository_1.default.countPhonesByDocument(document);
    if (phoneCount >= 3) {
        throw new ConflictError_1.default("Limite de 3 telefones por cliente.");
    }
    const existingPhone = await phones_repository_1.default.findByNumber(number);
    if (existingPhone) {
        throw new ConflictError_1.default("Número já cadastrado.");
    }
    let client = await clients_repository_1.default.findByDocument(document);
    if (!client) {
        client = await clients_repository_1.default.insertClient({ name, document });
    }
    const phone = await phones_repository_1.default.insertPhone({
        number,
        description,
        carrierId,
        clientId: client.id
    });
    return phone;
}
async function getPhonesByDocument(document) {
    return phones_repository_1.default.findPhonesByDocument(document);
}
const phonesService = {
    createPhone,
    getPhonesByDocument
};
exports.default = phonesService;
