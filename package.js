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
          "Update Employee Role",
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
      } else if (answer.AddViewOrUpdate === "Update Employee Role") {
        updateEmployee();
      } else {
        connection.end();
      }
    });
}

// display the department table from employee_mgmt
function displayCurrentDept() {
  console.log(
    "\n-----------------------------------------------------------" +
      "\nLoading View All Departments...\n" +
      "-----------------------------------------------------------\n"
  );
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.table(res);
    console.log(
      "\n-----------------------------------------------------------\n" +
        "Success! Here are all of the departments.\n" +
        "-----------------------------------------------------------\n"
    );

    start();
  });
}
// end of display dept table

// start of view role table from employee_mgmt
function viewRoles() {
  console.log(
    "\n-----------------------------------------------------------" +
      "\nLoading View All Roles...\n" +
      "-----------------------------------------------------------\n"
  );
  connection.query("SELECT * from role", function (err, res) {
    console.table(res);
    if (err) throw err;
    console.log(
      "\n-----------------------------------------------------------\n" +
        "Success! Here are all of the roles.\n" +
        "-----------------------------------------------------------\n"
    );

    start();
  });
}
// end of view role table

// start of view employees table from employee_mgmt
function viewEmployees() {
  console.log(
    "\n-----------------------------------------------------------" +
      "\nLoading View All Employees...\n" +
      "-----------------------------------------------------------\n"
  );

  connection.query("SELECT * from employee", function (err, res) {
    console.table(res);
    if (err) throw err;
    console.log(
      "\n-----------------------------------------------------------\n" +
        "Success! Here are all of the employees.\n" +
        "-----------------------------------------------------------\n"
    );

    start();
  });
}
// end of view employee table

// start of add department table from employee_mgmt
function addDepartment() {
  console.log(
    "-----------------------------------------------------------" +
      "\n You have selected to add a new department. \n" +
      "-----------------------------------------------------------"
  );

  inquirer
    .prompt([
      {
        name: "addNewDept",
        type: "input",
        message: "Enter department name",
      },
    ])
    .then(function (res) {
      connection.query(
        "INSERT INTO department SET ?",
        {
          dept_name: res.addNewDept,
        },
        function (err) {
          if (err) throw err;

          displayCurrentDept();

          // start();
        }
      );
    });
}
// end of add department table

// start of add role table from employee_mgmt
function addRole() {
  console.log(
    "-----------------------------------------------------------" +
      "\n You have selected to add a new role. \n" +
      "-----------------------------------------------------------"
  );

  inquirer
    .prompt([
      {
        name: "addNewRole",
        type: "input",
        message: "Enter role title",
      },
      {
        name: "addRoleSalary",
        type: "input",
        message: "Enter role salary",
      },
      {
        name: "askDeptId",
        type: "input",
        message: "Enter dept ID",
      },
    ])
    .then(function (res) {
      connection.query(
        "INSERT INTO role SET ?",
        {
          role_title: res.addNewRole,
          role_salary: res.addRoleSalary,
          dept_id: res.askDeptId,
        },
        function (err) {
          if (err) throw err;

          viewRoles();

          // start();
        }
      );
    });
};
// end of add role table

// start of add employee table from employee_mgmt
function addEmployee() {
  console.log(
    "-----------------------------------------------------------" +
      "\n You have selected to add a new employee. \n" +
      "-----------------------------------------------------------"
  );

  inquirer
    .prompt([
      {
        name: "addEmployeeFirstName",
        type: "input",
        message: "Enter employee first name"
      },
      {
        name: "addEmployeeLastName",
        type: "input",
        message: "Enter employee last name"
      },
      {
        name: "addEmployeeId",
        type: "input",
        message: "Enter employee ID"
      },
    ])
    .then(function (res) {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: res.addEmployeeFirstName,
          last_name: res.addEmployeeLastName,
          role_id: res.addEmployeeId,
        },
        function (err) {
          if (err) throw err;

          viewEmployees();

          // start();
        }
      );
    });
};
// end of add employee table

// start of add employee table from employee_mgmt
function updateEmployee() {
  console.log(
    "-----------------------------------------------------------" +
      "\n You have selected to update an employee. \n" +
      "-----------------------------------------------------------"
  );

  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: "choice",
          type: "list",
          message: "\nWhich employee would you like to update?\n",
          choices: function () {
            const choiceArray = [];
            for (let i = 0; i < res.length; i++) {
              choiceArray.push(res[i].first_name + " " + res[i].last_name);
            }
            return choiceArray;
          },
        },
        {
          name: "updateEmployeeRole",
          type: "input",
          message: "What is the updated role?\n",
        },
      ])
      .then(function (answer) {
        function getId() {
          for (let i = 0; i < res.length; i++) {
            const fullName = res[i].first_name + " " + res[i].last_name;
            if (answer.choice === fullName) {
              return res[i].id;
            }
          }
        }

        connection.query(
          "UPDATE employee SET ? WHERE ?",
          [
            {
              role_id: answer.updateEmployeeRole,
            },
            {
              id: getId(),
            },
          ],
          function (err, answer) {
            if (err) throw err;

            viewEmployees();
            start();
          }
        );
      });
  });
};
// end of add employee table

// Notes to self to add later:
// Find a way to enter askDeptId as empty field and be accepted
// Tried NOT NULL/NULL with no luck.
