
CREATE TABLE categoria (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE filme (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    duracao INTEGER NOT NULL,
    categoria_id INTEGER NOT NULL REFERENCES categoria(id)
);


CREATE TABLE ator (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
    pais VARCHAR(100) NOT NULL
);

CREATE TABLE filme_ator (
    filme_id INTEGER NOT NULL REFERENCES filme(id),
    ator_id INTEGER NOT NULL REFERENCES ator(id),
    PRIMARY KEY (filme_id, ator_id)
);


CREATE TABLE disco (
    id SERIAL PRIMARY KEY,
    registro VARCHAR(50) UNIQUE NOT NULL,
    codigo_barras VARCHAR(100) UNIQUE NOT NULL,
    filme_id INTEGER NOT NULL REFERENCES filme(id)
);

CREATE TABLE cliente (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(11) UNIQUE NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    rua VARCHAR(255) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    complemento VARCHAR(255),
    bairro VARCHAR(100) NOT NULL,
    cep VARCHAR(8) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    estado VARCHAR(2) NOT NULL
);

CREATE TABLE locacao (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER NOT NULL REFERENCES cliente(id),
    data_locacao DATE NOT NULL,
    data_prevista DATE NOT NULL,
    data_devolucao DATE,
    preco DECIMAL(10,2) NOT NULL,
    multa DECIMAL(10,2),
    nota_atendimento INTEGER CHECK (nota_atendimento BETWEEN 0 AND 10),
    nota_filme INTEGER CHECK (nota_filme BETWEEN 0 AND 10)
);

CREATE TABLE itens_locacao (
    locacao_id INTEGER NOT NULL REFERENCES locacao(id),
    disco_id INTEGER NOT NULL REFERENCES disco(id),
    PRIMARY KEY (locacao_id, disco_id)
);
