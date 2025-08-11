"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recharges_controller_1 = __importDefault(require("../controllers/recharges.controller"));
const validation_middleware_1 = require("../middlewares/validation.middleware");
const recharge_schema_1 = require("../schemas/recharge.schema");
const router = (0, express_1.Router)();
router.post("/", (0, validation_middleware_1.validateBody)(recharge_schema_1.rechargeSchema), recharges_controller_1.default.createRecharge);
router.get("/:number", recharges_controller_1.default.getRechargesByNumber);
exports.default = router;
