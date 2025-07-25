import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import gamesRouter from "./routes/games.routes.js";
import customersRouter from "./routes/customers.routes.js";
import rentalsRouter from "./routes/rentals.routes.js";
import { handleErrors } from "./middlewares/handleErrors.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(gamesRouter);
app.use(customersRouter);
app.use(rentalsRouter);

app.use(handleErrors);

app.listen(5000, () => console.log("Server running on port 5000"));
