var datastore = require('nedb');
var db = new datastore({
    filename: 'database.json',
    autoload: true
});

var express = require('express');
var app = express();

var port = 80;

app.use(express.static('public'));

var submittedData = [];

app.get('/', function (req, res) {
    res.send('Hello world');
});

app.get('/formdata', function (req, res) {
    console.log(req.query.text)
    var dataToSave = {
        text: req.query.text,
        color: req.query.color,
    };
 
    db.insert(dataToSave, function (err, newDoc) {
        db.find({}, function(err, docs){
            res.send(docs);
        });
    });
});

app.listen(port, function () {
    console.log(`app is listening on port ${port}`);
});