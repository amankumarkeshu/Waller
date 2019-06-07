const request = require('request');
const fs = require('fs');

const downloadFromURL = (uri, filename) => {
    console.log(uri);
    request
        .get(uri)
        .on('error', (err) => {
            return console.log(err, "Invalid img");
        })
        .pipe(fs.createWriteStream(filename))
        .on('close', () => {
            console.log("Image downloaded")
        });
};

module.exports = {
    downloadFromURL
}

