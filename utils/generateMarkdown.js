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

${data.title} is a ${data.description.thing} that ${data.description.what}. ${data.description.why}. It is create with ${data.description.how}.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation
${data.installation}
## Usage
${data.usage}
## Credits
${data.contributors}

## Badges

## Features

## How to Contribute

## Tests
## License
Licensed under the [${data.license}](LICENSE.txt) license.
`;
}

module.exports = generateMarkdown;