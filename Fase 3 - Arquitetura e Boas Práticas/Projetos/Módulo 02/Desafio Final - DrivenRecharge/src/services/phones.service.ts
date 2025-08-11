import phonesRepository from "../repositories/phones.repository";
import clientsRepository from "../repositories/clients.repository";
import ConflictError from "../errors/ConflictError";

export async function createPhone(data: {
  number: string;
  description: string;
  carrierId: number;
  name: string;
  document: string;
}) {
  const { number, description, carrierId, name, document } = data;

  const phoneCount = await phonesRepository.countPhonesByDocument(document);
  if (phoneCount >= 3) {
    throw new ConflictError("Limite de 3 telefones por cliente.");
  }

  const existingPhone = await phonesRepository.findByNumber(number);
  if (existingPhone) {
    throw new ConflictError("Número já cadastrado.");
  }

  let client = await clientsRepository.findByDocument(document);
  if (!client) {
    client = await clientsRepository.insertClient({ name, document });
  }

  const phone = await phonesRepository.insertPhone({
    number,
    description,
    carrierId,
    clientId: client.id
  });

  return phone;
}

export async function getPhonesByDocument(document: string) {
  return phonesRepository.findPhonesByDocument(document);
}
const phonesService = {
    createPhone,
    getPhonesByDocument
  };
export default phonesService;