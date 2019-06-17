#!/usr/bin/env node
'use strict';

const program = require('commander');
const inquirer = require('inquirer');
const fs = require('fs');
const config = require('./config.json');
const { heavyLift, randomUrlDownload } = require('./utils/main');

program
    .version('0.0.1')
    .description('Desktop Wallpaper Utility');

program
    .command('url [imgurl]')
    .alias('u')
    .description('Add image from url( Wrap in double quotes )')
    .action((imgurl) => {
        randomUrlDownload(imgurl);
    });

program
    .command('key [keyword]')
    .alias('k')
    // .option('-c, --collection', 'Search from collection')
    .description('Get Image with given keyword')
    .action((keyword, cmd) => {
        // collection option not implemented yet
        let inp = keyword.toString().trim().toLowerCase();
        // let opt = (cmd.collection ? 'collection' : 'photo');
        let opt = 'photo';
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
    .description('Set Unsplash API token. Visit https://unsplash.com/documentation#user-authentication')
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
                let token = answers.token.toString().trim();
                if (!token) {
                    return;
                }
                config.bearerToken = answers.token;
                var json = JSON.stringify(config);
                fs.writeFile('config.json', json, (err) => {
                    if (err) {
                        return console.log(err);
                    }
                });
            })
            .catch((err) => {
                console.log(err);
            });
    });

program.parse(process.argv);