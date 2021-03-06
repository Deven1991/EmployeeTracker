const inquirer = require("inquirer");
const consoleTable = require("console.table");
const db = require('./db/connection');
const { allowedNodeEnvironmentFlags, exit, listenerCount } = require('process');

const startTrack = () => {
    console.log("Welcome to Employee Tracker!");
    console.log("|==============================================|");
    console.log("|   ____                                       |");  
    console.log("|  |       _   _   _      __        __  __     |");   
    console.log("|  |---   | | | | |D)|   |  | |__| |_  |_      |");  
    console.log("|  |____  |  V  | |  |__ |__|   |  |__ |__     |");  
    console.log("|                                              |");  
    console.log("|  _______                                     |");  
    console.log("|     |     _    _    __        __   _         |");  
    console.log("|     |    |D)  (_)  |    |_/  |_   |D)        |");  
    console.log("|     |    | | |   | |__  | |  |__  | |        |");  
    console.log("|==============================================|");
    firstQuestion();
};

//List of questions user is presented with
const firstQuestion = () => {
    inquirer.prompt([
        {
            type: 'list',
            name:'startChoice',
            message: 'What would you like to do?',
            choices:[
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department',
                'View All Employees',
                'Exit'
            ]
        }
    ]).then((answer) => {
        switch (answer.startChoice) {
            case 'Update Employee Role':
                updateRole();
                break;
            case 'View All Roles':
                viewRoles();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'View All Departments':
                viewDepartments();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'Exit':
                exit();
        }
    })
};

//Function to update role
const updateRole = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'Which employee do you want to update?',
            choices: employeesArray,
            name: 'employeeUpdate'
        },
        {
            type: 'list',
            message: 'Which new role do you want to add for the employee?',
            choices: rolesArray,
            name: 'roleUpdate'
        }
    ]).then((answers) => {
        const query = `SELECT id FROM roles WHERE title = ?`;
        db.query(query, answers.roleUpdate, (err, result) => {
            if (err) {
                throw err;
            }
            const newId = result[0].id;  
            const query2 = `UPDATE employees SET role_id = ? where first_name = ?`
            db.query(query2, [newId, answers.employeeUpdate], (err, result) => {
                if (err) {
                    throw err
                }
                console.log("Employee's Role has been updated")
                console.log('===============================================');
                firstQuestion();
            })
        })
    })
} 

//Views role
const viewRoles = () => {
    const query = `SELECT roles.id, roles.title AS Title, roles.salary AS Salary, departments.name AS Department FROM roles LEFT JOIN departments on roles.department_id = departments.id`
    db.query(query, (err, res) => {
        if (err) {
            throw err
        }
        console.log('Viewing all roles');
        console.log('===============================================');
        console.table(res);
        console.log('===============================================');
        firstQuestion();
    })
};

//Adds role
const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the title of the role you want to add?',
            name: 'newRole'
        },
        {
            type: 'input',
            message: 'What is the salary of this role?',
            name: 'salary'
        },
        {
            type: 'input',
            message: 'What is the department ID number for this role?',
            name: 'dept_id'
        }
    ]).then((answers) => {
        const query = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`
        db.query(query, [answers.newRole, answers.salary, answers.dept_id], 
            (err) => {
                if (err) {
                    throw err;
                }
                rolesArray.push(answers.newRole)
                console.log('Added new Role');
                console.log('===============================================');
                console.table(answers);
                console.log('===============================================');
                firstQuestion();
            })
    })
}

//Allows user to view departments
const viewDepartments = () => {
    query = `SELECT departments.id, departments.name AS Department FROM departments`
    db.query(query, (err, res) => {
        if (err) {
            throw err
        }
        console.log('Viewing all departments');
        console.log('===============================================');
        console.table(res);
        console.log('===============================================');
        firstQuestion();
    })
};

//Allows user to add department
const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What department do you want to add?',
            name: 'newDepartment'
        }
    ]).then((answer) => {
        const query = `INSERT INTO departments (name) VALUES (?)`
        db.query(query, answer.newDepartment, 
        (err) => {
            if (err) {
                throw err;
            }
            departmentsArray.push(answer.newDepartment)
            console.log('Added new Department');
            console.log('===============================================');
            console.table(answer);
            console.log('===============================================');
            firstQuestion();
        })
    })
}

//Allows user to view all employees
const viewAllEmployees = () => {
    const query = `SELECT employees.id, employees.first_name AS First, employees.last_name AS Last, roles.title AS Title, departments.name AS Department, roles.salary AS Salary, CONCAT(manager.first_name,' ', manager.last_name) AS Manager
    FROM employees
    LEFT JOIN employees manager on manager.id = employees.manager_id
    INNER JOIN roles ON employees.role_id = roles.id
    INNER JOIN departments ON departments.id = roles.department_id;`
    db.query(query, (err, res) => {
        if (err) {
            throw err
        }
        console.log('Viewing all employees');
        console.log('===============================================');
        console.table(res);
        console.log('===============================================');
        firstQuestion();
    })
};

//Array of all employees
const employeesArray = [];
    const queryEmployees = `SELECT first_name FROM employees`
    db.query(queryEmployees, (err, res) => {
        if (err) {
            throw err
        }
        res.forEach(({first_name}) => {
            employeesArray.push(first_name);
        });
    });

//Array of roles
const rolesArray = [];
    const queryRoles = `SELECT title FROM roles`
    db.query(queryRoles, (err, res) => {
        if (err) {
            throw err
        }
        res.forEach(({title}) => {
            rolesArray.push(title);
        })
    })

//Array of departments
const departmentsArray = [];
    const queryDepartments = `SELECT name from departments`
    db.query(queryDepartments, (err, res) => {
        if (err) {
            throw err
        }
        res.forEach(({name}) => {
            departmentsArray.push(name);
        })
    })

startTrack();