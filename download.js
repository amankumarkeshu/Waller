const request = require('request');
const fs = require('fs');
const path = require('path');

const downloadFromURL = (uri, filename) => {
    const filePath = path.join(__dirname, 'images', filename);
    return new Promise((resolve, reject) => {
        request
        .get(uri)
        .on('error', (err) => {
            return reject(err);
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

