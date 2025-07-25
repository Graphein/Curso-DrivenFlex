import * as customersService from "../services/customers.service.js";

export async function createCustomer(req, res, next) {
  try {
    await customersService.createCustomer(req.body);
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

export async function getAllCustomers(req, res, next) {
  try {
    const customers = await customersService.getAllCustomers();
    res.status(200).send(customers);
  } catch (err) {
    next(err);
  }
}

export async function getCustomerById(req, res, next) {
  try {
    const customer = await customersService.getCustomerById(+req.params.id);
    res.status(200).send(customer);
  } catch (err) {
    next(err);
  }
}

export async function updateCustomer(req, res, next) {
  const { id } = req.params;
  try {
    await customersService.updateCustomer(+id, req.body);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}