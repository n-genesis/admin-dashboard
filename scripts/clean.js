import { fileURLToPath } from 'url';
import shelljs from 'shelljs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const destPath = path.resolve(__dirname, '../dist');

// Read folder contents and map to absolute/relative paths
const targets = shelljs.ls(destPath).map(file => path.join(destPath, file));

console.info(`### Cleaning dist directory: ${destPath}`);

shelljs.rm('-rf', targets);

