const startQ = {
    message: "What would you like to do?",
    type: "list",
    name: "action",
    choices: [
        "add department",
        "add roles",
        "add employees",
        "view all departments",
        "view all roles",
        "view all employees",
        "update employee roles"
    ]

}

module.exports = {
    startQ: startQ,
    
}