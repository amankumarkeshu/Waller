'use strict';

const inquirer = require('inquirer');
const open = require('open');
const crypto = require('crypto');
const { downloadFromURL } = require('./download');
const { searchDownload } = require('./unsplash');
const { setWallpaper } = require('./exec');
const { isURL } = require('validator');

const heavyLift = (inp, opt) => {
    searchDownload(inp, opt, (err, url, imgName) => {
        if (err) {
            return console.log(err);
        }
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'imgopt',
                    message: 'Wallpaper options',
                    choices: ['1. Download only', '2. Download and Preview'],
                    default: 'Download only',
                    filter: function (val) {
                        if (val[0] === '1') {
                            return 1;
                        }
                        return 0;
                    }
                }
            ])
            .then(answers => {
                downloadFromURL(url, imgName)
                    .then((res) => {
                        console.log(res);
                        if (answers.imgopt === 0) {
                            (async () => {
                                await open(`images/${imgName}`);
                            })();
                        }
                        setWallpaper(imgName);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    });
}

const randomUrlDownload = (imgurl) => {
    imgurl = imgurl.toString();
    if (isURL(imgurl)) {
        var mime = 'jpg';
        crypto.randomBytes(5, (err, buffer) => {
            if (err) {
                return console.log("Some error occured");
            }
            var name = `${buffer.toString('hex')}.${mime}`;
            downloadFromURL(imgurl, name)
                .then((res) => {
                    console.log(res);
                    setWallpaper(name);
                })
                .catch((err) => {
                    console.log(err);
                })
        });
    } else {
        console.log("Above image url is not supported");
    }
}

module.exports = {
    heavyLift,
    randomUrlDownload
}