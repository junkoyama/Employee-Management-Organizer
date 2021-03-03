DROP DATABASE IF EXISTS employee_mgmt;
CREATE DATABASE employee_mgmt;

USE employee_mgmt;

CREATE TABLE department(
	id INT AUTO_INCREMENT,
    dept_name VARCHAR(30) NOT NULL,
    PRIMARY KEY department(id)
);

CREATE TABLE role(
id INT AUTO_INCREMENT,
role_title VARCHAR(30) NOT NULL REFERENCES role(id),
role_salary DECIMAL(8,2) NOT NULL,
dept_id INT NOT NULL,
PRIMARY KEY role(id)
-- FOREIGN KEY (dept_id) REFERENCES department(id)
);

CREATE TABLE employee(
id INT AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT REFERENCES role(id),
-- manager_id INT,
PRIMARY KEY employee(id)
-- FOREIGN KEY (role_id) REFERENCES role(id),

-- FOREIGN KEY (manager_id) REFERENCES employee(role_id)
);

-- Note to self for later: commented out line 28 again as mysql would not run without it. Will look into further later.