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


addRoles = () => {
    connection.query("SELECT * FROM department", (err, departments) => {
        if(err) throw err
        inquirer.prompt([{
            type: "input",
            message: "Enter the new role.",
            name: "newRole"
        }, {
            type: "input",
            name: "salary",
            message: "What is the new role's starting salary?"
        }, {
            type: "rawlist",
            name: "departments",
            message: "Which department is this new role in?",
            choices: function () {
                var departmentArr = [];
                departments.forEach(dep => {
                    departmentArr.push(`${dep.name}`);
                });

                return departmentArr;
            }
        
        }]).then((answer)=> {
            for(i= 0; i < departments.length; i++) {
                if(departments[i].name === answer.departments) {
                    answer.department_id = departments[i].id
                }
            }
            connection.query(
                "INSERT emp_role SET ?",
                {
                    title: answer.newRole,
                    salary: answer.salary,
                    department_id: answer.department_id
                }
            )

        })
    }) 
    action();
}
   addEmployees = () => {

   }

   viewAllDepartments = () => {
    connection.query("SELECT * FROM department", (err, res) => {
        if (err) throw err
        console.table(res)
    })
    action();
   }

viewAllRoles = () => {
    connection.query("SELECT * FROM emp_role", (err ,res) => {
        if (err) throw err
        console.log("Getting all roles..")
        console.table(res)
    })
    action();
    }

viewAllEmployees = () => {
    let join = "SELECT employee.id, employee.first_name, employee.last_name, emp_role.title, department.name AS department, emp_role.salary FROM employee LEFT JOIN emp_role ON employee.role_id = emp_role.id LEFT JOIN department on emp_role.department_id = department.id"
    connection.query( join, (err, res) => {
        if (err) throw err
        console.log("Getting all employees")
        console.table(res);
    })
    action();
};

updateEmpRoles = () => {

}


action();