import { fileURLToPath } from 'url';
import shell from 'shelljs';
import path from 'path';
import { compilePugToHtml } from './render-pug.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcPath = path.resolve(__dirname, '../src');

function findPugFilesWithShell(dirPath) {
    // Force a uniform forward-slash layout required by ShellJS path parsing
    const cleanDirPath = dirPath.replace(/\\/g, '/');

    // Verify target path exists to avoid shelljs runtime crashes
    if (!shell.test('-d', cleanDirPath)) {
        console.error(`Directory not found: ${cleanDirPath}`);
        return [];
    }

    // Recursively find all absolute/relative items in the path
    const allItems = shell.find(cleanDirPath);

    // Filter the array for files ending with the target extension
    const pugFiles = allItems.filter((item) => {
        // Ensure it is a file (not a directory named folder.pug) and ends with .pug
        return shell.test('-f', item) && item.endsWith('.pug');
    });

    return pugFiles;
}

const files = findPugFilesWithShell(srcPath);

files.forEach((file) => {
    _processFile(file);
});

function _processFile(filePath) {
    if (!filePath.match(/include/) && !filePath.match(/mixin/) && !filePath.match(/\/pug\/layouts\//) && !filePath.match(/\/pug\/pages\/components\//)) {
        compilePugToHtml(filePath);
    }
}

