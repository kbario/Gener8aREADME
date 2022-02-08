// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown.js')

// TODO: Create an array of questions for user input
const questions = [
    {
        // TODO: title fo the project
        type: 'input',
        name: 'title',
        message: 'What is your project\'s name?',
    }, {
        // TODO: description what does it do
        type: 'input',
        name: 'desc-what',
        message: 'What does this project do?',
    }, {
        // TODO: description why did you make it
        type: 'input',
        name: 'desc-why',
        message: 'What does this project do?',
    }, {
        // TODO: description how did you make it (what technologies)
        type: 'input',
        name: 'desc-how',
        message: 'What does this project do?',
    }, {
        // TODO: description what problem does it solve
        type: 'input',
        name: 'desc-problems',
        message: 'What does this project do?',
    }, {
        // TODO: description what did you learn?
        type: 'input',
        name: 'desc-learn',
        message: 'What does this project do?',
    }, {
        // TODO: installation instructions
    }, {
        // TODO: usage information
    }, {
        // TODO: contributions guidelines
    }, {
        // TODO: test instructions
    }, {
        // TODO: licence
        // TODO: list of options
        type: 'list',
        name: 'desc-problems',
        message: 'What does this project do?',
        choices: [
            'GNU AGPLv3',
            'GNU GPLv3',
            'GNU LGPLv3',
            'Mozilla Public 2.0',
            'Apache 2.0',
            'MIT',
            'Boost Software 1.0',
            'The Unlicense',
        ],
        default: 'MIT'
    }, {
        // TODO: github username    
    }, {
        // TODO: email
    },
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {}

// Function call to initialize app
init();
