-- Adicionar um novo cliente, 'Renato Caldeira Falcão', com cpf '46761645912' e 1 compra:

INSERT INTO clientes (nome, cpf) VALUES ('Renato Caldeira Falcão', '46761645912');

-- Atualizar o número de compras do cliente com CPF '48769275911' para 5:

UPDATE clientes SET numero_compras=5 WHERE cpf='48769275911';

-- Excluir o cliente com cpf '98765432100':

DELETE FROM clientes WHERE cpf='98765432100';

-- Busque clientes quaisquer, limitados a no máximo 3 registros:

SELECT * FROM clientes LIMIT 3;