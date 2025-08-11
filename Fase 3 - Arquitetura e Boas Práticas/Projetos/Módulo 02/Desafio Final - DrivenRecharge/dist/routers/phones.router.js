"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const phones_controller_1 = __importDefault(require("../controllers/phones.controller"));
const validation_middleware_1 = require("../middlewares/validation.middleware");
const phone_schema_1 = require("../schemas/phone.schema");
const router = (0, express_1.Router)();
router.post("/", (0, validation_middleware_1.validateBody)(phone_schema_1.phoneSchema), phones_controller_1.default.createPhone);
router.get("/:document", phones_controller_1.default.getPhonesByDocument);
exports.default = router;
