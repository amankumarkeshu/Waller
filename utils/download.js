'use strict';

const request = require('request');
const fs = require('fs');
const path = require('path');
const ProgressBar = require('progress');
const chalk = require('chalk');

const downloadFromURL = (uri, filename) => {
    const filePath = path.join(__dirname, '..', 'images', filename);
    return new Promise((resolve, reject) => {
        request
            .get(uri)
            .on('error', (err) => {
                return reject(err);
            })
            .on('response', (res) => {
                var len = Math.floor(res.headers['content-length']);
                if(!len) {
                    return reject('Not a valid image URL');
                }
                var bar = new ProgressBar(`${chalk.green('Downloading image')} [:bar] :percent :etas`, {
                    complete: '=',
                    incomplete: ' ',
                    width: 20,
                    total: len
                });

                res.on('data', function (chunk) {
                    bar.tick(chunk.length);
                });

                res.on('end', function () {
                    console.log('\n');
                });
            })
            .pipe(fs.createWriteStream(filePath))
            .on('close', () => {
                return resolve("Image Downloaded");
            });
    });
};

module.exports = {
    downloadFromURL
}

