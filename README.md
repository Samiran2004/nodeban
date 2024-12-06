# nodeban

    NodeJS Project Setup CLI

1. [Description](#description)
   The NodeJS Project Setup CLI is a command-line tool designed to simplify the process of initializing and scaffolding a new Node.js project. It helps you save time by creating a complete, structured project with a professional folder layout, boilerplate code, and essential dependencies.

2. [Features](#installation)
   Generates a ready-to-use Node.js project structure:
   Folders: src, controllers, models, routes, utils, public, etc.
   Files: .env, README.md, package.json, .gitignore, and more.
   Includes boilerplate code for:
   A basic Express.js server setup.
   Socket.io integration for real-time communication.
   Mongoose connection to MongoDB.
   Automatically installs essential dependencies like express, mongoose, socket.io, and dotenv.
   Adds customizable fields like project name and port in the .env file.
   Supports clean coding practices and modular architecture.
   Includes example routes, controllers, and models to kickstart development.
3. [Installation](#usage)
    To install the CLI globally:

    npm install -g nodejs-project-setup

    After installation, run the following command to create a new Node.js project:

    create-node-project my-new-project

4. [Contributing](#contributing)

| Option    | Description           | Default     |
| --------- | --------------------- | ----------- |
| `DB_HOST` | Database host address | `localhost` |
| `DB_PORT` | Database port         | `3306`      |

![Logo](./assets/html.png)
