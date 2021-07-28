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
      name: "aTeam",
      type: "list",
      choices: [
        "Add Department",
        "add role",
        "add employee",
        "view departments",
        "view roles",
        "view employees",
        "exit",
      ],
    })

    .then((answer) => {
      switch (answer.aTeam) {
        case "Add Department":
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

const addDept = () => {
  inquirer
    .prompt({
      name: "addDept",
      type: "input",
      message: "Add a new department",
    })
    .then((answer) => {
      connection.query(
        "INSERT INTO departments SET ?",
        {
          name: answer.addDept,
        },
        (err) => {
          if (err) throw err;
          console.log("Your department was added!");
          employeeOpt();
        }
      );
    });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        name: "newRole",
        type: "input",
        message: "Add a new role.",
      },
      {
        name: "salary",
        type: "input",
        message: "Add salary for new role.",
      },
      {
        name: "deptid",
        type: "input",
        message: "Add a department ID to this role. ",
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO roles SET ?",
        {
          title: answer.newRole,
          salary: answer.salary,
          department_id: answer.deptid,
        },
        (err) => {
          if (err) throw err;
          console.log("The new role was added!");
          employeeOpt();
        }
      );
    });
};

const addEmp = () => {
  inquirer
    .prompt([
      {
        name: "firstname",
        type: "input",
        message: "Enter employee first name",
      },
      {
        name: "lastname",
        type: "input",
        message: "Enter employee last name",
      },
      {
        name: "role",
        type: "input",
        message: "What is the role id?",
      },
      {
        name: "manid",
        type: "input",
        message: " What is the manager id",
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO employees SET ?",
        {
          first_name: answer.firstname,
          last_name: answer.lastname,
          role_id: answer.role,
          manager_id: answer.manid,
        },
        (err) => {
          if (err) throw err;
          console.log("Employee added successfully!");
          employeeOpt();
        }
      );
    });
};

const viewDepts = () => {
  console.log("Pulling up department info...\n");
  connection.query("SELECT * FROM departments", (err, res) => {
    if (err) throw err;
    console.table(res);
    employeeOpt();
  });
};

const viewEmps = () => {
  console.log("Pulling up employees...\n");
  connection.query("SELECT * FROM employees", (err, res) => {
    if (err) throw err;
    console.table(res);
    employeeOpt();
  });
};

const viewRoles = () => {
  console.log("Pulling up roles...\n");
  connection.query("SELECT * FROM roles", (err, res) => {
    if (err) throw err;
    console.table(res);
    employeeOpt();
  });
};

const exit = () => {
  process.exit();
};

employeeOpt();

connection.connect((err) => {
  if (err) throw err;
  console.log(``);
});
