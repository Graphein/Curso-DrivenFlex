import phonesRepository from "../repositories/phones.repository";
import rechargesRepository from "../repositories/recharges.repository";
import NotFoundError from "../errors/NotFoundError";
import UnprocessableEntityError from "../errors/UnprocessableEntityError";

export async function createRecharge(data: {
  phoneId: number;
  value: number;
}) {
  const { phoneId, value } = data;

  const phone = await phonesRepository.findById(phoneId);
  if (!phone) {
    throw new NotFoundError("Telefone não encontrado.");
  }

  if (value < 10 || value > 1000) {
    throw new UnprocessableEntityError("Valor da recarga deve ser entre R$10 e R$1000.");
  }

  const recharge = await rechargesRepository.insertRecharge({ phoneId, value });
  return recharge;
}

export async function getRechargesByNumber(number: string) {
  const phone = await phonesRepository.findByNumber(number);
  if (!phone) {
    throw new NotFoundError("Telefone não encontrado.");
  }

  return rechargesRepository.findByPhoneId(phone.id);
}
const rechargesService = {
    createRecharge,
    getRechargesByNumber
};
export default rechargesService;
