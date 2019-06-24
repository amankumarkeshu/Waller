'use strict';

const inquirer = require('inquirer');
const open = require('open');
const crypto = require('crypto');
const { downloadFromURL, getContentHeader } = require('./download');
const { setWallpaper } = require('./exec');
const { isURL, isDataURI } = require('validator');

const downloadAndSave = (imgurl, mime) => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'imgopt',
                message: 'Wallpaper options',
                choices: ['1. Download only', '2. Download and Preview', '3. Preview only'],
                default: '1. Download only',
                filter: function (val) {
                    return Number(val[0]);
                }
            }
        ])
        .then(answers => {
            if (answers.imgopt === 3) {
                (async () => {
                    await open(imgurl);
                })();
            } else {
                let mimeType = mime || 'jpg';
                crypto.randomBytes(5, (err, buffer) => {
                    if (err) {
                        return console.log("Some error occured");
                    }
                    let imgName = `${buffer.toString('hex')}.${mimeType}`;
                    downloadFromURL(imgurl, imgName)
                        .then((res) => {
                            console.log(res);
                            if (answers.imgopt === 1) {
                                setWallpaper(imgName);
                            } else {
                                (async () => {
                                    await open(`images/${imgName}`);
                                })();
                                setWallpaper(imgName);
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                });
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

const randomUrlDownload = (imgurl) => {
    imgurl = imgurl.toString().trim();
    switch (true) {
        case isURL(imgurl):
            getContentHeader(imgurl)
                .then((res) => {
                    let header = res.header, mimeObj = res.mimeObj;
                    if (!header && !mimeObj) {
                        console.log(`Provided URL doesn't support images`);
                    } else if (header && !mimeObj) {
                        if (header.substr(0, 5) !== 'image') {
                            inquirer
                                .prompt([
                                    {
                                        type: 'confirm',
                                        name: 'userConfirm',
                                        message: `Given URL isn't a image, Do you still want to download?`,
                                        default: false
                                    }
                                ])
                                .then(answers => {
                                    if (answers.userConfirm === true) {
                                        downloadAndSave(imgurl, undefined);
                                    } else {
                                        console.log('Image not downloaded');
                                    }
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                        } else {
                            inquirer
                                .prompt([
                                    {
                                        type: 'confirm',
                                        name: 'userConfirm',
                                        message: `Given URL may not be an image, Do you still want to download?`,
                                        default: false
                                    }
                                ])
                                .then(answers => {
                                    if (answers.userConfirm === true) {
                                        downloadAndSave(imgurl, undefined);
                                    } else {
                                        console.log('Image not downloaded');
                                    }
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                        }
                    } else if (!header && mimeObj) {
                        if (mimeObj.mime.toString().substr(0, 5) === 'image') {
                            downloadAndSave(imgurl, mimeObj.ext.toString());
                        } else {
                            console.log(`Provided URL isn't a proper image type`);
                        }
                    } else {
                        if (header.substr(0, 5) === 'image' || (mimeObj.mime.toString().substr(0, 5) === 'image')) {
                            downloadAndSave(imgurl, mimeObj.ext.toString() || undefined);
                        } else {
                            console.log(`Provided URL isn't a proper image type`);
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
            break;
        case isDataURI(imgurl):
            console.log("A data url");
            break;
        default:
            console.log("Not supported");
    }
}

module.exports = {
    downloadAndSave,
    randomUrlDownload
}