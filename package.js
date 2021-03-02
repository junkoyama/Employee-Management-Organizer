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
          "View a department",
          "View a role",
          "View an employee",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update employee roles"
        ],
      },
    ])
    .then(function (answer) {
      if (answer.AddViewOrUpdate === "View a department") {
        viewDepartment();
      } else if (answer.AddViewOrUpdate === "View a role") {
        viewRole();
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

function displayCurrentDept() {
   connection.query('SELECT * FROM department', function(err, res) {
    if (err) throw err;
    console.table(res);
    console.log('-----------------------------------------------------------')
  });
};

function addDepartment() {
  inquirer
  .prompt([
    {
      name: 'deptName',
      type: 'input',
      message: 'Enter the department name'
    }
  ])
  .then(function(answer) {
    connection.query(
      'INSERT INTO department SET ?',
      {
        dept_name: answer.deptName
      },
      function(err, res) {
        if (err) throw err;
        console.table(res)
      }
    );
  });
};

// function addRole() {
//   inquirer
//   .prompt([
//     {
//       name: 'title',
//       type:'input',
//       message: 'Enter the role title'
//     },
//     {
//       name: 'salary',
//       type: 'input',
//       message: 'Enter the employee salary'
//     },
//     {
//       name: 'deptId',
//       type: 'input',
//       message: 'Enter the department ID'
//     }
//   ])
//   .then(function(answer) {
//     connection.query(
//       'INSERT INTO role SET ?',
//       {
//         role_title: answer.title,
//         role_salary: answer.salary,
//         dept_id: answer.deptId
//       },
//       function(err) {
//         if (err) throw err;
//         console.log("Your role was added successfully.");
//         console.table(role);
//         start();
//       }
//     );
//   });
// };
