const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: process.env.PORT || 3306,
  user: "root",
  password: "",
  database: "employee_mgmt",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Welcome!");

  start();
});

function start() {
  inquirer
    .prompt([
      {
        name: "AddViewOrUpdate",
        type: "list",
        message: "Please select what you would like to do",
        choices: [
          "Add a department",
          "Add a role",
          "Add an employee",
          "View a department",
          "View a role",
          "View an employee",
          "Update employee roles",
        ],
      },
    ])
    .then(function (answer) {
      if (answer.AddViewOrUpdate === "Add a department") {
        addDepartment();
      } else if (answer.AddViewOrUpdate === "Add a role") {
        addRole();
      } else if (answer.AddViewOrUpdate === "Add an employee") {
        addEmployee();
      } else if (answer.AddViewOrUpdate === "View a department") {
        viewDepartment();
      } else if (answer.AddViewOrUpdate === "View a role") {
        viewRole();
      } else if (answer.AddViewOrUpdate === "View an employee") {
        viewEmployee();
      } else if (answer.AddViewOrUpdate === "Update employee roles") {
        updateEmployeeRole();
      } else {
        // otherwise end prompt
        connection.end();
      }
    });
}
