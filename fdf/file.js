var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

var multer = require("multer");


var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
var app = express();
var path = require('path');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post("/upload", multer({dest: "./uploads/"}).array("uploads[]", 12), function(req, res) {
    res.send(req.files);
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files, path) {
      var oldpath = files.filetoupload.path;
      var newpath = 'uploads/uploads  ' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });
 });
});

var server = app.listen(3000, function() {
    console.log("Listening on port %s...", server.address().port);
});