import * as formidable from 'formidable'
import * as fs from 'fs'
import * as http from 'http'

const port = 8080;

const server = http.createServer((req, res) => {
    console.log(`url=${req.url}, method=${req.method}`);
    if (req.url === '/api/upload' && req.method.toLowerCase() === 'post') {
        console.log('handling upload')
        const form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            console.log('')
            res.writeHead(200, {'content-type': 'application/json'});
            res.end(JSON.stringify({fields, files}, null, 2));
            
            if (files && files.multipleFiles) {
                let temp_file = files.multipleFiles.path;
                console.log(`file content: ${fs.readFileSync(temp_file)}`)
                fs.unlinkSync(temp_file);
            }
            else if (files && files.my_file) {
                let temp_file = files.my_file.path;
                console.log(`file content: ${fs.readFileSync(temp_file)}`)
                fs.unlinkSync(temp_file);
            }
        });
    }
    else if (req.url === '/form') {
        // show a file upload form
        res.writeHead(200, { 'content-type': 'text/html' });
        res.end(`
            <h2>With Node.js <code>"http"</code> module</h2>
            <form action="/api/upload" enctype="multipart/form-data" method="post">
            <div>Text field title: <input type="text" name="title" /></div>
            <div>File: <input type="file" name="multipleFiles" multiple="multiple" /></div>
            <input type="submit" value="Upload" />
            </form>
        `);
    }
    else {
        res.writeHead(404, {'content-type': 'text/plain'});
        res.end('Page not found');
    }
});

server.listen(port, () => {
    console.log(`Server listening on: http://localhost:${port}`);
});