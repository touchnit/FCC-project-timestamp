// index.js
// where your node app starts
var moment = require('moment');
// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/:date?", function (req, res) {
  let date = req.params.date;
  let isUnixDate = moment(date, 'X', true).isValid();
  let isUtcDate = moment(date).isValid();
  if (!req.params.date) {
    res.send({
      "unix": parseInt(moment().format('x'), 10), "utc": moment().format('ddd, DD MMM YYYY HH:mm:ss') + " GMT"
    })
  }
  else if (isUtcDate) {
    res.send({
      "unix": parseInt(moment(date).format('x'), 10), "utc": moment(date).format('ddd, DD MMM YYYY HH:mm:ss') + " GMT"
    })
  } else if (isUnixDate) {
    let unixDate = parseInt(date / 1000);
    res.send({
      "unix": parseInt(moment.unix(unixDate).format('x'), 10), "utc": moment.unix(unixDate).format('ddd, DD MMM YYYY HH:mm:ss') + " GMT"
    })
  }
  else {
    res.send({
      error: "Invalid Date"
    })
  }
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
