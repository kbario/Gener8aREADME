//  access the custom module writeLicense.js
const extras = require('./writeLicense.js')

// function that replaces the line breaks in descriptions to markdown readable line breaks
function addLineBreaks(input){
    return input.replaceAll('\n', '\n\n')
}
// function that replaces the line breaks in code to markdown readable line breaks
function addLineBreaksCode(input){
    return input.replaceAll('\n', '\n\n    ')
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

function outputCredits(answers) {
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

    return `${creditHead}
${creditList}`
}


function checkContributions(answers){

    if (answers.contribute.standard === 'yes'){
        const contribute = `\n\n## Contribute to ${answers.title}

All contributions to ${answers.title} are greatly appreciated and contributing is one of the many amazing things about open-source software.\n\nTo contribute to ${answers.title}, all we ask is that you're empathic and supportive towards other developers and follow the standard contribution guidelines. Click the banner below for more information.
        
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](./CODE_OF_CONDUCT.md)\n\n`
        extras.writeCcStandard(answers.title, answers.user.email)
        return contribute
    } else if (answers.contribute.own === 'yes'){
        const contribute = `\n\n## Contribute

${addLineBreaks(answers.contribute.custom)}\n\n`;
        return contribute
    } else {const contribute = '';
        return contribute
    };
}

function getUsageKeys(answers) {
    const useKeys = Object.keys(answers.usage).filter((item) => {
        if(Object.keys(answers.usage[item]).includes('bool')) {
            return answers.usage[item].bool === 'yes'
        } else {
            return item
        }
    });
    return useKeys
}


function createUsage(answers) {
    const usageKeys = getUsageKeys(answers)
    
    const usageRender = usageKeys.map(item => {
        const secondKeys = Object.keys(answers.usage[item]).filter(item1 => {
            return answers.usage[item][item1] !== '' && item1 !== 'bool'
        });
        const things = secondKeys.map(item1 => {
            if (item1 === 'title'){
                return `### ${answers.usage[item][item1]}\n\n`
            } else if (item1 === 'desc') {
                return `${addLineBreaks(answers.usage[item][item1])}\n\n`
            } else if (item1 === 'code') {
                return `    ${addLineBreaks(answers.usage[item][item1])}\n\n`
            } else if (item1 === 'img') {
                return `![${answers.usage[item].title}](./assets/img${item}.png)\n\n`
            }
        })
        return things.join('')
    });
    return usageRender.join('')
}

function createContentsTable(answers){
    const usageKeys = getUsageKeys(answers)
    
    const usageRender = usageKeys.map(item => { 
        const secondKeys = Object.keys(answers.usage[item]).filter(item1 => {
            return answers.usage[item][item1] !== '' && item1 !== 'bool'
        });
        const things = secondKeys.filter(item1 => {
            return item1 === 'title'
        });
        const things1 = things.map(item3 => {
            return `    - [${answers.usage[item][item3]}](#${answers.usage[item][item3].toLowerCase().replaceAll(' ', '-').replaceAll("'", "")})\n`
        });
        return things1
    });
    const trueCreditKeys = Object.keys(answers.credits).filter((item) => {
        return answers.credits[item].bool === 'yes'
    });
    let cred;
    let things2;
    if (trueCreditKeys.length!==0){
        things2 = trueCreditKeys.map(item4 => {
            if (item4 === "contributors"){
                return `    - [Contributors](#contributors)\n`
            } else if (item4 === "tutorials"){
                return `    - [Tutorials](#tutorials)\n`
            } else if (item4 === "contributors"){
                return `    - [Third-Party Assets](#third-party-assets)\n`
            }
            
       });
       cred = `[Credits](#credits)
${things2.join('')}`
    }

    // const useSubheading;
    
    const use = `[Usage](#usage)
${usageRender.join('')}`;
    // const cred;

    return `- [Installation](#installation)
- ${use}- [Contribute to ${answers.title}](#contribute-to-${answers.title.toLowerCase()})
- [Tests](#tests)
- [Questions](#questions)
- ${cred}- [License](#license)

`
}



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
    // Make a directory for the outputed readme to go in
    extras.makeAssetsDir(`./${answers.title}'s_README`);
    // Make a directory for the assets to go in
    extras.makeAssetsDir(`./${answers.title}'s_README/assets`);
    // create the license based on which anser they choose
    extras.writeLicense(answers.license, answers.year, answers.fullname, answers.title);
    // create the contribute section based on their answer
    const contribute = checkContributions(answers);
    // create the credit section
    const credits = outputCredits(answers)
    // create usage section 
    const usage = createUsage(answers)
    // create contents table
    const table = createContentsTable(answers)
    

    // create the usage section based on keys provided
    

    const shield = renderLicenseBadge(answers.license)
    return `# ${answers.title}
[![license](${shield}](./LICENSE.md)

## Description
${addLineBreaks(answers.description)}

## Table of Contents
${table}

## Installation
${addLineBreaks(answers.installation.desc)}

    ${addLineBreaksCode(answers.installation.code)}

## Usage

${usage}
${contribute}
## Tests
    ${addLineBreaksCode(answers.testIns)}

## Questions
If you have any questions, feel free to contact me through my [GitHub](https://github.com/${answers.user.github}/) or [Email me](mailto:${answers.user.email}).

${credits}

## License
Licensed under the [${answers.license}](./LICENSE.txt) license.

---
This README was created with [Gener8aREADME](https://github.com/kbario/Gener8aREADME).
`;
}



module.exports = generateMarkdown;