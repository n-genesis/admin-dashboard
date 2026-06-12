import { each } from 'lodash-es';
import { watch } from 'chokidar';
import path from 'path';
import { fileURLToPath } from 'url';
// import renderAssets from './render-assets.js';
import { compilePugToHtml } from './render-pug.js';
// import renderScripts from './render-scripts.js';
import { renderSCSS } from './render-scss.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const watcher = watch('src', {
    persistent: true,
});

let READY = false;

process.title = 'pug-watch';
process.stdout.write('Loading\n');
let allPugFiles = {};

watcher.on('add', filePath => _processFile(filePath, 'add'));
watcher.on('change', filePath => _processFile(filePath, 'change'));
watcher.on('ready', () => {
    READY = true;
    console.log('\nN-GEN ADMIN READY!');
});

_handleSCSS();

function _processFile(rawPath, watchEvent) {

    // Force forward slashes locally for robust regex and string matching
    const filePath = rawPath.replace(/\\/g, '/');

    if (!READY) {
        if (filePath.match(/\.pug$/)) {
            // Match layouts, mixins, or includes regardless of slash type
            if (!filePath.match(/includes|mixins|[/\\]pug[/\\]layouts[/\\]|[/\\]pug[/\\]components[/\\]/)) {
                allPugFiles[filePath] = true;
            }
        }
        process.stdout.write('.');
        return;
    }

    if (filePath.match(/\.pug$/)) {
        return _handlePug(filePath, watchEvent);
    }

    if (filePath.match(/\.scss$/)) {
        if (watchEvent === 'change') {
            return _handleSCSS(filePath, watchEvent);
        }
        return;
    }

    // if (filePath.match(/src\/js\//)) {
    //     return renderScripts();
    // }

    if (filePath.match(/src\/assets\//)) {
        return renderAssets();
    }

}

function _handlePug(filePath, watchEvent) {
    const destPath = filePath.replace('src/pug/pages', 'dist').replace(/\.pug$/, '.html');

    if (watchEvent === 'change') {
        if (filePath.match(/includes|mixins|\/pug\/layouts\/|\/pug\/pages\//)) {
            return _renderAllPug();
        }
        // return compilePugToHtml(filePath);
    }

}

function _renderAllPug() {
    console.info('### INFO: Rendering All');
    each(allPugFiles, (value, filePath) => {
        if (!filePath.match(/include/) && !filePath.match(/mixin/) && !filePath.match(/\/pug\/layouts\//) && !filePath.match(/\/pug\/pages\/components\//)) {
            compilePugToHtml(filePath);
        }
    });
}

function _handleSCSS() {
    renderSCSS();
}