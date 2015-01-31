var express = require('express'),
    bodyParser = require('body-parser'),
    twilio = require('twilio'),
    app = express();

// Use body-parser middleware for handling POST requests
app.use(bodyParser.json())

app.post('/request', function(req, res) {
  // Handle Twilio requests here

});

app.listen(process.env.PORT || 3000);
