var express = require('express'),
  mongodb = require('mongodb'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  path = require('path');

var app = express();
var corsOption = {
  origin: '*',
  optionsSuccessStatus: 200
};

app.use(express.static(path.join(__dirname, '/dist/Ang-Pro')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOption));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/Ang-Pro/index.html'));
});

var port = process.env.PORT || 8080;
app.listen(port, (err) => { console.log(`listen on ${port}`) });
