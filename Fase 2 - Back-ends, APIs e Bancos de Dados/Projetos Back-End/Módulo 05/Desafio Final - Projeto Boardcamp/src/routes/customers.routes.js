import { Router } from "express";
import * as customersController from "../controllers/customers.controller.js";
import validateSchema from "../middlewares/validateSchema.js";
import { customerSchema } from "../schemas/customers.schema.js";

const router = Router();


router.post("/customers", validateSchema(customerSchema), customersController.createCustomer);
router.put("/customers/:id", validateSchema(customerSchema), customersController.updateCustomer);
router.get("/customers", customersController.getAllCustomers);
router.get("/customers/:id", customersController.getCustomerById);

export default router;
