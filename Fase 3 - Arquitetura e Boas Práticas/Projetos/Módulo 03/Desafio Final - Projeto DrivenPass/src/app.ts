import "dotenv/config";
import express from "express";
import cors from "cors";
import router from "./routers";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.status(200).send("I'm OK!"));
app.use(router);
app.use(errorHandler);

export default app;