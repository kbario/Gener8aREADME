// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown.js')

// TODO: Create an array of questions for user input
const questions = [
    {
        // TODO: name
        type: 'input',
        name: 'user.name',
        message: 'Hello, What\'s your name?',   
    }, {
        // TODO: github username 
        type: 'input',
        name: 'user.githubUsername',
        message(answers){return `What's your GitHub username, ${answers.user.name}?`} ,   
    }, {
        // TODO: email
        type: 'input',
        name: 'user.email',
        message: 'And best email address to contact you by?',
    }, {
        // TODO: title fo the project
        type: 'input',
        name: 'title',
        message: 'What is your project\'s name?',
    }, {
        // TODO: description what does it do
        type: 'list',
        name: 'description.thing',
        choices:['CLI', "Website"],
        message(answers){return `What is ${answers.title}?`},
    }, {
        // TODO: description what does it do
        type: 'input',
        name: 'description.what',
        message(answers){return `\x1B[33mFinish this sentence:\x1B[0m ${answers.title} is a ${answers.description.thing} that...`},
    }, {
        // TODO: description why did you make it
        type: 'input',
        name: 'description.why',
        message(answers){return `Why did you create ${answers.title}? What problems does it solve?`},
    }, {
        // TODO: description how did you make it (what technologies)
        type: 'input',
        name: 'description.how',
        message: 'What technologies did you use to make it?',
    }, {
        // TODO: description what did you learn?
        type: 'input',
        name: 'description.learn',
        message(answers){return `And what did you learn while making ${answers.title}?`},
    }, {
        // TODO: installation instructions
        type: 'input', 
        name: 'installation', 
        message: 'How can people install this project?'
    }, {
        // TODO: usage information
        type: 'input',
        name: 'usage',
        message: 'How do people use this project?',
    }, {
        // TODO: contributions guidelines
        type: 'list',
        name: 'contributors.bool',
        choices: ['yes', 'no'],
        message(answers){return `Did other developers contribute to ${answers.title}?`},
    }, {
        // TODO: contributions guidelines
        type: 'input',
        name: 'contributors.usernames',
        message: 'What are their GitHub usernames? (comma separated)',
        when(answers) {return answers.contributors.bool === 'yes'}
    }, {
        // TODO: tutorials used?
        type: 'list',
        name: 'tutorials.bool',
        choices: ['yes', 'no'],
        message(answers){return `Did you follow any tutorials while creating ${answers.title}?`},
    }, {
        // TODO: which ones?
        type: 'input',
        name: 'tutorials.url',
        message: 'What are the URLs to these tutorials? (separated with a comma if multiple)',
        when(answers) {return answers.tutorials.bool === 'yes'}
    }, {
        // TODO: assets used?
        type: 'list',
        name: 'thirdPartyAssets.bool',
        choices: ['yes', 'no'],
        message(answers){return `Did you use any third-party assets to create ${answers.title}?`},
    }, {
        // TODO: which ones?
        type: 'input',
        name: 'thirdPartyAssets.url',
        message: 'What are the URLs to these assets? (separated with a comma if multiple)',
        when(answers) {return answers.thirdPartyAssets.bool === 'yes'}
    }, {
        // TODO: test instructions
        type: 'input', 
        name: 'testIns',
        message: 'How can people test this project?',
    }, {
        // TODO: licence
        // TODO: list of options
        type: 'list',
        name: 'license',
        message(answers){return `What license do you want to add to ${answers.title}?`},
        choices: [
            'MPL-2.0',
            'Apache-2.0',
            'MIT',
            'Unlicense',
        ],
        default: 'MIT'
    }, 
];

// TODO: Create a function to write README file
function writeToFile(data) {
    const gener8 = generateMarkdown(data)
    fs.writeFile('./README.md', gener8, (err) => err ? console.log(err) : console.log("Success!"))
}

// TODO: Create a function to initialize app
function init() {
    inquirer
    .prompt(questions)
    .then((answers) => {
        console.log(answers)
        writeToFile(answers)
    });
}

// Function call to initialize app
init();
