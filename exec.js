const { exec } = require('child_process');
const path = '/home/sanskar/Desktop/IET-Website/public/images/hero_2.jpg';
exec(`gsettings set org.gnome.desktop.background picture-uri file:///${path}`, (err, stdout, stderr) => {
    if (err) {
        console.log(err);
        return;
    }
    // the *entire* stdout and stderr (buffered)
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
});
