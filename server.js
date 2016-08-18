'use strict';

var express = require('express');
var multer = require('multer');
var fs = require('fs');
var junk = require('junk');
var app = express();

app.use(express.static('./'));

// define file name and destination to save
var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, __dirname + '/images');
  },
  filename: function filename(req, file, cb) {
    var ext = file.originalname.split('.');
    ext = ext[ext.length - 1];
    cb(null, 'uploads-' + Date.now() + '.' + ext);
  }
});

// define what file type to accept
var filter = function filter(req, file, cb) {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
    cb(null, true);
  } else {
    cb('Failed: format not supported');
  }
};

// set multer config
var upload = multer({
  storage: storage,
  fileFilter: filter
}).single('upload');

/* ===============================
 ROUTE
 ============================== */

// route for file upload
app.post('/uploads', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      res.status(400).json({ message: err });
    } else {
      res.status(200).json({
        file: req.protocol + '://' + req.get('host') + '/images/' + req.file.filename
      });
    }
  });
});

app.get('/images', function (req, res) {
  var file_path = req.protocol + '://' + req.get('host') + '/images/';
  var files = fs.readdirSync('./images/');
  files = files.filter(junk.not) // remove .DS_STORE etc
    .map(function (f) {
      return file_path + f;
    }); // map with url path
  res.json(files);
});

// general route
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

var server = app.listen(8000, function (_) {
  console.log('server started. listening to 8000');
});