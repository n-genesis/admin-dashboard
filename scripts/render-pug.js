import { fileURLToPath } from 'url';
import { writeFileSync } from 'fs';
import path from 'path';
import prettier from 'prettier';
import { renderFile } from 'pug';
import shell from 'shelljs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function compilePugToHtml(filePath) {
    const destPath = filePath.replace(/src\/pug\/\pages/, 'dist').replace(/\.pug$/, '.html');
    const srcPath = path.resolve(__dirname, '../src');


    const destPathDirname = path.dirname(destPath);
    if (!shell.test('-e', destPathDirname)) {
        shell.mkdir('-p', destPathDirname);
    }

    console.info(`### Compiling: ${filePath} to ${destPath}`);

    // Render the Pug file to static HTML files
    const html = renderFile(filePath, {
        doctype: 'html',
        filename: filePath,
        basedir: srcPath,
        pretty:true
    });

    // Prettify the HTML output using Prettier
    const prettified = prettier.format(html, {
        printWidth: 1000,
        tabWidth: 4,
        singleQuote: true,
        proseWrap: 'preserve',
        endOfLine: 'lf',
        parser: 'html',
        htmlWhitespaceSensitivity: 'ignore'
    })
    .then(formatted => writeFileSync(destPath, formatted, 'utf-8'))
    .catch(error => console.error('Error formatting HTML:', error));

};
