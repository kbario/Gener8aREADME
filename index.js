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
        message: 'What is your project\'s repo name?',
    }, {   // ask what it does
        type: 'input',
        name: 'description',
        message(answers){return `\x1B[1;32mDESCRIPTION. \x1B[0;33mWhat Does it do? Why did you create it? What problem does it solve? What technologies did you use?\x1B[0m`},
    }, {  
        type: 'input', 
        name: 'installation.desc', 
        message(answers){return `\x1B[033mHow should people install ${answers.title}? Give a brief description. The next question will prompt you for the actual code to install.\x1B[0m`}
    }, {  
        type: 'input', 
        name: 'installation.code', 
        message(answers){return `\x1B[033mWhat code should be run to install ${answers.title} in the command line?\x1B[0m`}
    }, {
        // TODO: usage information
        type: 'input',
        name: 'usage.One.title',
        message: "\x1B[1;32mUSAGE: You can put up to THREE usage sections. Each allows space for a title, description, code block and image of the specific usage/feature.\n\x1B[33mWhat title would you give this section?\x1B[0m (First is typically code to start/run the application, i.e. 'Start-up' or 'Initialise')",
    }, {
        // TODO: usage information
        type: 'input',
        name: 'usage.One.desc',
        message: '\x1B[033mDescribe this usage.\x1B[0m',
    }, {
        // TODO: usage information
        type: 'input',
        name: 'usage.One.code',
        message: "\x1B[033mWhat code should be run to do this?\x1B[0m",
    },{
         // TODO: usage information
        type: 'list',
        name: 'usage.One.img',
        choices: ['yes', 'no'],
        message: '\x1B[034mWould you like to add an image to this usage section? \x1B[0mIf yes, add it to assets file name "imgOne.png".',
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
        message: "\x1B[033mWhat title would you like to give this section?\x1B[0m (ideas: 'Main Feature', 'Using Output')",
        when(answers) {return answers.usage.Two.bool === 'yes'}
    }, {
        // TODO: usage information
        type: 'input',
        name: 'usage.Two.desc',
        message: '\x1B[033mDescribe this usage.\x1B[0m',
        when(answers) {return answers.usage.Two.bool === 'yes'}
    }, {
        // TODO: usage information
        type: 'input',
        name: 'usage.Two.code',
        message: "\x1B[033mWhat code should be run to do this?\x1B[0m (if none, leave this blank)",
        when(answers) {return answers.usage.Two.bool === 'yes'}
    },{
         // TODO: usage information
        type: 'list',
        name: 'usage.Two.img',
        choices: ['yes', 'no'],
        message: '\x1B[034mWould you like to add an image to this usage section? \x1B[0mIf yes, add it to assets file name "imgTwo.png".',
        when(answers) {return answers.usage.Two.bool === 'yes'}
    }, {
        // TODO: usage information
        type: 'list',
        name: 'usage.Three.bool',
        choices: ['yes', 'no'],
        message: 'Would you like to add another section of usage?',
        when(answers) {return answers.usage.Two.bool === 'yes'}
    }, {
        // TODO: usage information
        type: 'input',
        name: 'usage.Three.title',
        message: "\x1B[033mWhat title would you like to give this section?\x1B[0m",
        when(answers) {return answers.usage.Two.bool === 'yes' && answers.usage.Three.bool === 'yes'}
    }, {
        // TODO: usage information
        type: 'input',
        name: 'usage.Three.desc',
        message: '\x1B[033mDescribe this usage.\x1B[0m',
        when(answers) {return answers.usage.Two.bool === 'yes' && answers.usage.Three.bool === 'yes'}
    }, {
        // TODO: usage information
        type: 'input',
        name: 'usage.Three.code',
        message: "\x1B[033mWhat code should be run to do this?\x1B[0m (if none, leave this blank)",
        when(answers) {return answers.usage.Two.bool === 'yes' && answers.usage.Three.bool === 'yes'}
    },{
         // TODO: usage information
        type: 'list',
        name: 'usage.Three.img',
        choices: ['yes', 'no'],
        message: '\x1B[034mWould you like to add an image to this usage section? \x1B[0mIf yes, add it to assets file name "imgThree.png".',
        when(answers) {return answers.usage.Two.bool === 'yes' && answers.usage.Three.bool === 'yes'}
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
        message: '\x1B[33mWhat code can people use to test this project?\x1B[0m',
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
    fs.writeFile(`./${answers.title}'s_README/README.md`, gener8, (err) => err ? console.log(err) : console.log("README \x1B[1;32m[√]\x1B[0m"))
}

// TODO: Create a function to initialize app
function init() {
    console.log('\n\x1B[1;32mWelcome to Gener8aREADME!\n\x1B[0;32mI dynamically generate an AMAZING README.md file for open-source GitHub repositories.\nI ask you questions, and your answers dictate the created README.\n\n\x1B[33m     Yellow questions utilise markdown styling in the answers to customise the README.\n\x1B[39m     Neutral (black/white) question do not not utilse said styling.\n\x1B[0;34m     Blue questions indicate that images can be inserted in this section.\n\n\x1b[32mI output a file called \x1B[1;32m<your-project\'s-title>\'s_README\x1B[0;32m containing everything you\'ll need.\n\x1B[0;32mI create a license and code of conduct file if you want me to.\n\x1b[34mIf you answer yes to a blue quesiton, add the images into the assets folder.\nName the images "img<One, Two or Three>.png" based on the section you want them in.\n\x1b[32mOnce created, move the contents of your folder into your github repo.\n\x1B[1;31mYou can quit me by pressing `Ctrl+C`, but all answers will be lost.\n\x1B[1;32mAnd it\'s as easy as that! Let\'s get started!\x1B[0m')
    inquirer
    .prompt(questions)
    .then((answers) => {
        // console.log(answers)
        writeToFile(answers)
    });
};

// Function call to initialize app
init();
