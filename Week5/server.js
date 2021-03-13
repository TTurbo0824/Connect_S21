var https = require('https');
var fs = require('fs');

var credentials = {
    key: fs.readFileSync('star_itp_io.key'),
    cert: fs.readFileSync('star_itp_io.pem')
};

var datastore = require('nedb');
var db = new datastore({
    filename: 'database.json',
    autoload: true
});

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var multer = require('multer');
var upload = multer({
    dest: 'public/uploads/'
})

var urlencoder = bodyParser.urlencoded({
    extended: true
});

app.use(urlencoder);

app.use(express.static('public'));
app.set('view engine', 'ejs');
var submittedData = [];

app.get('/', function (req, res) {
    res.send('Hello world');
});

app.get('/displayrecord', function (req, res) {
    db.find({
        _id: req.query._id
    }, function (err, docs) {
        var dataWrapper = {
            data: docs[0]
        };
        res.render("individual.ejs", dataWrapper);
    });
});

app.post('/formdata', upload.single('photo'), function (req, res) {
    console.log(req.file);
    // req.file is the uploaded file information
    // req.body will hold the other text fields
    if (req.file.mimetype == "image/jpeg" || req.file.mimetype == "image/jpg" || req.file.mimetype == "image/png") {
        var dataToSave = {
            file: req.file,
            text: req.body.data,
            color: req.body.color,
            longtext: req.body.longtext
        };

        db.insert(dataToSave, function (err, newDoc) {
            db.find({}, function (err, docs) {
                var dataWrapper = {
                    data: docs
                };
                res.render("outputtemplate.ejs", dataWrapper);
            });
        });
    } else {
        fs.unlink(req.file.path, function (err) {
            if (err) {
                console.log(err)
            } else {
                console.log(req.file.path + ' was deleted');
            }
        });
        res.send("not an image file!")
    }
});

var httpsServer = https.createServer(credentials, app);

httpsServer.listen(443);