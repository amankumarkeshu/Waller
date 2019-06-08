#!/usr/bin/env node
'use strict';

const program = require('commander');
const inquirer = require('inquirer');
const fs = require('fs');
const { heavyLift } = require('./main');

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
        let inp = keyword.toString().trim().toLowerCase();
        let opt = (cmd.collection ? 'collection' : 'photo');
        heavyLift(inp, opt);
    });

program
    .command('random')
    .alias('r')
    .description('Set a Random wallpaper')
    .action(() => {
        fs.readFile('preferences.txt', function (err, data) {
            if (err) {
                return heavyLift('wallpaper', 'photo');
            }
            var lines = data.toString().split('\n');
            var keyName = lines[Math.floor(Math.random() * lines.length)] || 'wallpaper';
            heavyLift(keyName, 'photo');
        })
    });

program
    .command('config')
    .description('Set Unsplash API token. More information available at https://api.unsplash.com')
    .action(() => {
        // Ask if user has token or not and decide accordingly (later)
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
            })
            .catch((err) => {
                console.log(err);
            });
    });

program.parse(process.argv);