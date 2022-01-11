const express = require('express'),
    cors = require('cors'),
    multer = require('multer'),
    bodyParser = require('body-parser');
var fs = require('fs');
const PATH = './uploads';

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file);
        cb(null, PATH);
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, file.fieldname + '-' + Date.now())
    }
});

let upload = multer({
    storage: storage
});

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.post('/api/upload', upload.array('uploas'), function (req, res) {
    console.log(req.body);
    if (!req.file)
    {
        console.log("No file is available!");
        return res.send({
            success: false
        });

    } else
    {
        console.log('File is available!');
        return res.send({
            success: true
        })
    }
});
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log('Connected to port ' + PORT)
})