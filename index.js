const inquirer = require("inquirer");
const cTable = require("console.table");
const db = require("./db/connection");
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

const firstQuestion = () => {
    inquirer.prompt([
        {
            type: 'list',
            name:'startChoice',
            message: 'What would you like to do?',
            choices:[
                'View All Employees',
                'View Roles',
                'View Departments',
                'View Employees by Department',
                'Add Employee',
                'Add Role',
                'Add Department',
                "Update Employee's Role",
                'Exit'
            ]
        }
    ]).then((answer) => {
        switch (answer.startChoice) {
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'View Roles':
                viewRoles();
                break;
            case 'View Departments':
                viewDepartments();
                break;
            case 'View Employees by Department':
                viewEmployeesByDepartment();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case "Update Employee's Role":
                updateRole();
                break;
            case 'Exit':
                exit();
                

        }
    })
};








startTrack();