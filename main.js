const inquirer = require('inquirer');
const open = require('open');
const { downloadFromURL } = require('./download');
const { searchDownload } = require('./index');
const { setWallpaper } = require('./exec');

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
                    choices: ['Download only', 'Preview and Download'],
                    default: 'Download only',
                    filter: function (val) {
                        if (val[0] === 'D') {
                            return 1;
                        }
                        return 0;
                    }
                }
            ])
            .then(answers => {
                if (answers.imgopt === 0) {
                    (async () => {
                        await open(url);
                    })();
                }
                console.log("Downloading image.....");
                downloadFromURL(url, imgName)
                    .then((res) => {
                        console.log(res);
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

module.exports = {
    heavyLift
}