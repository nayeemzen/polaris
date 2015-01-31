var express = require('express'),
    bodyParser = require('body-parser'),
    twilio = require('twilio'),
    app = express(),
    port = process.env.PORT || 3000;

// Use body-parser middleware for handling POST requests
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.get('/', function(req, res) {
  res.end('<h1> This is the polaris API server');
});

// Twilio SMS Handler
app.post('/api/sms', function(req, res) {
  // Handle Twilio requests here
  console.log(req.body);
  res.json(req.body);
});

app.listen(port);
console.log('listening on port: ' + port);
