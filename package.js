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
          "Update Employee Roles"
        ],
      },
    ])
    .then(function (answer) {
      if (answer.AddViewOrUpdate === "View All Departments") {
        displayCurrentDept();
      } 
      else if (answer.AddViewOrUpdate === "View All Roles") {
        viewRoles();
      } 
      // else if (answer.AddViewOrUpdate === "View an employee") {
      //   viewEmployee();
      // } else if (answer.AddViewOrUpdate === "Add a department") {
      //   addDepartment();
      // } else if (answer.AddViewOrUpdate === "Add a role") {
      //   addRole();
      // } else if (answer.AddViewOrUpdate === "Add an employee") {
      //   addEmployee();
      // } else if (answer.AddViewOrUpdate === "Update employee roles") {
      //   updateEmployeeRole();
      // } 
      else {
        // otherwise end prompt
        connection.end();
      };
    });
};

// display the department table from employee_mgmt
function displayCurrentDept() {
   connection.query('SELECT * FROM department', function(err, res) {
    if (err) throw err;
    console.table(res);
    console.log('-----------------------------------------------------------');
  });
};
//end of display dept table

//start of view role table from employee_mgmt
function viewRoles() {
  connection.query('SELECT * from role', function(err, res) {
    if (err) throw err;
    console.table(res);
    console.log('-----------------------------------------------------------');
  });
};
//end of view role table
