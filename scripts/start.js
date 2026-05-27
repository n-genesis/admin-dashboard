/**
 * @file start.js
 * @description start.js is the main entry point for the N-Gen Admin build process. It uses concurrently to run both the directory watcher and BrowserSync simultaneously, * allowing for efficient development with live reloading.
 * @author N-Gen Design <ngendesign@email.com>
 * @copyright Copyright (c) 2026 N-Gen Design. All rights reserved.
 * @license MIT
 */

import path from 'path';
import { fileURLToPath } from 'url';
import concurrently from 'concurrently';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const browserSyncPath = path.resolve(__dirname, '../node_modules/.bin/browser-sync');


concurrently([
    { command: 'node scripts/watch.js',
        name: 'dir-watcher', prefixColor: 'bgBlue.bold' },
    { 
        command: `"${browserSyncPath}" --reload-delay 2000 --reload-debounce 2000 dist -w --no-online`,
        name: 'ngen-browser-sync', 
        prefixColor: 'bgBlue.bold',
    }
], {
    prefix: 'N-GEN ADMIN',
    killOthersOn: ['failure', 'success'],
}).result.then(success, failure);

function success() {
    console.log('Success');    
}

function failure() {
    console.error('Failure');
}