import * as customersRepository from "../repositories/customers.repository.js";
import ConflictError from "../errors/ConflictError.js";
import NotFoundError from "../errors/NotFoundError.js";
import BadRequestError from "../errors/BadRequestError.js";

export async function createCustomer(data) {
  const { cpf } = data;
  const existing = await customersRepository.findByCpf(cpf);
  if (existing.rowCount > 0) throw new ConflictError("CPF já Existe");

  await customersRepository.insert(data);
}

export async function getAllCustomers() {
  const { rows } = await customersRepository.findAll();
  return rows;
}

export async function getCustomerById(id) {
  
  if (!Number.isInteger(id) || id <= 0) { throw new BadRequestError("ID inválido");}
  const { rows } = await customersRepository.findById(id);
  if (rows.length === 0) throw new NotFoundError("Cliente não encontrado");

  return rows[0];
}

export async function updateCustomer(id, data) {
  
  if (!Number.isInteger(id) || id <= 0) { throw new BadRequestError("ID inválido");}
  const customerExists = await customersRepository.findById(id);
  if (customerExists.rowCount === 0) throw new NotFoundError("Cliente não encontrado");

  const cpfExists = await customersRepository.findByCpf(data.cpf);
  if (cpfExists.rowCount > 0 && cpfExists.rows[0].id !== id) {
    throw new ConflictError("CPF já cadastrado para outro cliente");
  }

  await customersRepository.update(id, data);
}
