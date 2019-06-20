'use strict';

const Unsplash = require('unsplash-js').default;
const fs = require('fs');
const { toJson } = require('unsplash-js');
const { bearerToken } = require('./../config.json') || undefined;
const unsplash = new Unsplash({
    bearerToken
});

const searchImage = (input, page_no) => {
    return new Promise((resolve, reject) => {
        unsplash.search.photos(input, page_no, 1)
            .then(toJson)
            .then((res) => {
                if (res.errors) {
                    return reject(res.errors[0]);
                }
                if (!res["total"]) {
                    return reject("Required keyword has no photos");
                }
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            })
    });
}

const searchKey = (input, callback) => {
    if (!bearerToken) {
        return callback(`Please add a Unsplash API token`);
    }
    searchImage(input, 1)
        .then((res) => {
            const resultLen = res["total"];
            let imgno = Math.floor(Math.random() * resultLen);
            if (imgno === 0 && resultLen) {
                imgno += 1;
            }
            searchImage(input, imgno)
                .then((res) => {
                    const url = res["results"][0]["urls"]["full"];
                    fs.appendFile('preferences.txt', input + '\n', function (err) {
                        if (err) return;
                    });
                    callback(undefined, url); // err is undefined
                })
                .catch((err) => {
                    callback(err);
                })
        })
        .catch((err) => {
            callback(err);
        })
}

module.exports = {
    searchKey
}