//  access the custom module writeLicense.js
const extras = require('./writeLicense.js')
const answers = {
    user: { github: 'kbario', email: 'kylebario1@gmail.com' },
    title: 'Gener8aREADME',
    description: 'Gener8aREADME is a CLI application designed to dynamically create a README.md file for your open source github repository. It does so in a professional manner, covering all the bases so that you can rest assured that your README is of a high-quality, answers all basic question, and encourages people to contribute. \\nGener8aREADME was developed using JavaScript, Node.js and inquirer, a Node.js module.',
    installation: 'git clone https://github.com/kbario/Gener8aREADME.git',
    usage: {
      One: {
        title: 'Initialise',
        desc: 'As Gener8aREADME is a CLI application, it is run through the terminal/powershell using node.js. To run it, use the code:',
        code: 'node index.js',
        img: 'yes'
      },
      Two: {
        bool: 'yes',
        title: 'Dynamic Questions',
        desc: 'Each question that Gener8aREADME asks is colour-coded for ease of use. Green writing is general purpose. Yellow questions are able to be styled and customised with markdown styling. White questions are basic and you should just give plain answers, no styling. And blue questions allow images to be added after creating the README.',
        code: '',
        img: 'yes'
      },
      Three: { bool: 'no' }
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

// credit section
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
${desc}`
    } else {
        return ''
    }
}

// function to render the credit body based on user input
function renderCreditSection(values, github){
    const arr = values.split(",").map(item => item.trim());
    if (github === 'github'){
        return arrMap = arr.map(user => `- [${user}](https://github.com/${user}/)`);
    } else if (github === 'other'){
        return arrMap = arr.map(link => `- ${link}`)
    };
};


// usage section
const usageKeys = Object.keys(answers.usage).filter((item) => {
    if(Object.keys(answers.usage[item]).includes('bool')) {
        return answers.usage[item].bool === 'yes'
    } else {
        return item
    }
});

const usageRender = usageKeys.map(item => {
    const secondKeys = Object.keys(answers.usage[item]).filter(item1 => {
        return answers.usage[item][item1] !== '' && item1 !== 'bool'
    });
    const things = secondKeys.map(item1 => {
        if (item1 === 'title'){
            return `### ${answers.usage[item][item1]}\n`
        } else if (item1 === 'desc') {
            return `${answers.usage[item][item1]}\n`
        } else if (item1 === 'code') {
            return `    ${answers.usage[item][item1]}\n`
        } else if (item1 === 'img') {
            return `![${answers.usage[item].title}](./assets/img${item}.png)\n`
        }
    })
    return things.join('')
});

// create folder for imgs used in usage section

// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
    if (license.includes('-')){
        return shield = `https://img.shields.io/badge/license-${license.replace('-', '--')}-green.svg)`;
    } else {
        return shield = `https://img.shields.io/badge/license-${license}-green.svg)`;
    }
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {

}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {}

// TODO: Create a function to generate markdown for README
function generateMarkdown(answers) {
    // generate license.md
    extras.makeAssetsDir(`./${answers.title}'s_README`)
    extras.makeAssetsDir(`./${answers.title}'s_README/assets`)
    extras.writeLicense(answers.license, answers.year, answers.fullname, answers.title)
    extras.writeCC(answers.title)

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

    // create the usage section based on keys provided
    const usageKeys = Object.keys(answers.usage).filter((item) => {
        if(Object.keys(answers.usage[item]).includes('bool')) {
            return answers.usage[item].bool === 'yes'
        } else {
            return item
        }
    });
    
    const usageRender = usageKeys.map(item => {
        const secondKeys = Object.keys(answers.usage[item]).filter(item1 => {
            return answers.usage[item][item1] !== '' && item1 !== 'bool'
        });
        const things = secondKeys.map(item1 => {
            if (item1 === 'title'){
                return `### ${answers.usage[item][item1]}\n\n`
            } else if (item1 === 'desc') {
                return `${answers.usage[item][item1]}\n\n`
            } else if (item1 === 'code') {
                return `    ${answers.usage[item][item1]}\n\n`
            } else if (item1 === 'img') {
                return `![${answers.usage[item].title}](./assets/img${item}.png)\n\n`
            }
        })
        return things.join('')
    });

    const shield = renderLicenseBadge(answers.license)
    return `# ${answers.title}
[![license](${shield}](./LICENSE.md)

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

    ${answers.installation}

## Usage
${usageRender.join('\n')}


## How to Contribute
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](./code_of_conduct.md)

## Tests
${answers.testIns}

## Questions
If you have any questions, feel free to contact me through my [GitHub](https://github.com/${answers.user.github}/) or [Email me](mailto:${answers.user.email}).

${creditHead}
${creditList.join('\n')}

## License
Licensed under the [${answers.license}](./LICENSE.txt) license.

`;
}



module.exports = generateMarkdown;