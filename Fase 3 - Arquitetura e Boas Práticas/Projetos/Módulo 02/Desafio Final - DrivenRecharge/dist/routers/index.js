"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const phones_router_1 = __importDefault(require("./phones.router"));
const recharges_router_1 = __importDefault(require("./recharges.router"));
const summary_router_1 = __importDefault(require("./summary.router"));
const router = (0, express_1.Router)();
router.use("/phones", phones_router_1.default);
router.use("/recharges", recharges_router_1.default);
router.use("/summary", summary_router_1.default);
exports.default = router;
