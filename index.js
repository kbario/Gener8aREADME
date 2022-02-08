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
        name: 'what',
        message: 'What does this project do?',
    }, {
        // TODO: description why did you make it
        type: 'input',
        name: 'why',
        message: 'Why did you create this project?',
    }, {
        // TODO: description how did you make it (what technologies)
        type: 'input',
        name: 'how',
        message: 'How did you make this project? (what technologies?)',
    }, {
        // TODO: description what problem does it solve
        type: 'input',
        name: 'problems',
        message: 'What problem does this project solve?',
    }, {
        // TODO: description what did you learn?
        type: 'input',
        name: 'learn',
        message: 'What did you learn while creating this project?',
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
        type: 'input',
        name: 'contributors',
        message: 'Who else contributed to this'
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
        message: 'What license do you want to add to this project?',
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
        type: 'input',
        name: 'githubUsername',
        message: 'What is your GitHub username?',   
    }, {
        // TODO: email
        type: 'input',
        name: 'email',
        message: 'What email can people with questions contact you by?',
    },
];

// TODO: Create a function to write README file
function writeToFile({title, what, why, how, problems, learn, installation, usage, contributors, testIns, license, githubUsername, email}) {
    const readmeTemplate = `# ${title}

    ## Description
    
    Provide a short description explaining the what, why, and how of your project. Use the following questions as a guide:
    
    - What was your motivation?
    - Why did you build this project? (Note: the answer is not "Because it was a homework assignment.")
    - What problem does it solve?
    - What did you learn?
    
    ## Table of Contents (Optional)
    
    If your README is long, add a table of contents to make it easy for users to find what they need.
    
    - [Installation](#installation)
    - [Usage](#usage)
    - [Credits](#credits)
    - [License](#license)
    
    ## Installation
    
    What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.
    
    ## Usage
    
    Provide instructions and examples for use. Include screenshots as needed.
    
    To add a screenshot, create an \`assets/images\` folder in your repository and upload your screenshot to it. Then, using the relative filepath, add it to your README using the following syntax:
    
        \```md
        ![alt text](assets/images/screenshot.png)
        \```
    
    ## Credits
    
    List your collaborators, if any, with links to their GitHub profiles.
    
    If you used any third-party assets that require attribution, list the creators with links to their primary web presence in this section.
    
    If you followed tutorials, include links to those here as well.
    
    ## License
    
    The last section of a high-quality README file is the license. This lets other developers know what they can and cannot do with your project. If you need help choosing a license, refer to [https://choosealicense.com/](https://choosealicense.com/).
    
    ---
    
    🏆 The previous sections are the bare minimum, and your project will ultimately determine the content of this document. You might also want to consider adding the following sections.
    
    ## Badges
    
    ![badmath](https://img.shields.io/github/languages/top/lernantino/badmath)
    
    Badges aren't necessary, per se, but they demonstrate street cred. Badges let other developers know that you know what you're doing. Check out the badges hosted by [shields.io](https://shields.io/). You may not understand what they all represent now, but you will in time.
    
    ## Features
    
    If your project has a lot of features, list them here.
    
    ## How to Contribute
    
    If you created an application or package and would like other developers to contribute it, you can include guidelines for how to do so. The [Contributor Covenant](https://www.contributor-covenant.org/) is an industry standard, but you can always write your own if you'd prefer.
    
    ## Tests
    
    Go the extra mile and write tests for your application. Then provide examples on how to run them here.`
}

// TODO: Create a function to initialize app
function init() {
    inquirer
    .prompt(questions)
    .then((answers) => {
        writeToFile(answers, answers)
    });
}

// Function call to initialize app
init();
