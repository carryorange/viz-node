const fs = require('fs');
const FormData = require('form-data');

const port = 8080;
let recursive = false;
let monitored_file = 'dist/temp/dummy-graph.json';

let watcher_options = {
    recursive,};

let listener = (evt, filename) => {
    console.log(`evt=${evt}, filename=${filename}`);
    // upload the file
    const form = new FormData();
    form.append('my_file', fs.createReadStream(monitored_file));
    form.submit(`http://localhost:${port}/api/upload`, (err, res) => {
        res.resume();
    })
}

let fs_watcher = fs.watch(monitored_file, watcher_options, listener);