var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var urlencoder = bodyParser.urlencoded({
    extended: true
});

var port = 80;

app.use(urlencoder);
app.use(express.static('public'));

var submittedData = [];

app.get('/', function (req, res) {
    res.send('Hello world');
});

app.post('/formdata', function (req, res) {

    var animal = ["lion", "tiger", "wolf", "horse", "fox", "butterfly"];
    var emojis = ["🦁", "🐯", "🐺", "🐴", "🦊 ", "🦋"];
    var spiritAnimal = emojis[animal.indexOf(req.body.animals)];
    // console.log(emojis[animal.indexOf(req.body.animals)]);

    var dataToSave = {
        text: req.body.data,
        color: req.body.color,
        animal: spiritAnimal
    };
    // console.log(dataToSave);

    submittedData.push(dataToSave);
    // console.log(submittedData);

    var output = "<html><body style='margin-top: 30px; margin-left: 45px'>";
    output += "<link href='https://fonts.googleapis.com/css2?family=Roboto&display=swap' rel='stylesheet'><h1 style='font-family: Roboto; margin-bottom: 30px;'>Anonymous Messages</h1>";

    var adjList = ["Wise", "Cute", "Furry", "Smooth", "Fast", "Mysterious", "Realistic", " Sociable", "Patient", "Adorable", "Honest"];

    for (var i = 0; i < submittedData.length; i++) {
        var adj = adjList[Math.floor(Math.random() * adjList.length)];
        output += "<div><textarea rows=4 style='font-size: 14pt; font-family: Roboto; margin-bottom: 10px; resize: none; border-width: 5px; border-style: dotted; border-color: " + submittedData[i].color + "; color: " + submittedData[i].color + "'>" + adj + " " + submittedData[i].animal + " said \"" + submittedData[i].text + "\"</textarea></div></body></html>";
    }
    res.send(output);
    // res.send("Got yor data. You Submitted: " + req.body.data + " " + req.body.color);
});

app.listen(port, function () {
    console.log(`app is listening on port ${port}`);
});