import clientsRepository from "../repositories/clients.repository";
import phonesRepository from "../repositories/phones.repository";
import rechargesRepository from "../repositories/recharges.repository";
import carriersRepository from "../repositories/carriers.repository";
import NotFoundError from "../errors/NotFoundError";
import type { Summary, PhoneSummary } from "../protocols/summary.protocol";

export async function getSummary(document: string): Promise<Summary> {
  const client = await clientsRepository.findByDocument(document);
  if (!client) {
    throw new NotFoundError("Cliente não encontrado.");
  }

  const phones = await phonesRepository.findPhonesByDocument(document);

  const phonesWithDetails: PhoneSummary[] = await Promise.all(
    phones.map(async (phone) => {
      const carrier = await carriersRepository.findById(phone.carrierId);
      const recharges = await rechargesRepository.findByPhoneId(phone.id);

      return {
        ...phone,
        carrier,
        recharges
      };
    })
  );

  return {
    document,
    phones: phonesWithDetails
  };
}
const summaryService = {
    getSummary
};
  
export default summaryService;