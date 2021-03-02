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

USE employee_mgmt;

INSERT INTO role(role_title, role_salary, dept_id)
VALUES ('Housekeeping Manager', '43000.00', '1');