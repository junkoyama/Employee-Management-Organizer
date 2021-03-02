DROP DATABASE IF EXISTS employee_mgmt;
CREATE DATABASE employee_mgmt;

USE employee_mgmt;

CREATE TABLE department(
	id INT NOT NULL AUTO_INCREMENT,
    dept_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role(
id INT NOT NULL AUTO_INCREMENT,
role_title VARCHAR(30) NOT NULL,
role_salary DECIMAL(8,2) NOT NULL,
dept_id INT NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE employee(
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
manager_id INT NULL,
PRIMARY KEY(id)
);