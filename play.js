const { downloadFromURL } = require('./download');

downloadFromURL('htt:goog', 'thisiserror.jpg')
.then((res) => {
    console.log(res);
})
.catch((err) => {
    console.log("Hush error catched");
})