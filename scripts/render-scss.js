import { existsSync, mkdirSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { compile } from 'sass';
import pkg from '../package.json' with { type: 'json' };
const { version, name, homepage, author, license } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const destinationDir = path.resolve(__dirname, '../dist/css'); // Your desired output directory

// Ensure the destination directory exists
if (!existsSync(destinationDir)) {
    mkdirSync(destinationDir, { recursive: true });
}


export function renderSCSS() {
    const sourcePath = path.resolve(__dirname, '../src/scss', 'custom.scss');
    const outputCssFile = path.join(destinationDir, 'bootstrap.css');

    try {
        // Silence specific deprecation warnings related to SASS features
        const resultBoot = compile(sourcePath, {
            loadPaths: ['node_modules'],
            style: 'expanded', // or 'compressed', 'compact', 'nested'
            silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'if-function'],
        });

        writeFileSync(outputCssFile, resultBoot.css.toString());

        console.log(`Bootstrap CSS successfully compiled and saved to: ${outputCssFile}`);

    } catch (error) {
        console.error('Error compiling Bootstrap SASS:', error);
    }

    // Stylesheet path and destination path for compiled CSS file
    const stylesPath = path.join(__dirname, '../src/scss', 'styles.scss');
    const destPath = path.resolve(__dirname, '../dist/css/styles.css');
    
    try {
        const result = compile(stylesPath, {
            style: 'expanded' // or 'compressed', 'compact', 'nested'
        });
        writeFileSync(destPath, bannerComment + result.css.toString());
        console.log(`Main CSS successfully compiled and saved to: ${destPath}`);
    } catch (error2) {
        console.error('Error compiling Main SASS:', error2);
    }

};

const bannerComment = `/*!
 * @project   ${name}
 * @version   ${version}
 * @author    ${author.name} (${author.url})
 * @license   ${license}
 * @see  ${homepage}
 *
 * Copyright (c) ${new Date().getFullYear()} ${author.name}. All rights reserved.
 */\n`;