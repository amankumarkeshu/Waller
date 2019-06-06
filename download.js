const request = require('request');
const fs = require('fs');

const downloadFromURL = (uri, filename, callback) => {
    console.log(uri);
    request(uri)
        .pipe(fs.createWriteStream(filename))
        .on('close', callback);
};

module.exports = {
    downloadFromURL
}

