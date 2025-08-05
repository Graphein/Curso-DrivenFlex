import express, { json } from "express";
import couponsRouter from "./routers/coupons-router";

const app = express();

app.use(json());
app.use(couponsRouter);

const port = Number(process.env.PORT) || 5000;
app.listen(port, () => {
  console.log(`Server is up and running on port 5000`);
})
