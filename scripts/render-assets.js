'use strict';
import {fileURLToPath} from 'url';
import path from 'path';
import shelljs from 'shelljs';

const __filename = fileURLToPath(import.meta.url);

export function renderAssets() {
    const sourcePath = path.resolve(__filename, '../../src/assets');
    const destPath = path.resolve(__filename, '../../dist/.');
    
    shelljs.cp('-R', sourcePath, destPath)
};