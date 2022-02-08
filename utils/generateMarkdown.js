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
    
    #### What?
    ${data.title} is a ${data.description.thing} ${data.description.what}. 
    #### Why?
    ${data.description.why}. 
    #### How?
    ${data.description.how}.
    
    ## Table of Contents
    
    - [Installation](#installation)
    - [Usage](#usage)
    - [Credits](#credits)
    - [Contribute](#contribute)
    - [License](#license)
    
    ## Installation
    ${data.title} can be installed from ${data.installation.platform} using the following code:
    \```
    ${data.installation.code}
    \```
    ## Usage
    ${data.usage}
    ## Credits
    ### Contributors
    ### Tutorials used
    ### Third-Party Assets
    ${data.credits.contributors}
    
    ## Features
    
    ## How to Contribute
    [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)
    
    ## Tests
    ## License
    Licensed under the [${data.license}](LICENSE.txt) license.
`;
}

module.exports = generateMarkdown;