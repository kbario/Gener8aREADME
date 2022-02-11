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
        message: '\x1B[034mWould you like to add an image to this usage section? \x1B[0mIf yes, add it to assets file name "img1.png".',
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
        message: '\x1B[034mWould you like to add an image to this usage section? \x1B[0mIf yes, add it to assets file name "img2.png".',
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
        message: '\x1B[034mWould you like to add an image to this usage section? \x1B[0mIf yes, add it to assets file name "img3.png".',
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
        message: 'How code can people use to test this project?',
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
    console.log('\n\x1B[1;32mWelcome to Gener8aREADME!\n\x1B[0;32mI dynamically generate an AMAZING README.md file for open-source GitHub repositories.\nI ask you questions, and your answers dictate the created README.\n\n\x1B[33m     Yellow questions utilise markdown styling in the answers to customise the README.\n\x1B[39m     Neutral (black/white) question do not not utilse said styling.\n\x1B[0;34m     Blue questions indicate that images can be inserted in this section.\n\n\x1b[32mI output a file called \x1B[1;32m<your-project\'s-title>\'s_README\x1B[0;32m containing everything you\'ll need.\n\x1B[0;32mI creates a license and code of conduct file if you want me to.\n\x1b[34mIf you answer yes to a blue quesiton, add the images into the assets folder.\nName the images "img<One, Two or Three>.png" based on the section you want them in.\n\x1b[32mOnce created, move the contents of your folder into your github repo.\n\x1B[1;31mYou can quit me by pressing `Ctrl+C`, but all answers will be lost.\n\x1B[1;32mAnd it\'s as easy as that! Let\'s get started!\x1B[0m')
    // inquirer
    // .prompt(questions)
    // .then((answers) => {
    //     console.log(answers)
        writeToFile(answers)
    // });
};

const answers = {
    user: { github: 'kbario', email: 'kylebario1@gmail.com' },
    title: 'Gener8aREADME',
    description: "Gener8aREADME dynamically creates a README.md file for your open-source github repository based on inputs you give in the command line.\nI created Gener8aREADME because README's are crucial aspects of an open-source repo because it is the first thing people look at when viewing your repo, giving an insight into your professionalism as a developer, your skills as a programmer and the tools that other developers need to contribute to the project. If any of these things are not up to standard, you risk people not contributing to your project or others not taking you seriously.\nBy automating the production of a README from a professional template - such as that that Gener8aREADME works off of - you garuantee that all the bases of a good README are covered, allowing you to focus on the developing of the project.\nGener8aREADME was developed using JavaScript, Node.js and Inquirer.",
    installation: {
      desc: 'You can clone the repo of Gnere8aREADME from my github. Navigate to the directory/file you wish to store the repo in the command line and run the following code:',
      code: 'git clone https://github.com/kbario/Gener8aREADME.git'
    },
    usage: {
      One: {
        title: 'Create a README',
        desc: 'To create a README using Gener8aREADME, navigate to the directory of the repo you cloned on your local machine and run the code below. This will initialise Gener8aREADME and you should see the greeting message below.',
        code: 'node index.js',
        img: 'yes'
      },
      Two: {
        bool: 'yes',
        title: 'Colour-Coded Questions',
        desc: 'The questions of Gener8aREADME are coloured based on what features they offer you.\n- **Neutral** (black and white) questions are exactly that, there is not functionality to these qustions.\n- **Yellow** questions indicate that you can add markdown-like styling to the README in these sections to further customise the file.\n- **Blue** questions indicate that - if answered yes - you can add files to the assets folder created with the README and they will automatically be added to the README. This is a useful feature as you can add images for the usage, etc. to futher engage readers about your project.\n - Finally, **Green** text is also used in the application to indicate introductions to sections and general information.',
        code: '',
        img: 'yes'
      },
      Three: {
        bool: 'yes',
        title: "Using Gener8aREADME's Output",
        desc: "Once you've answered all the quesitons, the application will output a file titled <your-project's-title>'s_README. Inside this file will be your README.md, your License that you chose, a code of conduct file (optional), and an assets file. If you answered yes to a blue question or questions, add the associated images in this file named 'imgOne.png', etc. based on how many blue questions you said yes to. NOTE: if you added an image to section 1 and 3 of usage but not two, the images will need to be named imgOne.png and imgThree.png.\nFrom there, your README is set up, and you can add it along with the other accompanying files directly into your github repo. **Happy README-ing!** :)",
        code: '',
        img: 'yes'
      }
    },
    credits: {
      contributors: { bool: 'no' },
      tutorials: {
        bool: 'yes',
        values: 'https://pakstech.com/blog/inquirer-js/, https://tforgione.fr/posts/ansi-escape-codes/, https://askubuntu.com/questions/533302/how-to-write-literal-n-in-a-file-as-text-from-the-terminal, https://choosealicense.com/licenses/, https://coding-boot-camp.github.io/full-stack/github/professional-readme-guide'
      },
      thirdPartyAssets: { bool: 'no' }
    },
    testIns: 'git clone https://github.com/kbario/Gener8aREADME.git\nnode index.js',
    license: 'MIT',
    fullname: 'Kyle Bario',
    year: '2022',
    contribute: { standard: 'yes' }
  }

// Function call to initialize app
init();
