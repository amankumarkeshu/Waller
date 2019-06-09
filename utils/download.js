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
                var len = parseInt(res.headers['content-length'], 10);
                console.log();
                var bar = new ProgressBar(`${chalk.green('Downloading image')} [:bar] :rate/bps :percent :etas`, {
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

