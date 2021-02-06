// Express is a node module for building HTTP servers
var express = require('express');
var app = express();

/*

// for testing locally
app.use(express.static('public'))

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
  });

*/

app.listen(80);