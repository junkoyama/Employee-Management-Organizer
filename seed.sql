DROP DATABASE IF EXISTS employee_mgmt;
CREATE DATABASE employee_mgmt;

USE employee_mgmt;

CREATE TABLE department(
	id INT NOT NULL AUTO_INCREMENT,
    dept_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
)