#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const readline = require('readline');

// Folder structure for JavaScript project
const jsfolders = [
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

// Folder structure for TypeScript project
const tsfolders = [
  "src",
  "src/controllers",
  "src/models",
  "src/routes",
  "src/utils",
  "src/config",
  "src/types",
  "src/services",
  "src/middlewares",
  "src/routes/public",
  "src/routes/private",
];

// Define the files to create JavaScript project
const jsfiles = [
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
mongoose.set('strictQuery', true);
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

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

// Define the files to create TypeScript project
const tsfiles = [
  {
    name: ".env",
    content: "",
  },
  {
    name: "package.json",
    content: (projectName) =>
      JSON.stringify(
        {
          name: projectName,
          version: "1.0.0",
          main: "src/index.ts",
          scripts: {
            start: "nodemon src/index.ts",
            build: "tsc -p .",
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
          devDependencies: {
            "@types/express": "^4.17.12",
            "@types/mongoose": "^5.11.97",
            "@types/body-parser": "^1.19.0",
            "@types/cors": "^2.8.12",
            "@types/socket.io": "^2.1.14",
            "@types/node": "^16.7.13",
            typescript: "^4.4.3",
          },
        },
        null,
        2
      ),
  },
  {
    name: "tsconfig.json",
    content: JSON.stringify(
      {
        compilerOptions: {
          target: "es6",
          module: "commonjs",
          outDir: "./dist",
          rootDir: "./src",
          strict: true,
          esModuleInterop: true,
        },
        include: ["src/**/*.ts"],
        exclude: ["node_modules"],
      },
      null,
      2
    ),
  },
  {
    name: "README.md",
    content: "# New Project\n\nGenerated with nodejs-project-setup.",
  },
  {
    name: ".gitignore",
    content: "node_modules/\n.env\n",
  },
  {
    name: "src/index.ts",
    content: `import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(\`Server is running on http://localhost:\${PORT}\`);
});`,
  },
];

// Function to create the folder and file structure
function createStructure(basePath, isTypescript) {
  const projectName = path.basename(basePath);
  const folders = isTypescript ? tsfolders : jsfolders;
  const files = isTypescript ? tsfiles : jsfiles;

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

// Prompt user for language choice
const rlInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rlInterface.question("Do you want to create a JavaScript or TypeScript project? (js/ts): ", (answer) => {
  const isTypeScript = answer.toLowerCase() === "ts";
  createStructure(path.resolve(projectPath), isTypeScript);
  rlInterface.close();
  console.log(`Project setup completed at ${path.resolve(projectPath)}.`);
});