"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const error_middleware_1 = require("./middlewares/error.middleware");
const index_1 = __importDefault(require("./routers/index"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && "body" in err) {
        return res.status(400).send({ message: "JSON malformado." });
    }
    next(err);
});
app.get("/health", (req, res) => {
    res.status(200).send("I'm OK!");
});
app.use(index_1.default);
app.use(error_middleware_1.handleErrors);
exports.default = app;
