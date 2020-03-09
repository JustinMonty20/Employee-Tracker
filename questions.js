const startQ = {
    message: "What would you like to do?",
    type: "rawlist",
    name: "action",
    choices: [
        "add department",
        "add roles",
        "add employees",
        "view all departments",
        "view all roles",
        "view all employees",
        "update employee roles",
        "Quit"
    ]

}

const addDepartment = {
    message: "What is the name of the new department you adding?",
    type: "input",
    name: "newDepartment"
}



module.exports = {
    startQ: startQ,
    newDepartment: addDepartment,
    
}