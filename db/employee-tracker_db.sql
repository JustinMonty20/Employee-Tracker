create database employee_tracker;
use employee_tracker;

create table department(
id int auto_increment,
name varchar(30),
primary key (id)
);

create table emp_role(
id int auto_increment,
title varchar(30),
salary decimal,
department_id int ,
primary key(id),
foreign key (department_id) references department(id)
);

create table employee(
id int auto_increment,
first_name varchar(30),
last_name varchar(30),
role_id int,
manager_id int,
primary key(id),
foreign key(role_id) references emp_role(id),
foreign key(manager_id) references emp_role(id)
);

