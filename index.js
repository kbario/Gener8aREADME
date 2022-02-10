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
        message(answers){return `\x1B[33mDESCRIPTION. What Does it do? Why did you create it? What problem does it solve? What technologies did you use?\x1B[0m`},
    }, {  
        type: 'input', 
        name: 'installation.desc', 
        message(answers){return `\x1B[033mHow should people install ${answers.title}? Give a brief description. The next question will prompt you for the actual code to install.\x1B[0m`}
    }, {  
        type: 'input', 
        name: 'installation.code', 
        message(answers){return `What code should be run to install ${answers.title} in the command line?`}
    }, {
        // TODO: usage information
        type: 'input',
        name: 'usage.One.title',
        message: "\x1B[1;32mUSAGE: You can put up to THREE usage sections. Each allows space for a title, description, code block and image of the specific usage/feature.\n\x1B[0mWhat title would you give this section? (First is typically code to start/run the application, i.e. 'Start-up' or 'Initialise')",
    }, {
        // TODO: usage information
        type: 'input',
        name: 'usage.One.desc',
        message: '\x1B[033mDescribe this usage.\x1B[0m',
    }, {
        // TODO: usage information
        type: 'input',
        name: 'usage.One.code',
        message: "What code should be run to do this?",
    },{
         // TODO: usage information
        type: 'list',
        name: 'usage.One.img',
        choices: ['yes', 'no'],
        message: '\x1B[034mWould you like to add an image to this usage code? \x1B[0mIf yes, add it to assets file name "img1.png".',
    }, {
        // TODO: usage information
        type: 'list',
        name: 'usage.Two.bool',
        choices: ['yes', 'no'],
        message: 'Would you like to add another section of usage?',
    }, {
        // TODO: usage information
        type: 'input',
        name: 'usage.Two.title',
        message: "What title would you like to give this section? (ideas: 'Main Feature', 'Using Output')",
    }, {
        // TODO: usage information
        type: 'input',
        name: 'usage.Two.desc',
        message: '\x1B[033mDescribe this usage.\x1B[0m',
    }, {
        // TODO: usage information
        type: 'input',
        name: 'usage.Two.code',
        message: "What code should be run to do this? (if none, leave this blank)",
    },{
         // TODO: usage information
        type: 'list',
        name: 'usage.Two.img',
        choices: ['yes', 'no'],
        message: '\x1B[034mWould you like to add an image to this usage code? \x1B[0mIf yes, add it to assets file name "img2.png".',
    }, {
        // TODO: usage information
        type: 'list',
        name: 'usage.Three.bool',
        choices: ['yes', 'no'],
        message: 'Would you like to add another section of usage?',
    }, {
        // TODO: usage information
        type: 'input',
        name: 'usage.Three.title',
        message: "What title would you like to give this section?",
    }, {
        // TODO: usage information
        type: 'input',
        name: 'usage.Three.desc',
        message: '\x1B[033mDescribe this usage.\x1B[0m',
    }, {
        // TODO: usage information
        type: 'input',
        name: 'usage.Three.code',
        message: "What code should be run to do this? (if none, leave this blank)",
    },{
         // TODO: usage information
        type: 'list',
        name: 'usage.Three.img',
        choices: ['yes', 'no'],
        message: '\x1B[034mWould you like to add an image to this usage code? \x1B[0mIf yes, add it to assets file name "img3.png".',
    }, {   // did anyone help you ?
        type: 'list',
        name: 'credits.contributors.bool',
        choices: ['yes', 'no'],
        message(answers){return `Did other developers contribute to ${answers.title}?`},
    }, {   // if so what are their github usernames?
        type: 'input',
        name: 'credits.contributors.values',
        message: 'What are their GitHub usernames? (comma separated if multiple)',
        when(answers) {return answers.credits.contributors.bool === 'yes'}
    }, {   // did you use any tutorials?
        type: 'list',
        name: 'credits.tutorials.bool',
        choices: ['yes', 'no'],
        message(answers){return `Did you follow any tutorials while creating ${answers.title}?`},
    }, {   // if so, what are their urls?
        type: 'input',
        name: 'credits.tutorials.values',
        message: 'What are the URLs to these tutorials? (comma separated if multiple)',
        when(answers) {return answers.credits.tutorials.bool === 'yes'}
    }, {   // did you use any assets?
        type: 'list',
        name: 'credits.thirdPartyAssets.bool',
        choices: ['yes', 'no'],
        message(answers){return `Did you use any third-party assets to create ${answers.title}?`},
    }, {   // if so, which ones
        type: 'input',
        name: 'credits.thirdPartyAssets.values',
        message: 'What are the URLs to these assets? (comma separated if multiple)',
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
    }, {   // if so, which ones
        type: 'input',
        name: 'fullname',
        message: 'What is your full name?',
        when(answers) {return answers.license === 'MIT' || answers.license === 'Apache-2.0'}
    }, {   // if so, which ones
        type: 'input',
        name: 'year',
        message: 'What year is it?',
        when(answers) {return answers.license === 'MIT' || answers.license === 'Apache-2.0'}
    }, {
        // TODO how to contribute
        type: 'list', 
        name: 'contribute.standard',
        choices: ['yes', 'no'],
        message: 'Would you like to adopt the industry standard code of conduct for developer contributions? Yes is strongly encouraged but see https://www.contributor-covenant.org/ if you are unsure and come back.',
    }, {
        type: 'list', 
        name: 'contribute.own',
        choices: ['yes', 'no'],
        message: 'Would you like to add your own code of conduct instead?',
        when(answers) {return answers.contribute.standard === 'no'}
    }, {
        type: 'input', 
        name: 'contribute.custom',
        message: 'What would you like the code of conduct to be?',
        when(answers) {return answers.contribute.own === 'yes'}
    }
];

// TODO: Create a function to write README file
function writeToFile(answers) {
    const gener8 = generateMarkdown(answers)
    ;fs.writeFile(`./${answers.title}'s_README/README.md`, gener8, (err) => err ? console.log(err) : console.log("README \x1B[1;32m[√]\x1B[0m"))
}

// TODO: Create a function to initialize app
function init() {
    console.log('\n\x1B[1;32mWelcome to Gener8aREADME!\n\x1B[0;32mThis app dynamically generates a README.md file for your open-source GitHub repository based on answers you give to questions.\nThis app outputs a file called \x1B[1;32m<your-project\'s-title>\'s_README\x1B[0;32m which contains the README.md and other accompanying files created.\n\x1B[33mYellow questions utilise markdown styling in the answers to customise the README. Use ` \\n\\n ` for a line break.\n\x1B[39mBut black/white question do not not utilse said styling.\n\x1B[0;34mBlue questions indicate that after the README is created, you can add images to the assets folder in \x1B[1;34m<your-project\'s-title>\'s_README\x1B[0;34m titled "imgOne.png", "imgTwo.png", etc. in order of input and they will automatically appear in the README.md.\n\x1B[1;31mYou can quit Gener8aREADME at anytime by pressing `Ctrl+C`, but all answers will be lost.\n\x1B[0;32mGener8aREADME will create a license and code of conduct file based on your input also.\nOnce created, move the contents of \x1B[1;32m<your-project\'s-title>\'s_README\x1B[0;32m into your github repo.\n\x1B[1;32mAnd it\'s as easy as that! Let\'s get started!\x1B[0m')
    inquirer
    .prompt(questions)
    .then((answers) => {
        // console.log(answers)
        writeToFile(answers)
    });
};

// Function call to initialize app
init();
