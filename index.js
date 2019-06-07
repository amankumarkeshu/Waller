'use strict';

const Unsplash = require('unsplash-js').default;
const { toJson } = require('unsplash-js');
const { applicationId, secret, callbackUrl, bearerToken } = require('./config');
const unsplash = new Unsplash({
    applicationId,
    secret,
    callbackUrl,
    bearerToken
});
const { downloadFromURL } = require('./download');

var searchPhoto = (input, page_no) => {
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

var searchCollection = (input, page_no) => {
    return new Promise((resolve, reject) => {
        unsplash.search.collections(input, page_no, 1)
            .then(toJson)
            .then((res) => {
                if (res.errors) {
                    return Promise.reject(res.errors[0]);
                }
                if (!res["total"]) {
                    return Promise.reject("Required keyword has no collections");
                }
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            })
    });
}

var searchDownload = (input, option, callback) => {
    if (option === 'collection') {
        searchCollection(input, 1)
            .then((res) => {
                const resultLen = res["total"];
                var imgno = Math.floor(Math.random() * resultLen);
                if (imgno === 0 && resultLen) {
                    imgno += 1;
                }
                const url = res["results"][0]["cover_photo"]["urls"]["full"];
                const imgName = res["results"][0]["id"];
                console.log(url);
                downloadFromURL(url, imgName)
            })
            .catch((err) => {
                callback(err);
            })
    } else {
        searchPhoto(input, 1)
            .then((res) => {
                const resultLen = res["total"];
                var imgno = Math.floor(Math.random() * resultLen);
                if (imgno === 0 && resultLen) {
                    imgno += 1;
                }
                searchPhoto(input, imgno)
                    .then((res) => {
                        const url = res["results"][0]["urls"]["full"];
                        const imgName = res["results"][0]["id"];
                        console.log(url);
                        downloadFromURL(url, imgName)
                    })
                    .catch((err) => {
                        callback(err);
                    })
            })
            .catch((err) => {
                callback(err);
            })
    }
}

module.exports = {
    searchDownload
}