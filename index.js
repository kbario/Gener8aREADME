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
        message(answers){return `\x1B[33mDescribe ${answers.title}. What Does it do? Why did you create it? What problem does it solve? What technologies did you use?\x1B[0m`},
    }, {  
        type: 'input', 
        name: 'installation', 
        message(answers){return `What code should be run to install ${answers.title} in the command line?`}
    }, {
        // TODO: usage information
        type: 'input',
        name: 'usage.one.title',
        message: "\x1B[034mUSAGE: You can put up to THREE usage sections. Each allows space for a title, description, code block and image of the specific usage/feature.\n\x1B[0mWhat title would you give this section? (First is typically code to start/run the application, i.e. 'Start-up' or 'Initialise')",
    }, {
        // TODO: usage information
        type: 'input',
        name: 'usage.one.desc',
        message: '\x1B[033mDescribe this usage.\x1B[0m',
    }, {
        // TODO: usage information
        type: 'input',
        name: 'usage.one.code',
        message: "What code should be run to do this?",
    },{
         // TODO: usage information
        type: 'list',
        name: 'usage.one.img',
        choices: ['yes', 'no'],
        message: '\x1B[034mWould you like to add an image to this usage code? \x1B[0mIf yes, add it to assets file name "img1.png".',
    }, {
        // TODO: usage information
        type: 'list',
        name: 'usage.two.bool',
        choices: ['yes', 'no'],
        message: 'Would you like to add another section of usage?',
    }, {
        // TODO: usage information
        type: 'input',
        name: 'usage.two.title',
        message: "What title would you like to give this section? (ideas: 'Main Feature', 'Using Output')",
    }, {
        // TODO: usage information
        type: 'input',
        name: 'usage.two.desc',
        message: '\x1B[033mDescribe this usage.\x1B[0m',
    }, {
        // TODO: usage information
        type: 'input',
        name: 'usage.two.code',
        message: "What code should be run to do this? (if none, leave this blank)",
    },{
         // TODO: usage information
        type: 'list',
        name: 'usage.two.img',
        choices: ['yes', 'no'],
        message: '\x1B[034mWould you like to add an image to this usage code? \x1B[0mIf yes, add it to assets file name "img2.png".',
    }, {
        // TODO: usage information
        type: 'list',
        name: 'usage.three.bool',
        choices: ['yes', 'no'],
        message: 'Would you like to add another section of usage?',
    }, {
        // TODO: usage information
        type: 'input',
        name: 'usage.two.title',
        message: "What title would you like to give this section?",
    }, {
        // TODO: usage information
        type: 'input',
        name: 'usage.two.desc',
        message: '\x1B[033mDescribe this usage.\x1B[0m',
    }, {
        // TODO: usage information
        type: 'input',
        name: 'usage.two.code',
        message: "What code should be run to do this? (if none, leave this blank)",
    },{
         // TODO: usage information
        type: 'list',
        name: 'usage.two.img',
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
    }
];

// TODO: Create a function to write README file
function writeToFile(answers) {
    const gener8 = generateMarkdown(answers)
    fs.writeFile(`./${answers.title}'s_README/README.md`, gener8, (err) => err ? console.log(err) : console.log("Success!"))
}

// TODO: Create a function to initialize app
function init() {
    console.log('\n\n\n\x1B[1;32mWelcome to Gener8aREADME!\n\x1B[0;32mThis app dynamically generates a README.md file for your GitHub repository based on answers you give to questions.\n\x1B[33mMarkdown styling can be used in the answers to yellow questions to customise the README.\n\x1B[39mWhile white question will not use any styling.\n\x1B[0;34mYou can add images to blue questions after creating the README.md by adding them to the assets folder named "img1.png", "img2.png", etc. in order.\n\x1B[1;31mYou can quit anytime by pressing `Ctrl+C`, but all answers will be lost.\n\x1B[0;32mGener8aREADME will create a license and code of conduct file based on your input, as well as an assets folder which images can go in.\nThis is all outputed in a file titled \x1B[1;32m<project title>\'s_README \x1B[0;32mwhere you can move it to where ever you wish\n\x1B[32mLet\'s get started!\x1B[0m')
    // inquirer
    // .prompt(questions)
    // .then((answers) => {
    //     console.log(answers)
        writeToFile(answers)
    // });
}

const answers = {
  user: { github: 'kbario', email: 'kylebario1@gmail.com' },
  title: 'Gener8aREADME',
  description: 'Gener8aREADME is a CLI application designed to dynamically create a README.md file for your open source github repository. It does so in a professional manner, covering all the bases so that you can rest assured that your README is of a high-quality, answers all basic question, and encourages people to contribute. \\nGener8aREADME was developed using JavaScript, Node.js and inquirer, a Node.js module.',
  installation: 'git clone https://github.com/kbario/Gener8aREADME.git',
  usage: {
    one: {
      title: 'Initialise',
      desc: 'As Gener8aREADME is a CLI application, it is run through the terminal/powershell using node.js. To run it, use the code:',
      code: 'node index.js',
      img: 'yes'
    },
    two: {
      bool: 'yes',
      title: 'Dynamic Questions',
      desc: 'Each question that Gener8aREADME asks is colour-coded for ease of use. Green writing is general purpose. Yellow questions are able to be styled and customised with markdown styling. White questions are basic and you should just give plain answers, no styling. And blue questions allow images to be added after creating the README.',
      code: '',
      img: 'yes'
    },
    three: { bool: 'no' }
  },
  credits: {
    contributors: { bool: 'yes', values: 'kbario, tkimhofer, wratten' },
    tutorials: {
      bool: 'yes',
      values: 'https://www.youtube.com/channel/UCsBjURrPoezykLs9EqgamOA, https://www.youtube.com/watch?v=MBqS1kYzwTc'
    },
    thirdPartyAssets: { bool: 'no' }
  },
  testIns: 'asdf',
  license: 'MIT',
  fullname: 'Kyle Bario',
  year: '2022'
}

// Function call to initialize app
init();
