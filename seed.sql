--prepopulate database for users to have options to view in the tables from at the start
USE employee_mgmt;

INSERT INTO department(dept_name)
VALUES ('Housekeeping');
INSERT INTO department(dept_name)
VALUES ('Front Desk');
INSERT INTO department(dept_name)
VALUES ('Catering and Events');
INSERT INTO department(dept_name)
VALUES ('Engineering');
INSERT INTO department(dept_name)
VALUES ('Security');

INSERT INTO role(role_title, role_salary, dept_id)
VALUES ('Housekeeping Manager', '43000.00', '1');
INSERT INTO role(role_title, role_salary, dept_id)
VALUES ('Front Desk Manager', '55000.00', '2');
INSERT INTO role(role_title, role_salary, dept_id)
VALUES ('Director of Security', '70000.00', '5');
INSERT INTO role(role_title, role_salary, dept_id)
VALUES ('Bellman', '65000.00', '2');

INSERT INTO employee(first_name, last_name)
VALUES ('Junko', 'Yamazaki');
INSERT INTO employee(first_name, last_name)
VALUES ('Simon', 'Basset');
INSERT INTO employee(first_name, last_name)
VALUES ('Daphne', 'Bridgerton')

