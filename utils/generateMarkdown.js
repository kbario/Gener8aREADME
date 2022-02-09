const answers = {
    user: { githubUsername: 'kbario', email: 'kylebario1@gmail.com' },
    title: 'Gener8aREADME',
    description: "Gener8aREADME is a CLI application that dynamically creates README.md files for open-source projects based on a users input in the command line. It was created to take the guesswork out of making a README. README's are crucial aspects of github repositories, often being the make or break of a project. If your README doesn't describe your project well enough, comes across unprofessional, or does not answer the basic questions for usage, installation, and reporting bugs, people may not use or contribute to your project. Gener8aREADME has a professional template that makes sure all aspects of a good README are covered without you needing to create links and style markdown files. Gener8aREADME was created using JavaScript, Node.js, and the Node.js module 'inquirer'.",
    installation: { code: 'git clone https://github.com/kbario/Gener8aREADME.git' },
    usage: "Once installed on your local machine, open the repo in the command line and type `node index.js`. This begins Gener8aREADME's questions and at the end of the questions, a professional, complete README.md will appear in the thing.",
    credits: {
      contributors: { bool: 'yes' , values: 'kbario, tkimhofer'},
      tutorials: { bool: 'yes', values: 'https://www.youtube.com/c/Fireship' },
      thirdPartyAssets: { bool: 'no' }
    },
    testIns: 'using the test function',
    license: 'MIT'
  };

const trueCreditKeys = Object.keys(answers.credits).filter((item) => {
    return answers.credits[item].bool === 'yes'
})

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

function renderCreditSection(values, github){
    const arr = values.split(",").map(item => item.trim());;
    if (github === 'github'){
        return arrMap = arr.map(user => `- [${user}](https://github.com/${user}/)`);
    } else if (github === 'other'){
        return arrMap = arr.map(link => `- ${link}`)
    };
};

const thing = trueCreditKeys.map((item) => {
    if (item === 'contributors'){
        const list = renderCreditSection(answers.credits[item].values, 'github');
        const listJ = list.join('\n');
        return `\n### Contributors
${listJ}`
    } else if (item === 'tutorials') {  
        const list = renderCreditSection(answers.credits[item].values, 'other');
        const listJ = list.join('\n');
        return `\n### Tutorials
${listJ}`
    } else if (item === 'thirdPartyAssets') {
        const list = renderCreditSection(answers.credits[item].values, 'other');
        const listJ = list.join('\n');
        return `\n### Third-Party Assets
${listJ}`
    }
});



// const markdownValues = renderCreditSection(values, 'github')
// const markdownValues1 = renderCreditSection(values1, 'other')
// console.log(markdownValues)
// console.log(markdownValues1)


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
function generateMarkdown(data) {
    const shield = renderLicenseBadge(data.license)
    return `# ${data.title}
    ![license](${shield})
    ## Description
    ${data.description}
    
    ## Table of Contents
    
    - [Installation](#installation)
    - [Usage](#usage)
    - [Credits](#credits)
    - [Contribute](#contribute)
    - [License](#license)
    
    ## Installation
    ${data.title} can be installed from github using the following code in the command line:

    ${data.installation.code}
    
    ## Usage
    ${data.usage}
    
    ${creditHead}
    ${thing}
    
    ## Features
    
    ## How to Contribute
    [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)
    
    ## Tests
    ## License
    Licensed under the [${data.license}](LICENSE.txt) license.
`;
}



module.exports = generateMarkdown;