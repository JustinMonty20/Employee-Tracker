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



