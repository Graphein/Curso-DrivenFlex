import httpStatus from "http-status";

let items = [];
let nextId = 1;

export function createItem(req, res) {
  const { name, quantity, type } = req.body;

  // Validação de campos obrigatórios
  if (!name || !quantity || !type || typeof name !== "string" || typeof type !== "string" || !Number.isInteger(quantity)) {
    return res.sendStatus(httpStatus.UNPROCESSABLE_ENTITY); // 422
  }

  // Verificação de duplicidade (mesmo nome)
  const itemExists = items.find(item => item.name === name);
  if (itemExists) {
    return res.sendStatus(httpStatus.CONFLICT); // 409
  }

  const newItem = {
    id: nextId++,
    name,
    quantity,
    type
  };

  items.push(newItem);
  return res.status(httpStatus.CREATED).send(newItem); // 201
}

export function getAllItems(req, res) {
  const { type } = req.query;

  if (type) {
    const filtered = items.filter(item => item.type === type);
    return res.status(httpStatus.OK).send(filtered); // 200
  }

  return res.status(httpStatus.OK).send(items); // 200
}

export function getItemById(req, res) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.sendStatus(httpStatus.BAD_REQUEST); // 400
  }

  const item = items.find(item => item.id === id);
  if (!item) {
    return res.sendStatus(httpStatus.NOT_FOUND); // 404
  }

  return res.status(httpStatus.OK).send(item); // 200
}
