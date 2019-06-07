#!/usr/bin/env node
'use strict';

const program = require('commander');
const inquirer = require('inquirer');
const { downloadFromUrl } = require('./download');
const { searchDownload } = require('./index');

program
    .version('0.0.1')
    .description('Desktop Wallpaper');

program
    .command('url [imgurl]')
    .alias('u')
    .description('Add image from url( HTTP or local )')
    .action((imgurl) => {
        // Check img url
        // is img valid url, file url
        // file exist?
        // is there img at the url
        downloadFromUrl(imgurl)
    });

program
    .command('key [keyword]')
    .alias('k')
    .option('-c, --collection', 'Search from collection')
    .description('Get Image with given keyword')
    .action((keyword, cmd) => {
        var inp = keyword.toString().trim().toLowerCase();
        var opt = (cmd.collection ? 'collection' : 'photo');
        searchDownload(inp, opt, (err) => {
            if (err) {
                return console.log(err);
            }
        });
    });

program
    .command('random')
    .alias('r')
    .description('Get Random Image')
    .action(() => {
        getRandomImg();
    });

program
    .command('config')
    .description('Set Unsplash API token')
    .action(() => {
        // Ask if user has token or not and decide accordingly
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'token',
                    message: 'Bearer Token: '
                }
            ])
            .then(answers => {
                // Token is in answers.token
                console.log(answers);
            });
    });

program.parse(process.argv);


// program
//     .option('-p, --peppers', 'Add peppers')
//     .option('-P, --pineapple', 'Add pineapple')
//     .option('-b, --bbq-sauce', 'Add bbq sauce')
//     .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
//     .parse(process.argv);
// console.log('you ordered a pizza with:');
// if (program.peppers) console.log('  - peppers');
// if (program.pineapple) console.log('  - pineapple');
// if (program.bbqSauce) console.log('  - bbq');
// console.log('  - %s cheese', program.cheese);