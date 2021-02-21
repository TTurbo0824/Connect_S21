var datastore = require('nedb');
var db = new datastore({
    filename: 'database.json',
    autoload: true
});

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var urlencoder = bodyParser.urlencoded({
    extended: true
});

var port = 80;

app.use(urlencoder);

app.use(express.static('public'));
app.set('view engine', 'ejs');
var submittedData = [];

app.get('/', function (req, res) {
    res.send('Hello world');
});

app.get('/displayrecord', function(req, res){
    db.find({_id: req.query._id}, function(err, docs){
        var dataWrapper = {data: docs[0]};
        res.render("individual.ejs", dataWrapper);
    });
});

app.get('/search', function(req, res){
    console.log("Search for: " + req.query.q);
    var query = new RegExp(req.query.q, 'i');
    db.find({longtext: query}, function(err, docs){
        var dataWrapper = {data: docs};
        res.render("outputtemplate.ejs", dataWrapper);
    });
});

app.post('/formdata', function (req, res) {

    var dataToSave = {
        date: req.body.date,
        text: req.body.data,
        color: req.body.color,
        longtext: req.body.longtext
    };

    // console.log(dataToSave);
    // console.log(submittedData);

    db.insert(dataToSave, function (err, newDoc) {
        db.find({}, function(err, docs){
            var dataWrapper = {data: docs};
            res.render("outputtemplate.ejs", dataWrapper);
        });
    });
});

app.listen(port, function () {
    console.log(`app is listening on port ${port}`);
});