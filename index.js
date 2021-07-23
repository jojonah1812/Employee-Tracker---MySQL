const inquirer = require("inquirer");
const mysql = require("mysql");
require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employee_DB",
});

const employeeOpt = () => {
  inquirer
    .prompt({
      name: "listoption",
      type: "list",
      choices: [
        "add department",
        "add role",
        "add employee",
        "view departments",
        "view roles",
        "view employees",
        "exit",
      ],
    })

    .then((answer) => {
      switch (answer.listoption) {
        case "add department":
          return addDept();
        case "add role":
          return addRole();
        case "add employee":
          return addEmp();
        case "view departments":
          return viewDepts();
        case "view roles":
          return viewRoles();
        case "view employees":
          return viewEmps();
        case "exit":
          return exit();
      }
    });
};

//will prompt question, the answer make a connection query and insert it into db
const addDept = () => {
  inquirer
    .prompt({
      name: "newDept",
      type: "input",
      message: "Enter a new department",
    })
    .then((answer) => {
      connection.query(
        "INSERT INTO departments SET ?",
        {
          name: answer.newDept,
        },
        (err) => {
          if (err) throw err;
          console.log("Your department has been created!");
          employeeOpt();
        }
      );
    });
};
////////////////////////////////////////////////////////














///////////////////////////;

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  connection.end();
});