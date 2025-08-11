import express, { json } from "express";

import { handleApplicationErrors } from "./middlewares/error-middleware";
import postsRouter from "./routers/post-router";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(json());

app.use(postsRouter);
app.use(handleApplicationErrors);

const port = Number(process.env.PORT) || 5000;
app.listen(port, () => console.log(`Server is up and running on port ${port}`));