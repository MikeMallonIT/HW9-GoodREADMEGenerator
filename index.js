// TODO: Include packages needed for this application
const fs = require('fs');
var inquirer = require('inquirer');

// TODO: Create an array of questions for user input
const questions = [
    
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of this application?',
    },
    {
        type: 'input',
        name: 'description',
        message: 'Provide a brief description if this application:',
    },
    {
        type: 'input',
        name: 'installInstructions',
        message: "How will the end user install this application?",
    },
    {
        type: 'input',
        name: 'usageInfo',
        message: 'How and when will the end user interact this application?'
    },
    {
        type: 'input',
        name: 'controbutionGuidelines',
        message: 'Please provide a description of the controbution guidelines for this application:',
    },
    {
        type: 'input',
        name: 'testInstructions',
        message: 'How would the end user test this application?',
    },
    {
        type: 'list',
        message: 'Please select a license for this application:',
        name: 'licences',
        choices: ['Public Domain', 'Permissive', 'Copyleft', 'Proprietary'],
    },
    {
        type: 'input',
        name: 'gitHub',
        message: 'What is your GitHub username?',
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your email address?',
    }
];
// TODO: Create a function to write README file
function writeToFile(filename, data) {

    let output = `
# ${data.title}   ![](${badge(data.licences)})
<br>    
    
# Table of Contents 
- [Description](#description)
- [Installation](#installation-instructions)
- [Usage](#usage-information)
- [Controbution](#controbution-guidelines)
- [Testing](#test-instructions)
- [Licencing](#licence-information)
- [Questions](#questions)
<br>
<br>

# Description: 
${data.description}
<br>
<br>


## Installation Instructions: 
${data.installInstructions}
<br>

## Usage Information: 
${data.usageInfo}
<br>

## Controbution Guidelines: 
${data.controbutionGuidelines}
<br>

## Test Instructions:
${data.testInstructions}
<br>

## Licence Information:   ![](${badge(data.licences)})
${info(data.licences)}
<br>
<br>
<br>

# Questions
Find us on GitHub: [${data.gitHub}](https://github.com/${data.gitHub}/)    
Or if you have any further questions, send us an email at: [${data.email}](mailto:${data.email})
`;

    fs.writeFile(filename, output, (err) =>
        err ? console.log(err) : console.log("File Saved!")
);
}

function badge(licences){

    let badge = "";

    switch (licences) {
        case "Public Domain":
          badge = "https://img.shields.io/badge/Public-Domain-green";
          break;
        case "Permissive":
           badge = "https://img.shields.io/badge/-Permissive-yellow";
          break;
        case "Copyleft":
          badge = "https://img.shields.io/badge/Copy-left-orange";
          break;
        case "Proprietary":
          badge = "https://img.shields.io/badge/-Proprietary-red";
          break;
        default:
            console.log("Badge error")
      }

    return badge;
}

function info(licences){
    
    const descriptions = [
        "Grants all rights",
        "Grants use rights, including right to relicense (allows proprietization, license compatibility)",
        "Grants use rights, forbids proprietization",
        "Traditional use of copyright; no rights need be granted"
    ];

    let info = "";

    switch (licences) {
        case "Public Domain":
          info = descriptions[0];
          break;
        case "Permissive":
            info = descriptions[1];
          break;
        case "Copyleft":
            info = descriptions[2];
          break;
        case "Proprietary":
            info = descriptions[3];
          break;
        default:
            console.log("Licence info error")
      }   

    return info;
}

// TODO: Create a function to initialize app
function init() {
    inquirer
        .prompt(questions)

        .then((data) => {
            const filename = `${data.title.toLowerCase().split(' ').join('')}.md`;

            writeToFile(filename, data);
        });
}

// Function call to initialize app
init();

