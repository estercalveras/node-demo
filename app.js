const express = require('express');
require('dotenv').config();
const fs = require('fs');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 8080;


app
    .route('/')
    .get((req, res) => res.send('this is a GET'))
    .post((req, res) => res.send('this is a POST'))
    .put((req, res) => res.send('this is a PUT'));

app.get('/user', (req, res) => {
    const user = {
        first_name: "John",
        last_name: "Doe",
        email: "jdoe@gmail.com"
    };
    res.json(user);
});

app.get('/file', (req, res) => {
    res.sendFile('/Users/esterc/Desktop/nodejs-demo/files/index.html');
});

app.get('/html-file', (req, res) => {
    res.redirect('/file');
});


app.get('/download', (req, res) => {
    res.download('/Users/esterc/Desktop/nodejs-demo/files/index.html');
});


// http://localhost:8080/create-file/File4?content=my-content


app.get('/create-file/:fileName', (req, res) => {

    const fileName = req.params.fileName;
    const content = req.query.content;

    const filePath = path.join(__dirname, 'files', `${fileName}.txt`);

    fs.writeFile(filePath, content, (err) => {
        if(err) {
            console.log('Failed to create: ', err);
            return res.status(500).send('Failed to create');
        }
    });

    res.download(filePath);
});
    
    
app.listen(PORT, () => console.log(`Server listening on port http://localhost:${PORT}`));
    
    
    
    // app.get('/', (req, res) => res.send('method is GET and url/path/endopoint is /'));
    // app.post('/', (req, res) => res.send('method is POST and url/path/endopoint is /'));
    // app.put('/', (req, res) => res.send('method is PUT and url/path/endopoint is /'));
    // app.delete('/', (req, res) => res.send('method is DELETE and url/path/endopoint is /'));
    
    
// const requestListener = function (req, res) {

//     console.log('URL', req.url);
//     console.log('method', req.method);

//     let message;

//     req.method ===  'GET' ? message = 'The method is GET' : req.method ===  'POST' ?  message = 'The method is POST' :  message = 'The method is neither a GET or a POST'

//     res.writeHead(200);
//     res.end(message);
// }


// const server = http.createServer(requestListener);


// server.listen(8080);