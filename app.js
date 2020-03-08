const inquirer = require("inquirer");
const table = require("console.table");
const connection = require("./db/connection.js");
const question = require("./questions");

async function action() {
    response = await inquirer.prompt(question.startQ)

    switch(response.action){
        case "add department":
        addDepartment();
        break;

        case "add roles":
        addRoles();
        break;

        case  "add employees":
        addEmployees();
        break;

        case "view all departments":
        viewAllDepartments();
        break;

        case "view all roles":
        viewAllRoles();
        break;

        case "view all employees":
        viewAllEmployees();
        break;

        case "update employee roles":
        updateEmpRoles();
        break;
    }
}

viewAllEmployees = () => {
    let join = "SELECT employee.id, employee.first_name, employee.last_name, emp_role.title, department.name AS department, emp_role.salary FROM employee LEFT JOIN emp_role ON employee.role_id = emp_role.id LEFT JOIN department on emp_role.department_id = department.id"
    connection.query( join, (err, res) => {
        if (err) throw err
        console.log("Getting all employees")
        console.table(res)
    })
};



action();