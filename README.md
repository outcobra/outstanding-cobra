# Outstanding Cobra

[![Build Status](https://ci.pegnu.cloud/buildStatus/icon?job=outcobra/outstanding-cobra/develop)](https://ci.pegnu.cloud/job/outcobra/job/outstanding-cobra/job/develop/)
[![codebeat badge](https://codebeat.co/badges/d8dd9a81-a229-46e3-b5b2-d016ca70cfa4)](https://codebeat.co/projects/github-com-outcobra-outstanding-cobra)

# Installation

This installation is written for Windows and Ubuntu (14.04 and above).

## Backend

Gradle is our project and dependency management tool for the backend.

You do not need to install Gradle yourself since we are using the Gradle wrapper in this project.

Before you can build the project, you need to go to `backend/src/main/resources` and copy `auth0.example.yml` to `auth0.yml`.  In this file, `auth0.clientSecret` needs to be set. If you are building for production, you will get this from [Joel](https://github.com/jmesserli), otherwise you will have to create your own Auth0 account and update all values according to the app you create there.

If you are using IntelliJ, you will also have to set up annotation processing. For this, open the settings (`CTRL + ALT + S`) and navigate to `Build, Execution, Deployment > Compiler > Annotation Processors`. You should see the modules `backend_main` and `backend-model_main` there. Click each one and select `Module content root` for `Store generated sources relative to:`. Also make sure that the `Production sources directory` is set to `generated` for both of them.

To build the project, you can just run `./gradlew build` on Linux or `gradlew.bat build` on Windows. You might need to adjust the file permissions on Linux using `chmod +x gradlew`.

To run the backend you have to make a new run configuration.
In IntelliJ you can add a run configuration by pressing `CTRL + SHIFT + A` and typing `Edit Run Configurations`.
To add a configuration press the green plus. Then search for `Spring Boot`, set the main class to `outcobra.server.OutstandingCobraServerApplicationKt` and use `-Dspring.profiles.active=development` as vm options (this enables the development profile).

Now you should be finished so press `Apply` and try to start the Application.
 

### Accessing API-Documentation

We are automatically generating Swagger 2 api specifications.

You can reach the api specification at `/v2/api-docs` and at `/swagger-ui.html` you'll find a nice UI to explore the api with and test requests.

## Frontend

Like quite every web frontend project we are using nodejs to manage our packages.

So you need to have nodejs installed on your system.
Install the `nodejs` and `nodejs-legacy` package with the package manager on Linux.
On windows you can download the installer from the [nodejs](https://nodejs.org/en/download/current/) website.

To manage your local and global packages you need to have a package manager installed.
Either you use npm or yarn, we recommend to use yarn because it is much faster than npm.

### Install npm

**Linux:**
To install npm run `sudo apt-get install npm`
Check the installation with `npm -v`

**Windows:**
If you have installed node correctly then npm should be installed too.
Check the installation by running `npm -v` in the cmd.

If the command npm is not recognized rerun the nodejs installer and make sure that you install npm.

### Install yarn

**Linux:**

To install yarn on linux you have to configure [a specific repository and pgp key](https://yarnpkg.com/en/docs/install#linux-tab).
Then you can run `sudo apt-get update && sudo apt-get install yarn`

To check the installation you can run `yarn version`.

**Windows:**

Since you have npm installed through NodeJs anyway, you could just run `npm i -g yarn` or follow this guide:
Download the yarn installer [here](https://yarnpkg.com/en/docs/install).
Then follow the instructions in the installer and run the following command to make yarn globally available in the console.
`set PATH=%PATH%;C:\.yarn\bin`
Probably you have to adjust the installation location in the above command.

In the end test the installation with: `yarn --version`

### Angular Project and Angular CLI

We really recommend to install the angular-cli globally so you can easily access the cli commands from everywhere.
So run `sudo npm install angular-cli -g` or `sudo yarn global add angular-cli`

Change now to the frontend directory of the project.
It is essential that you run the following commands in the same directory as where the package.json file is located.
To install all the packages from package.json run either `npm install` or `yarn`.
After that a new folder called node_modules should appear.

We use the [Angular CLI](cli.angular.io) as our build, test, lint and serving tool.
You can find the whole documentation on their [GitHub](https://github.com/angular/angular-cli) page.

To start using the Angular CLI in this project you need to run `ng init` in the **frontend** folder.
This is only necessary when you clone this repository.

The you can run `ng serve` and visit the application in the browser on `localhost:4200`.
You can also enable the production version with `ng serve -prod`.

For more detailed information on the CLI visit their [GitHub](https://github.com/angular/angular-cli) page, go to the README.md in the frontend project or just ask Mario Kunz (mario99.kunz@gmail.com).

