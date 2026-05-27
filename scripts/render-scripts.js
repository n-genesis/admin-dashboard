'use strict';
import {fileURLToPath} from 'url';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import shelljs from 'shelljs';
import pkg  from '../package.json' with { type: 'json' };
const { version, name, homepage, author, license } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function renderScripts() {

    const sourcePath = path.resolve(__filename, '../../src/js');
    const destPath = path.resolve(__filename, '../../dist/.');
    
    shelljs.cp('-R', sourcePath, destPath)

    const sourceBundlePath = path.resolve(__dirname, '../node_modules', 'bootstrap/dist/js', 'bootstrap.bundle.min.js');
    const destBundlePath = path.resolve(__dirname, '../dist/js/bootstrap.bundle.min.js');

    shelljs.cp('-R', sourceBundlePath, destBundlePath);

    const sourcePathScriptsJS = path.resolve(__filename, '../../src/js/main.js');
    const destPathScriptsJS = path.resolve(__filename, '../../dist/js/main.js');
    
    const copyright = `/*!
* @file main.js - Main script for the N-Gen Admin Dashboard.
* @author ${author.name} <${author.url}>
* @copyright Copyright (c) ${new Date().getFullYear()} ${author.name}. All rights reserved.
* @license ${license}
*/\n`;

    const scriptsJS = readFileSync(sourcePathScriptsJS);
    
    writeFileSync(destPathScriptsJS, copyright + scriptsJS);
};