var fs = require("fs");

var package = require('./package.json');
var config = require('./config.json');
var options = config.default;

var currentWarc = 0;

function startWarc(options) {
  //building the file name
  var name = "" + options.filename + currentFile + ".warc";

  //making the file for writing
  openfile(options.location, name);
}


function openfile(location, name) {
  fs.open(path, "wx", function(err, fd) {
    if (err) throw err;
    fs.close(fd, function(err) {
      if (err) throw err;
    });
  });
}

//==========
// start test code

startWarc(options);
