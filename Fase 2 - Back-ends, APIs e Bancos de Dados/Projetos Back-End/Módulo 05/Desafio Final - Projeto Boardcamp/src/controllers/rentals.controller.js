import * as rentalsService from "../services/rentals.service.js";

export async function getAllRentals(req, res, next) {
  try {
    const rentals = await rentalsService.getAllRentals();
    res.status(200).send(rentals);
  } catch (err) {
    next(err);
  }
}

export async function createRental(req, res, next) {
  try {
    await rentalsService.createRental(req.body);
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

export async function returnRental(req, res, next) {
  try {
    await rentalsService.returnRental(+req.params.id);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}

export async function deleteRental(req, res, next) {
  try {
    await rentalsService.deleteRental(+req.params.id);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}
