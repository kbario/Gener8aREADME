// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown.js')

// TODO: Create an array of questions for user input
const questions = [
    {   // User's name
        type: 'input',
        name: 'user.name',
        message: 'Hello, What\'s your name?',   
    }, {   // User's github user name
        type: 'input',
        name: 'user.githubUsername',
        message(answers){return `What's your GitHub username, ${answers.user.name}?`} ,   
    }, {   // User's email for questions
        type: 'input',
        name: 'user.email',
        message: 'And best email address to contact you by?',
    }, {   // project's title for readme title 
        type: 'input',
        name: 'title',
        message: 'What is your project\'s name?',
    }, {   // what type of software is it?
        type: 'list',
        name: 'description.thing',
        choices:['CLI', "Website", 'other'],
        message(answers){return `What is ${answers.title}?`},
    }, {   // if software === other, ask them to write it
        type: 'input',
        name: 'description.thing',
        choices:['CLI', "Website", 'other'],
        message(answers){return `Elaborate, what is ${answers.title}?`},
        when(answers){return answers.description.thing === 'other'}
    }, {   // ask what it does
        type: 'input',
        name: 'description.what',
        message(answers){return `What does ${answers.title} do?\n\x1B[33mFinish this sentence:\x1B[0m ${answers.title} is a ${answers.description.thing}...`},
    }, {    // why did you create it?
        type: 'input',
        name: 'description.why',
        message(answers){return `Why did you create ${answers.title}? What problems does it solve?`},
    }, {   // what technologies did you use?
        type: 'input',
        name: 'description.how',
        message: 'What technologies did you use to make it?',
    }, {   // the platform the code can be got from
        type: 'list', 
        name: 'installation.platform', 
        choices: ['npm', 'github'],
        message(answers){return `What platform can ${answers.title} accessed from?`},
    }, {  
        type: 'input', 
        name: 'installation.code', 
        message: 'What code should be run to install it?',
    }, {
        // TODO: usage information
        type: 'input',
        name: 'usage',
        message: 'How do people use this project?',
    }, {   // did anyone help you ?
        type: 'list',
        name: 'credits.contributors.bool',
        choices: ['yes', 'no'],
        message(answers){return `Did other developers contribute to ${answers.title}?`},
    }, {   // if so what are their github usernames?
        type: 'input',
        name: 'credits.contributors.usernames',
        message: 'What are their GitHub usernames? (comma separated)',
        when(answers) {return answers.credits.contributors.bool === 'yes'}
    }, {   // did you use any tutorials?
        type: 'list',
        name: 'credits.tutorials.bool',
        choices: ['yes', 'no'],
        message(answers){return `Did you follow any tutorials while creating ${answers.title}?`},
    }, {   // if so, what are their urls?
        type: 'input',
        name: 'credits.tutorials.url',
        message: 'What are the URLs to these tutorials? (separated with a comma if multiple)',
        when(answers) {return answers.credits.tutorials.bool === 'yes'}
    }, {   // did you use any assets?
        type: 'list',
        name: 'credits.thirdPartyAssets.bool',
        choices: ['yes', 'no'],
        message(answers){return `Did you use any third-party assets to create ${answers.title}?`},
    }, {   // if so, which ones
        type: 'input',
        name: 'credits.thirdPartyAssets.url',
        message: 'What are the URLs to these assets? (separated with a comma if multiple)',
        when(answers) {return answers.credits.thirdPartyAssets.bool === 'yes'}
    }, {
        // TODO: test instructions
        type: 'input', 
        name: 'testIns',
        message: 'How can people test this project?',
    }, {   // What license?
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
