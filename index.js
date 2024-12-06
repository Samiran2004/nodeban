#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Define the folder structure
const folders = [
    'src',
    'src/controllers',
    'src/models',
    'src/routes',
    'src/utils',
    'public',
    'public/css',
    'public/js',
    'public/images'
];

// Define the files to create
const files = [
    { name: '.env', content: '' },
    {
        name: 'package.json',
        content: (projectName) =>
            JSON.stringify(
                {
                    name: projectName,
                    version: '1.0.0',
                    main: 'src/index.js',
                    scripts: {
                        start: 'node src/index.js'
                    },
                    dependencies: {
                        express: '^4.17.1'
                    }
                },
                null,
                2
            )
    },
    { name: 'README.md', content: '# New Project\n\nGenerated with nodejs-project-setup.' },
    { name: '.gitignore', content: 'node_modules/\n.env\n' },
    { name: 'src/index.js', content: '// Entry point\nconsole.log("Hello, Node.js!");' }
];

// Function to create the folder and file structure
function createStructure(basePath) {
    // Extract project name from the base path
    const projectName = path.basename(basePath);

    // Create folders
    folders.forEach(folder => {
        const folderPath = path.join(basePath, folder);
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
            console.log(`Created folder: ${folderPath}`);
        }
    });

    // Create files
    files.forEach(file => {
        const filePath = path.join(basePath, file.name);
        if (!fs.existsSync(filePath)) {
            const content =
                typeof file.content === 'function' ? file.content(projectName) : file.content;
            fs.writeFileSync(filePath, content);
            console.log(`Created file: ${filePath}`);
        }
    });

    // Install dependencies
    console.log('Installing dependencies...');
    try {
        execSync('npm install', { cwd: basePath, stdio: 'inherit' });
        console.log('Dependencies installed successfully!');
    } catch (error) {
        console.error('Error installing dependencies:', error);
    }
}

// Get the project path from the command-line argument
const projectPath = process.argv[2] || '.';

// Create the project structure
createStructure(projectPath);
console.log(`Project setup completed at ${path.resolve(projectPath)}.`);
