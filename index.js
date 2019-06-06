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

// console.log(unsplash);

unsplash.search.collections("wallpaper", 1, 1)
    .then(toJson)
    .then(res => {
        const url = res["results"][0]["cover_photo"]["urls"]["full"];
        console.log(url);
        downloadFromURL(url, "wall-1.jpg", () => {
            console.log("Image downloaded");
        });
        // unsplash.photos.downloadPhoto(res["results"][0]);
    })
    .catch(err => {
        console.log(err);
    })