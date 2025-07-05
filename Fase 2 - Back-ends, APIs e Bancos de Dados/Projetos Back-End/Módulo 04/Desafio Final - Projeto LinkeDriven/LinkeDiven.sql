-- Questão 01
SELECT * FROM companies LIMIT 5;

-- Questão 02
SELECT * FROM companies WHERE name = 'Driven';

-- Questão 03
INSERT INTO companies (name, image_url)
VALUES ('Apple', 'http://dummyimage.com/200x100.png/000000/ffffff');

-- Questão 04
DELETE FROM companies WHERE name = 'Apple';

-- Questão 05
UPDATE companies SET name = 'Google' WHERE name = 'Gogle';

-- Questão 06
UPDATE jobs SET salary = 1500 WHERE id = 1;

-- Questão 07
INSERT INTO experiences (user_id, company_id, role_id, start_date, end_date)
VALUES (
  (SELECT id FROM users WHERE name = 'Kelly'),
  (SELECT id FROM companies WHERE name = 'Nubank'),
  (SELECT id FROM roles WHERE name = 'CTO'),
  CURRENT_DATE,
  NULL
);

-- Questão 08
DELETE FROM applicants
WHERE user_id = (SELECT id FROM users WHERE name = 'Kelly')
AND job_id = (
  SELECT j.id
  FROM jobs j
  JOIN companies c ON j.company_id = c.id
  JOIN roles r ON j.role_id = r.id
  WHERE c.name = 'Carrefour' AND r.name = 'Engenheiro de Software Pleno'
);

-- Questão 09
SELECT id, description, salary
FROM jobs
ORDER BY salary DESC
LIMIT 3;

-- Questão 10
SELECT j.id, c.name AS company_name, j.salary
FROM jobs j
JOIN companies c ON j.company_id = c.id
ORDER BY salary ASC
LIMIT 1;

-- Questão 11
SELECT u.id, u.name, c.name AS city
FROM users u
JOIN cities c ON u.city_id = c.id
WHERE c.name = 'Rio de Janeiro';

-- Questão 12
SELECT t.id, t.message, w.name AS writer, r.name AS recipient
FROM testimonials t
JOIN users w ON t.writer_id = w.id
JOIN users r ON t.recipient_id = r.id;

-- Questão 13
SELECT c.id, u.name, co.name AS course, s.name AS schools, e.end_date
FROM educations e
JOIN users u ON e.user_id = u.id
JOIN courses co ON e.course_id = co.id
JOIN schools s ON e.school_id = s.id
WHERE e.status = 'finished' AND e.user_id = 5;

-- Questão 14
SELECT u.id, u.name, r.name AS role, c.name AS company, e.start_date
FROM experiences e
JOIN users u ON e.user_id = u.id
JOIN companies c ON e.company_id = c.id
JOIN roles r ON e.role_id = r.id
WHERE e.user_id = 10 AND e.end_date IS NOT NULL;

-- Questão 15
SELECT s.id, s.name AS school, c.name AS course, cp.name AS company, r.name AS roles
FROM applicants a
JOIN jobs j ON a.job_id = j.id
JOIN companies cp ON j.company_id = cp.id
JOIN roles r ON j.role_id = r.id
JOIN users u ON a.user_id = u.id
JOIN educations e ON u.id = e.user_id
JOIN schools s ON e.school_id = s.id
JOIN courses c ON e.course_id = c.id
WHERE j.active = true AND r.name = 'Engenheiro de Software Pleno' AND cp.id = 1;

-- Questão 16
SELECT COUNT(*) AS current_experiences
FROM experiences
WHERE end_date IS NULL;

-- Questão 17
SELECT u.id, u.name, COUNT(e.id) AS educations
FROM users u
JOIN educations e ON u.id = e.user_id
GROUP BY u.id
ORDER BY educations DESC;

-- Questão 18
SELECT u.name AS writer, COUNT(t.id) AS testimonialCount
FROM testimonials t
JOIN users u ON t.writer_id = u.id
WHERE u.id = 9
GROUP BY u.name;

-- Questão 19
SELECT MAX(j.salary) AS maximum_salary, r.name AS role
FROM jobs j
JOIN roles r ON j.role_id = r.id
WHERE j.active = true
GROUP BY r.name
ORDER BY maximum_salary;

-- Questão 20
SELECT s.name AS school, c.name AS course, COUNT(*) AS student_count
FROM educations e
JOIN schools s ON e.school_id = s.id
JOIN courses c ON e.course_id = c.id
WHERE e.status = 'finished'
GROUP BY s.name, c.name
ORDER BY student_count DESC
LIMIT 3;
