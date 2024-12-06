#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Define the folder structure
const folders = [
  "src",
  "src/controllers",
  "src/models",
  "src/routes",
  "src/utils",
  "public",
  "public/css",
  "public/js",
  "public/images",
];

// Define the files to create
const files = [
  { name: ".env", content: "" },
  {
    name: "package.json",
    content: (projectName) =>
      JSON.stringify(
        {
          name: projectName,
          version: "1.0.0",
          main: "src/index.js",
          scripts: {
            start: "nodemon src/index.js",
          },
          dependencies: {
            express: "^4.17.1",
            mongoose: "^6.0.0",
            "body-parser": "^1.19.0",
            cors: "^2.8.5",
            "socket.io": "^4.0.1",
            dotenv: "^10.0.0",
            nodemon: "^3.0.2",
          },
        },
        null,
        2
      ),
  },
  {
    name: "README.md",
    content: "# New Project\n\nGenerated with nodejs-project-setup.",
  },
  { name: ".gitignore", content: "node_modules/\n.env\n" },
  {
    name: "src/index.js",
    content: `const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');


const app = express();
const server = http.createServer(app);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// const apiRouter = require('./route/apiRoute');
// app.use('/api', apiRouter);

const port = process.env.PORT;
const dbDriver = process.env.DBSTRING


let option = {
  auth: {
    username: '',
    password: '',
  },
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(dbDriver, option)
  .then(result => {
    server.listen(port, () => {
      console.log("Server running on port: http://localhost:");
      console.log('Database connected');
    });
  })
  .catch(error => {
    console.error('Error connecting to database:', error);
  });

`,
  },
];

// Function to create the folder and file structure
function createStructure(basePath) {
  // Extract project name from the base path
  const projectName = path.basename(basePath);

  // Create folders
  folders.forEach((folder) => {
    const folderPath = path.join(basePath, folder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log(`Created folder: ${folderPath}`);
    }
  });

  // Create files
  files.forEach((file) => {
    const filePath = path.join(basePath, file.name);
    if (!fs.existsSync(filePath)) {
      const content =
        typeof file.content === "function"
          ? file.content(projectName)
          : file.content;
      fs.writeFileSync(filePath, content);
      console.log(`Created file: ${filePath}`);
    }
  });

  // Install dependencies
  console.log("Installing dependencies...");
  try {
    execSync("npm install", { cwd: basePath, stdio: "inherit" });
    console.log("Dependencies installed successfully!");
  } catch (error) {
    console.error("Error installing dependencies:", error);
  }
}

// Get the project path from the command-line argument
const projectPath = process.argv[2] || ".";

// Create the project structure
createStructure(projectPath);
console.log(`Project setup completed at ${path.resolve(projectPath)}.`);
