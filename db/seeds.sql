INSERT INTO departments (name)
VALUES
('Engineering'), 
('Finance'), 
('Legal'),
('Sales');

INSERT INTO roles (title, salary, department_id)
VALUES
('Sales Lead', 100000, 4),
('Salesperson', 80000, 4),
('Lead Engineer', 150000, 1),
('Software Engineer', 120000, 1),
('Account Manager', 160000, 2),
('Accountant', 125000, 2),
('Legal Team Lead', 250000, 3),
('Lawyer', 190000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Michael', 'Kreczmer', 1, null),
('Bryce', 'Collins', 2, 1),
('Reese', 'Emersyn', 3, null),
('Monica', 'Bruno', 4, 3),
('Fred', 'Hugh', 5, 3),
('Yolanda', 'Deven', 6, 1),
('Sven', 'Deven-Kreczmer', 7, null),
('Pancho', 'Parrot', 8, 7);