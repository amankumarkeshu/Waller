'use strict';

const { exec } = require('child_process');
const path = require('path');

const setWallpaper = (imgName) => {
    const uri = path.join(__dirname, '..', 'images', imgName);
    exec(`gsettings set org.gnome.desktop.background picture-uri file:///${uri}`, (err, stdout, stderr) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("Image set as wallpaper");
    });
}

module.exports = {
    setWallpaper
}
