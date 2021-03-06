const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let teamList = [];

function createTeam() {
    inquirer.prompt (
        {
            type: "confirm",
            name: "addEmployee",
            message: "Do you wish to enter an employee?"
        }
    ).then(function(response) {
        if(response["addEmployee"]) {
            inquirer.prompt (
            [
                {
                    type: "input",
                    name: "name",
                    message: "What is the employee's name?"
                },
                {
                    type: "input", 
                    name: "id",
                    message: "What is the employees's ID?"
                },
                {
                    type: "input",
                    name: "email",
                    message: "Enter the employee's email address: "
                },
                {
                    type: "list",
                    name: "role",
                    message: "Select the employee's role",
                    choices: ["Manager", "Engineer", "Intern"]
                }
            ]
            ).then(function(answer) {
                if(answer.role === "Manager") {
                    inquirer.prompt (
                        {
                            type: "input",
                            name: "officeNumber",
                            message: "What is the manager's office number?"
                        }
                    ).then(function(numberResponse) {
                        let manager = new Manager(answer.name, answer.id, answer.email, numberResponse.officeNumber);
                        teamList.push(manager);
                        createTeam();
                        
                    });
                } else if(answer.role === "Engineer") {
                    inquirer.prompt (
                        {
                            type: "input",
                            name: "githubName",
                            message: "Enter the engineer's GitHub user name: "
                        }
                    ).then(function(githubResponse) {
                        let engineer = new Engineer(answer.name, answer.id, answer.email, githubResponse.githubName);
                        teamList.push(engineer);
                        createTeam();
                    });
                } else if(answer.role === "Intern") {
                    inquirer.prompt (
                        {
                            type: "input",
                            name: "school",
                            message: "Enter the school attended by the Intern: "
                        }
                    ).then(function(schoolName) {
                        let intern = new Intern(answer.name, answer.id, answer.email, schoolName.school);
                        teamList.push(intern);
                        createTeam();
                    });
                }
            });
        } else {
            if (teamList.length >= 1) {
                fs.writeFile(outputPath, render(teamList), function(err) {
                    if (err) {
                        return Error;
                    };
                });
                        console.log("Successfully created team profile!");

            }
        }
    });
}
createTeam();





// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!

