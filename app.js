var express = require('express');
var bodyParser = require('body-parser');
var googleMaps = require('googlemaps');
var util = require('util');
var twilio = require('twilio');
var request = require('request');
var http = require('http');
var $ = require('string')
var port = process.env.PORT || 3000;

// Cache all requests in memory
var api_cache = [];

var app = express();
// Use body-parser middleware for handling POST requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Default route
app.get('/', function (req, res) {
  res.send("<h1> This is the polaris API server</h1>");
})

// Get cached requests
app.get('/api/sms', function(req, res) {
  res.json(api_cache);
});

// Twilio SMS Handler route
app.post('/api/sms', function(req, res) {
  api_cache.push(req.body)
  // Sanitize malformed incoming object
  var data = JSON.parse(
        req.body.Body
        .replace('(','{')
        .replace(')','}')
  );

  getDirections(data.origin, data.destination, data.mode, function(directions) {
    // Send Twiml (Twilio Markup) response
    var twiml = constructTwiml(directions);
    res.send(twiml);
  });

});

function constructTwiml(directions) {
  var twimlRes = '<?xml version="1.0" encoding="UTF-8"?>';
  twimlRes += '<Response><Message>' + JSON.stringify(directions) + '</Message></Response>';
  return twimlRes;
}

function getDirections(origin, destination, mode, callback) {
  // Make API call to the Google Maps API
  googleMaps.directions(origin, destination, function(err, result) {
    if (err) return console.error(err);

    var directions = [];
    result['routes'][0]['legs'][0].steps.forEach(function(step) {
      var step = step.html_instructions;
      // cleanse HTML tags using string.js ($)
      // Hack(zen): insert space between Maps API destination div
      directions.push($(step).stripTags().s
        .replace('Destination', ', Destination')
      );
    });

    // invoke callback with array of directions
    callback(directions);
  },'false', mode, null, null,null, null, null, null);
}

// Start express server
app.listen(port, function() {
  console.log('Listening to port:', port);
});

/* MAPS API CODE
var _start = result['routes'][0].legs[0].start_location;
var _end = result['routes'][0].legs[0].end_location;

_start = _start.lat + "," + _start.lng;
_end = _end.lat + "," + _end.lng;


var paths = [
{ 'color': '0x0000ff',
'weight': '5',
'points': [ _start, _end ]
}
]

var styles = [
{ 'feature': 'road', 'element': 'all', 'rules':
{ 'hue': '0x00ff00' }
}
]

var map = exec(googleMaps.staticMap(null, null, '500x400', false, false, 'roadmap', markers, styles))
*/
