use employee_tracker;

INSERT INTO department (name) VALUES ("Engineering"), ("HR"), ("Legal"), ("Sales"), ("Marketing");

INSERT INTO emp_role (title, salary, department_id) VALUES ("Sr Engineer", 100000, 1), ("HR expert", 70000,2), ("Business Lawyer", 150000, 3), ("Lead Sales", 50000, 4), ("Marketing Genius", 100000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Jeff", "Hoffman",1, null), ("Cheryl", "Kane", 2, null), ("Jeron", "Ware", 3, null), ("Max", "Rogers",4,null), ("Chessie","Domrongchai",5, null);