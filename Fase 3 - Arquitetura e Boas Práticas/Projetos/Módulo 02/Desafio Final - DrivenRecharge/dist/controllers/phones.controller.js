"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPhone = createPhone;
exports.getPhonesByDocument = getPhonesByDocument;
const phones_service_1 = __importDefault(require("../services/phones.service"));
async function createPhone(req, res, next) {
    try {
        await phones_service_1.default.createPhone(req.body);
        res.sendStatus(201);
    }
    catch (err) {
        next(err);
    }
}
async function getPhonesByDocument(req, res, next) {
    try {
        const { document } = req.params;
        const phones = await phones_service_1.default.getPhonesByDocument(document);
        res.send(phones);
    }
    catch (err) {
        next(err);
    }
}
const phonesController = {
    createPhone,
    getPhonesByDocument
};
exports.default = phonesController;
