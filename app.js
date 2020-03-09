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

        case "Quit":
        connection.end();
        break;

    }
}

addRoles = () => {
    connection.query("SELECT * FROM department", (err, res) => {
        inquirer.prompt([{
            type: "input",
            message: "Enter the new role.",
            name: "newRole"
        }, {
            type: "input",
            name: "salary",
            message: "What is the new role's starting salary?"
        }, {
            type: "list",
            name: "departments",
            message: "Which department is this new role in?",
            choices: function () {
                var departmentArr = [];
                res.forEach(element => {
                    departmentArr.push(`${element.name}`);
                });

                return departmentArr;
            }
        
        }]).then((answer)=> {
            connection.query(
                "INSERT emp_role SET ?",
                {
                    title: answer.newRole,
                    salary: answer.salary,
                    department_id: answer.departments
                }
            )

        })
    }) 

}
   
addDepartment = () => {
    inquirer.prompt(question.newDepartment)
    .then((answer) => {
        connection.query(
            "INSERT INTO department SET name = ?", [answer.newDepartment], (err) => {
                if(err) throw err;
                console.log("Added a new department");
                // ask to do another action.
                action();
            }
        )
    })
}

viewAllEmployees = () => {
    let join = "SELECT employee.id, employee.first_name, employee.last_name, emp_role.title, department.name AS department, emp_role.salary FROM employee LEFT JOIN emp_role ON employee.role_id = emp_role.id LEFT JOIN department on emp_role.department_id = department.id"
    connection.query( join, (err, res) => {
        if (err) throw err
        console.log("Getting all employees")
        console.table(res)
    })
    action();
};

viewAllRoles = () => {
connection.query("SELECT * FROM emp_role", (err ,res) => {
    if (err) throw err
    console.log("Getting all roles..")
    console.table(res)
})
action();
}

action();