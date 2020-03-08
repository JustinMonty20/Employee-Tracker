const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "ba5@96Jm",
    database: "employee_tracker"
});

connection.connect((err)=> {
    if (err) throw err
    console.log("connected")
});

module.exports = connection;