
CREATE TABLE carriers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  code INT NOT NULL
);

INSERT INTO carriers (name, code) VALUES ('Vivo', 15);
INSERT INTO carriers (name, code) VALUES ('Tim', 41);
INSERT INTO carriers (name, code) VALUES ('Oi', 31);
INSERT INTO carriers (name, code) VALUES ('Claro', 21);

CREATE TABLE clients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  document VARCHAR(14) NOT NULL UNIQUE 
);

CREATE TABLE phones (
  id SERIAL PRIMARY KEY,
  number VARCHAR(11) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  client_id INT NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  carrier_id INT NOT NULL REFERENCES carriers(id) ON DELETE RESTRICT
);

CREATE TABLE recharges (
  id SERIAL PRIMARY KEY,
  phone_id INT NOT NULL REFERENCES phones(id) ON DELETE CASCADE,
  value NUMERIC(10, 2) NOT NULL CHECK (value >= 10 AND value <= 1000),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
