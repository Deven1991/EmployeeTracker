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





startTrack();