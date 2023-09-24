// We require the fs variable here as a constant.
const fs = require("fs");

// We require the inquirer variable here.
const inquirer = require("inquirer");

// We require a markdown JavaScript file at this point.
const generateMarkdown = require("./utils/generateMarkdown");


// License function and the corresponding if/else section are present here.
function getLicense(value) {
    if (value === "GNU AGPLv3") {
        return "[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)";
    } else if (value === "GNU GPLv3") {
        return "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
    } else if (value === "GNU LGPLv3") {
        return "[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)";
    } else if (value === "Apache 2.0") {
        return "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
    } else if (value === "Boost Software 1.0") {
        return "[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)";
    } else if (value === "MIT") {
        return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
    } else {
        return "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)";
    }
}

// check if user enter some value as answer or leave it blank
function validateInput(value) {
    if (value != "") {
        return true;
    } else {
        return "Please answer the question with some kind on input.";
    }
}


const questions = [
// Inquiry about the title.
{
        type: "input",
        name: "title",
        message: "What is the title of your project?",
        validate: validateInput,
    },
// Inquiry regarding the project description.
{
        type: "input",
        name: "description",
        message: "Please enter a description of your project.",
        validate: validateInput,
    },

// Handling the Table of Contents in the markdown.js file.
// Inquiry about the installation process.
{
        type: "input",
        name: "installation",
        message: "Please enter an explanation how to install the software, or commands for the program.",
        validate: validateInput,
    },

// Inquiry about the usage of the project.
{
        type: "input",
        name: "usage",
        message: "Please describe how we can use this program/project.",
        validate: validateInput,
    },

// Inquiry about the project's license.
{
        type: "list",
        name: "license",
        message: "Please select a license for this project.",
        choices: [
            "GNU AGPLv3",
            "GNU GPLv3",
            "GNU LGPLv3",
            "Apache 2.0",
            "Boost Software 1.0",
            "MIT",
            "Mozilla",
        ],
        validate: validateInput,
    },

// Inquiry regarding contributions to the project.
{
        type: "input",
        name: "contributing",
        message: "How can users contribute to your project.",
        validate: validateInput,
    },

// Inquiry about the testing procedures.
{
        type: "input",
        name: "tests",
        message: "Please enter any testing instructions you would like to provide for this project.",
        validate: validateInput,
    },

// Questions related to the GitHub section.
{
        type: "input",
        name: "userName",
        message: "What is your GitHub username?",
        validate: validateInput,
    },

// Questions concerning the email address section.
{
        type: "input",
        name: "userEmail",
        message: "What is your GitHub email address that contributors may contact?",
        validate: function (value) {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
                return true;
            } else {
                return "Not a valid email address. Please enter a valid email address.";
            }
        },
    },
];


// Function for generating the ReadMe content at this location.
function writeToFile(fileName, data) {
    fs.writeFile(fileName, generateMarkdown(data), function (err) {
        if (err) {
            return console.log(err);
        }
    });
}


// Function to initialize the beginning of the questions section.
function init() {
    inquirer.prompt(questions).then((data) => {
        console.log(JSON.stringify(data, null, " "));
        data.getLicense = getLicense(data.license);
        writeToFile("./example/README.md", data);
    });
}

// Call the function to initialize the start of the questions section.
init();