import dayjs from "dayjs";
import * as rentalsRepository from "../repositories/rentals.repository.js";
import NotFoundError from "../errors/NotFoundError.js";
import ConflictError from "../errors/ConflictError.js";
import BadRequestError from "../errors/BadRequestError.js";
import UnprocessableEntityError from "../errors/UnprocessableEntityError.js";

export async function getAllRentals() {
  const result = await rentalsRepository.findAllRentals();

  return result.rows.map(rental => ({
    id: rental.id,
    customerId: rental.customerId,
    gameId: rental.gameId,
    rentDate: dayjs(rental.rentDate).format('YYYY-MM-DD'),
    daysRented: rental.daysRented,
    returnDate: rental.returnDate ? dayjs(rental.returnDate).format('YYYY-MM-DD') : null,
    originalPrice: rental.originalPrice,
    delayFee: rental.delayFee,
    customer: {
      id: rental.customerId,
      name: rental.customerName
    },
    game: {
      id: rental.gameId,
      name: rental.gameName
    }
  }));
}

export async function createRental({ customerId, gameId, daysRented }) {
  if (!customerId || !gameId || daysRented <= 0) {
    throw new BadRequestError("Campos inválidos");
  }

  const customerResult = await rentalsRepository.findCustomerById(customerId);
  if (customerResult.rowCount === 0) throw new NotFoundError("Cliente não encontrado");

  const gameResult = await rentalsRepository.findGameById(gameId);
  if (gameResult.rowCount === 0) throw new NotFoundError("Jogo não encontrado");

  const game = gameResult.rows[0];

  const openRentals = await rentalsRepository.countOpenRentalsByGameId(gameId);
  const openCount = Number(openRentals.rows[0].count);

  if (openCount >= game.stockTotal) {
    throw new ConflictError("Estoque insuficiente");
  }

  const rentDate = dayjs().format("YYYY-MM-DD");
  const originalPrice = daysRented * game.pricePerDay;

  await rentalsRepository.insertRental({
    customerId,
    gameId,
    rentDate,
    daysRented,
    returnDate: null,
    originalPrice,
    delayFee: null,
  });
}

export async function returnRental(id) {
  if (!Number.isInteger(id) || id <= 0) { throw new BadRequestError("ID inválido");}
  const result = await rentalsRepository.findRentalById(id);
  if (result.rowCount === 0) throw new NotFoundError("Aluguel não encontrado");

  const rental = result.rows[0];
  if (rental.returnDate) throw new UnprocessableEntityError("Aluguel já devolvido");

  const returnDate = dayjs();
  const rentDate = dayjs(rental.rentDate);
  const diffDays = returnDate.diff(rentDate, "day");

  const delayDays = diffDays - rental.daysRented;
  const delayFee = delayDays > 0 ? delayDays * rental.originalPrice / rental.daysRented : 0;

  await rentalsRepository.updateRentalReturn(id, returnDate.format("YYYY-MM-DD"), delayFee);
}

export async function deleteRental(id) {

  if (!Number.isInteger(id) || id <= 0) { throw new BadRequestError("ID inválido");}

  const result = await rentalsRepository.findRentalById(id);
  if (result.rowCount === 0) throw new NotFoundError("Aluguel não encontrado");

  const rental = result.rows[0];
  if (!rental.returnDate) throw new BadRequestError("Aluguel ainda não devolvido");

  await rentalsRepository.deleteRental(id);
}