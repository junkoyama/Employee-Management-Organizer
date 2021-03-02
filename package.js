const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: process.env.PORT || 3306,
  user: "root",
  password: "Nalabear1!",
  database: "employee_mgmt",
});

connection.connect(function (err) {
  if (err) throw err;
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
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "Update Employee Roles",
        ],
      },
    ])
    .then(function (answer) {
      if (answer.AddViewOrUpdate === "View All Departments") {
        displayCurrentDept();
      } else if (answer.AddViewOrUpdate === "View All Roles") {
        viewRoles();
      } else if (answer.AddViewOrUpdate === "View All Employees") {
        viewEmployees();
      } else if (answer.AddViewOrUpdate === "Add a Department") {
        addDepartment();
      } else if (answer.AddViewOrUpdate === "Add a Role") {
        addRole();
      } else if (answer.AddViewOrUpdate === "Add an Employee") {
        addEmployee();
      } else if (answer.AddViewOrUpdate === "Update Employee Roles") {
        updateEmployeeRole();
      } else {
        connection.end();
      }
    });
}

// display the department table from employee_mgmt
function displayCurrentDept() {
  console.log("Loading View Departments...\n")
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.table(res);
    console.log("-----------------------------------------------------------\n");

    start();
  });
}
// end of display dept table

// start of view role table from employee_mgmt
function viewRoles() {
  console.log("Loading View Roles...\n")
  connection.query("SELECT * from role", function (err, res) {
    if (err) throw err;
    console.table(res);
    console.log("-----------------------------------------------------------\n");

    start();
  });
}
// end of view role table

// start of view employees table from employee_mgmt
function viewEmployees() {
  console.log("Loading View Employees...\n");

  connection.query("SELECT * from employee", function (err, res) {
    if (err) throw err;
    console.table(res);
    console.log("-----------------------------------------------------------\n");

    start();
  });

}
// end of view employee table

// start of add department table from employee_mgmt
function addDepartment() {
  start();
};
// end of add department table
