CREATE DATABASE drivengram;

CREATE TABLE posts (
	id SERIAL PRIMARY KEY,
  description TEXT,
  image_url TEXT,
  user_id INTEGER,
  date_posted TIMESTAMP,
  active BOOLEAN
);

-- BÔNUS
INSERT INTO posts (description, image_url, user_id, date_posted, active) VALUES
	('Que dia bonito!', 'https://picsum.photos/400/400?a=1', 1, NOW(), true);
