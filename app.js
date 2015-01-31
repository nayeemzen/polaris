var express = require('express')
var bodyParser = require('body-parser')
var googleMaps = require('googlemaps')
var util = require('util')
var twilio = require('twilio')
var request = require('request')
var port = process.env.PORT || 3000;

var app = express()

// Use body-parser middleware for handling POST requests
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

var api_cache = [];


app.get('/', function (req, res) {
    res.send("<h1> This is the polaris API server</h1>");
})

// Twilio SMS Handler
app.post('/api/sms', function(req, res) {
  // Handle Twilio requests here
  api_cache.push(req.body)
  var twimlRes = '<?xml version="1.0" encoding="UTF-8"?>';
  twimlRes += '<Response><Message>Reply: ' + req.body.Body + '</Message></Response>';
  res.send(twimlRes);
});

app.get('/api/sms', function(req, res) {
  res.json(api_cache);
});


app.post('/navigate', function (req, res) {
  var origin = req.body.origin;
  var destination = req.body.destination;
  var mode = req.body.mode;
  
  /*
    Optimizations
      - Transit mode
      - Departure/Arrival time
  */
 
  googleMaps.directions(origin, destination, 
    function(err, result){
      if (err){
        console.log("in here");
        res.send(  JSON.stringify(err) );       
      }
      else{
        
        if (result['status'] == 'OK'){
          console.log("polaris"); 


          var _start = result['routes'][0].legs[0].start_location;
          var _end = result['routes'][0].legs[0].end_location;
          
          _start = _start.lat + "," + _start.lng;
          _end = _end.lat + "," + _end.lng;


          var styles = [
              // { 'feature': 'road', 'element': 'all', 'rules': 
              //     { 'hue': '0x00ff00' }
              // }
          ]

          var paths = [
              { 'color': '0x0000ff', 'weight': '5', 'points': 
                  [ _start, _end ]
              }
          ]

          //var map = exec(googleMaps.staticMap(null, null, '500x400', false, false, 'roadmap', markers, styles))

          res.send(  JSON.stringify(result) ); 
        }
        else{
          res.send(  JSON.stringify(result) ); 
        }
      }
    },
  'false', mode, null, null,null, null, null, null);
})


var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})