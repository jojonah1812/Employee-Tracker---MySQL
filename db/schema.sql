DROP DATABASE IF EXISTS employees-db;

CREATE DATABASE employees-db;

USE employees-db;

-- // Create Depts. table //
CREATE TABLE departments (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY(id)
); 

-- // Create Role table //
CREATE TABLE roles (
    id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),NOT NULL,
    salary DECIMAL (9,2)NOT NULL,
    department_id INTEGER(9)NOT NULL,
    PRIMARY KEY(id)
); 

-- // Create Employee table //
CREATE TABLE employees (
    id INTEGER NOT NULL AUTO_INCREMENT,
    first-name VARCHAR(30) NOT NULL,
    last-name VARCHAR(30) NOT NULL,
    role_id INTEGER(9) NOT NULL,
    manager_id INTEGER(9) NOT NULL,
    PRIMARY KEY(id)
); 


-- New Empoyees
INSERT INTO departments (name)
VALUES ("Marketing");

INSERT INTO roles (title, salary, department_id)
VALUES ("Peacekeeper", "48000", "1");

INSERT INTO employees (first-name, last-name, role_id, manager_id)
VALUES ("BA", "Baracus", "911", "2");