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

console.log(unsplash);

unsplash.currentUser.profile()
    .then(toJson)
    .then(json => {
        // Your code
        console.log(json);
    });

// const authenticationUrl = unsplash.auth.getAuthenticationUrl([
//     "public",
//     "read_user",
//     "write_user",
//     "read_photos",
//     "write_photos"
// ]);

// location.assign(authenticationUrl);

// unsplash.auth.userAuthentication(query.code)
//     .then(toJson)
//     .then(json => {
//         unsplash.auth.setBearerToken(json.access_token);
//     });



