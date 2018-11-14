#!/usr/bin/env node
const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const shell = require("shelljs");
const fs = require('fs');


const init = () => {
    console.log(
        chalk.green(
            figlet.textSync("AD React Init", {
                font: "Ghost",
                horizontalLayout: "default",
                verticalLayout: "default"
            })
        )
    );
};

const askQuestions = () => {
    const questions = [
        {
            name: "PROJECTNAME",
            type: "input",
            message: "Enter Project Name"
        }
    ];
    return inquirer.prompt(questions);
};

const excecuteCRA = (projectName) => {
    console.log("Creating a new project");
    const cra = JSON.parse(shell.exec("npm ls -g --depth=0 create-react-app --json", {silent: true}).stdout);
    if (!(cra.dependencies && cra.dependencies['create-react-app'])) {
        console.log("Installing packages. This might take a couple of minutes.");
        shell.exec(`npm i -g create-react-app}`, {async: false});
    }
    shell.exec(`create-react-app ${projectName}`, {async: false});
};

const updateAppJS = (projectName) => {
    const path = `${projectName}/src/index.js`;
    let x = fs.readFileSync(path).toString();

    let imports = "import {Provider} from 'react-redux';\n" +
        "import {BrowserRouter} from 'react-router-dom';\n" +
        "import {configureStore} from \"./redux/configureStore\";\n" +
        "\n" +
        "const store = configureStore();\n";

    let lines = x.split("\n");

    for (let i = 0; i < lines.length; i++) {
        if (lines[i].length === 0) {
            x = lines.slice(0, i + 1).join("\n") + imports + lines.slice(i, lines.length).join("\n");
            break;
        }
    }

    x = x.replace('<App />',
        '<Provider store={store}>\n' +
        '        <BrowserRouter>\n' +
        '            <App />\n' +
        '        </BrowserRouter>\n' +
        '    </Provider>');

    fs.writeFile(path, x, (err) => {
        if (err) throw err;
    });
};

const copyAndRemovePackage = (projectName) => {
    console.log(__dirname);
    shell.cp('-Rf', [`${__dirname}/lib/*`], `${projectName}/src`);
    shell.rm(`${projectName}/src/logo.svg`);
};

const installDependency = (projectName) => {
    console.log("Installing Dependency....");
    const dependency = 'redux react-redux react-router-dom';
    process.chdir(projectName);
    shell.exec(`npm i --save ${dependency}`, {async: false});
};

const build = (projectName) => {

    //Update index js to implement redux and react router
    updateAppJS(projectName);

    //copy redux files and test components
    copyAndRemovePackage(projectName);

    //install redux, react router dependency
    installDependency(projectName);
};

const success = (projectName) => {
    console.log(
        chalk.white.bgGreen.bold(`${projectName} Created! Happy Coding!`)
    );
};

const run = async () => {
    // show script introduction
    init();

    // ask questions
    const answers = await askQuestions();
    const {PROJECTNAME} = answers;

    // create app using create react app
    excecuteCRA(PROJECTNAME);

    //build customized project
    build(PROJECTNAME);

    // show success message
    success(PROJECTNAME);
};

run();