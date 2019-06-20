'use strict';

const request = require('request');
const fs = require('fs');
const path = require('path');
const ProgressBar = require('progress');
const chalk = require('chalk');
const fileType = require('file-type');

const getContentHeader = (uri) => {
    return new Promise((resolve, reject) => {
        request({ uri, encoding: null }, (err, res, buffer) => {
            if (err) {
                return reject(err);
            }
            if (res && res.headers && res.headers['content-type']) {
                return resolve({
                    header: res.headers['content-type'].toString(),
                    mimeObj: fileType(buffer)
                });
            }
            return resolve({
                header: undefined, 
                mimeObj: fileType(buffer)
            });
        });
    });
}

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
                if (!len) {
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
    downloadFromURL,
    getContentHeader
}

