// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown.js')

// TODO: Create an array of questions for user input
const questions = [
    {   // User's github user name
        type: 'input',
        name: 'user.github',
        message: 'Hello, What\'s your GitHub username?' ,   
    }, {   // User's email for questions
        type: 'input',
        name: 'user.email',
        message: 'And your email address to go on the README?',
    }, {   // project's title for readme title 
        type: 'input',
        name: 'title',
        message: 'What is your project\'s name?',
    }, {   // ask what it does
        type: 'input',
        name: 'description',
        message(answers){return `Describe ${answers.title}. \x1B[33mWhat Does it do? Why did you create it? What problem does it solve? What technologies did you use?\x1B[0m`},
    }, {  
        type: 'input', 
        name: 'installation', 
        message(answers){return `What code should be run to install ${answers.title} in the command line?`}
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
        name: 'credits.contributors.values',
        message: 'What are their GitHub usernames? (comma separated)',
        when(answers) {return answers.credits.contributors.bool === 'yes'}
    }, {   // did you use any tutorials?
        type: 'list',
        name: 'credits.tutorials.bool',
        choices: ['yes', 'no'],
        message(answers){return `Did you follow any tutorials while creating ${answers.title}?`},
    }, {   // if so, what are their urls?
        type: 'input',
        name: 'credits.tutorials.values',
        message: 'What are the URLs to these tutorials? (separated with a comma if multiple)',
        when(answers) {return answers.credits.tutorials.bool === 'yes'}
    }, {   // did you use any assets?
        type: 'list',
        name: 'credits.thirdPartyAssets.bool',
        choices: ['yes', 'no'],
        message(answers){return `Did you use any third-party assets to create ${answers.title}?`},
    }, {   // if so, which ones
        type: 'input',
        name: 'credits.thirdPartyAssets.values',
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
function writeToFile(answers) {
    const gener8 = generateMarkdown(answers)
    fs.writeFile('./README.md', gener8, (err) => err ? console.log(err) : console.log("Success!"))
}

// TODO: Create a function to initialize app
function init() {
    // inquirer
    // .prompt(questions)
    // .then((answers) => {
        console.log(answers)
        writeToFile(answers)
    // });
}

const answers = {
    user: { github: 'kbario', email: 'kylebario1@gmail.com' },
    title: 'Gener8aREADME',
    description: "Gener8aREADME is a CLI application that dynamically creates README.md files for open-source projects based on a users input in the command line. It was created to take the guesswork out of making a README. README's are crucial aspects of github repositories, often being the make or break of a project. If your README doesn't describe your project well enough, comes across unprofessional, or does not answer the basic questions for usage, installation, and reporting bugs, people may not use or contribute to your project. Gener8aREADME has a professional template that makes sure all aspects of a good README are covered without you needing to create links and style markdown files. Gener8aREADME was created using JavaScript, Node.js, and the Node.js module 'inquirer'.",
    installation: 'git clone https://github.com/kbario/Gener8aREADME.git',
    usage: 'asdf',
    credits: {
      contributors: { bool: 'yes', values: 'kbario, tkimhofer, wratten' },
      tutorials: {
        bool: 'yes',
        values: 'https://www.youtube.com/channel/UCsBjURrPoezykLs9EqgamOA, https://www.youtube.com/watch?v=MBqS1kYzwTc'
      },
      thirdPartyAssets: {
        bool: 'yes',
        values: 'https://fonts.google.com/, https://jqueryui.com/'
      }
    },
    testIns: 'asdf',
    license: 'MIT'
  }
// Function call to initialize app
init();
