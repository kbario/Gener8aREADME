// function that renders the head of the credit section based on user input

function renderCreditHead(trueCreditKeys) {
    let desc;
    if (trueCreditKeys.includes('contributors') && trueCreditKeys.includes('tutorials') && trueCreditKeys.includes('thirdPartyAssets')) {
        desc = "Below are lists of links to the github's of people that contributed, and tutorials and third-party assets that were used to create this project.";
    } else if (trueCreditKeys.includes('contributors') && trueCreditKeys.includes('tutorials')){
        desc = "Below are lists of links to the github's of people that contributed, and tutorials that were used to create this project.";
    } else if (trueCreditKeys.includes('contributors') && trueCreditKeys.includes('thirdPartyAssets')){
        desc = "Below are lists of links to the github's of people that contributed, and third-party assets that were used to create this project.";
    } else if (trueCreditKeys.includes('tutorials') && trueCreditKeys.includes('thirdPartyAssets')){
        desc = "Below are lists of links to tutorials and third-party assets that were used to create this project.";
    } else if (trueCreditKeys.includes('contributors')){
        desc = "Below is a list of links to the github's of people that contributed to this project.";
    } else if (trueCreditKeys.includes('tutorials')){
        desc = "Below is a list of links to tutorials that were used to create this project.";
    } else if (trueCreditKeys.includes('thirdPartyAssets')){
        desc = "Below is a list of links to third-party assets that were used to create this project.";
    }
    if (desc !== undefined){
        return `## Credits
${desc}\n`
    } else {
        return ''
    }
}

// function to render the credit body based on user input
function renderCreditSection(values, github){
    const arr = values.split(",").map(item => item.trim());;
    if (github === 'github'){
        return arrMap = arr.map(user => `- [${user}](https://github.com/${user}/)`);
    } else if (github === 'other'){
        return arrMap = arr.map(link => `- ${link}`)
    };
};

// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
    const shield = `https://img.shields.io/badge/license-${license}-green.svg)`;
    return shield
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {}

// TODO: Create a function to generate markdown for README
function generateMarkdown(answers) {

    // get the keys of credit that need to be added to credit section
    const trueCreditKeys = Object.keys(answers.credits).filter((item) => {
        return answers.credits[item].bool === 'yes'
    });

    // create the creadit header based on keys
    const creditHead = renderCreditHead(trueCreditKeys);

    // create credit sections based on keys
    const creditList = trueCreditKeys.map((item) => {
        if (item === 'contributors'){
            const list = renderCreditSection(answers.credits[item].values, 'github');
            const listJ = list.join('\n');
            return `\n### Contributors\n${listJ}`
        } else if (item === 'tutorials') {  
            const list = renderCreditSection(answers.credits[item].values, 'other');
            const listJ = list.join('\n');
            return `\n### Tutorials\n${listJ}`
        } else if (item === 'thirdPartyAssets') {
            const list = renderCreditSection(answers.credits[item].values, 'other');
            const listJ = list.join('\n');
            return `\n### Third-Party Assets\n${listJ}`
        }
    });

    const shield = renderLicenseBadge(answers.license)
    return `# ${answers.title}
![license](${shield})

## Description
${answers.description}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [Contribute](#contribute)
- [License](#license)

## Installation
${answers.title} can be installed from github using the following code in the command line:

    ${answers.code}

## Usage
${answers.usage}

${creditHead}
${creditList}

## Features

## How to Contribute
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)

## Tests
${answers.testIns}

## Questions
If you have any questions, feel free to ask me through [GitHub](https://github.com/${answers.user.github}/) or by [email](mailto:${answers.user.email})

## License
Licensed under the [${answers.license}](LICENSE.txt) license.
`;
}



module.exports = generateMarkdown;