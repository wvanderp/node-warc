var fs = require("fs");
var uuid = require("node-uuid");
var sha1 = require("sha1");


var package = require('./package.json');
var config = require('./config.json');
var options = config.options;

var currentWarcNum = 0;
var currentWarc = "";

var warcInfoUuid = "";

function startWarc(options) {
  //building the file name
  var name = "" + options.filename + currentWarcNum + ".warc";

  //making the file for writing
  openfile(options.location, name);
  currentWarc = name;

  //building warcInfoBody
  var warcInfoBody = objToBody(options.warcInfo)+ "\r\n";
  var warcInfoHeader = warcInfoHeaderGen(warcInfoBody);
  // console.log(warcInfoHeader);

  writeWarc(warcInfoHeader);
  writeWarc("\r\n");
  writeWarc(warcInfoBody);
  writeWarc("\r\n");
  writeWarc("\r\n");

}

function addReqest(reqest, methode){
  var reqestBody = objToBody(reqest);
  reqestBody = methode + "\r\n" + reqestBody + "\r\n";

  var reqestHeader = warcReqestHeaderGen(reqestBody);

  writeWarc(reqestHeader);
  writeWarc("\r\n");
  writeWarc(reqestBody);
  writeWarc("\r\n");
  writeWarc("\r\n");

}

// ================
// warc Part builders

function warcInfoHeaderGen(body){
  var header = "";
  var date = new Date();
  warcInfoUuid = uuid.v4();


  header += "WARC-Type" + ": " + "warcinfo" + "\r\n";
  header += "Content-Type" + ": " + "application/warc-fields" + "\r\n";
  header += "WARC-Date" + ": " + date.toISOString() + "\r\n";
  header += "WARC-Record-ID" + ": <urn:uuid:" + warcInfoUuid + ">\r\n";
  header += "WARC-Filename" + ": " + currentWarc + "\r\n";
  // header += "WARC-Block-Digest" + ": sha1:" + getSha1(body) + "\r\n";
  header += "Content-Length" + ": " + getBinarySize(body) + "\r\n";

  header = "WARC/1.0" + "\r\n" + header;
  return header;
}

function warcReqestHeaderGen(body){
  var header = "";
  var date = new Date();

  header += "WARC-Type: " + "request" + "\r\n";
  header += "WARC-Target-URI: " + "http://study.gaijinpot.com/" + "\r\n";
  header += "Content-Type: " + "application/http;msgtype=request" + "\r\n";
  header += "WARC-Date: " + date.toISOString() + "\r\n";
  header += "WARC-Record-ID: " + "<urn:uuid:" + uuid.v4() + ">\r\n";
  header += "WARC-IP-Address: " + "192.237.218.145" + "\r\n";
  header += "WARC-Warcinfo-ID: <urn:uuid:"+warcInfoUuid+">" + "\r\n";
  // header += "WARC-Block-Digest: " + "sha1:" + getSha1(body) + "\r\n";
  header += "Content-Length: " + getBinarySize(body) + "\r\n";

  header = "WARC/1.0" + "\r\n" + header;
  return header;
}

// ================
// utilities
function getBinarySize(string) {
  return Buffer.byteLength(string, 'utf8');
}

function objToBody(obj) {
  var header = "";
  for (var property in obj) {
    if (obj.hasOwnProperty(property)) {
      header += property+": "+obj[property]+"\r\n";
    }
  }
  return header;
}

function openfile(location, name) {
  if(!fs.existsSync(location)){
    console.log("making dir");
    try { fs.mkdirSync(location); } catch (e) {console.log(e);}
  }
  fs.open(location+"/"+name, "w", function(err, fd) {
    if (err) throw err;
    fs.close(fd, function(err) {
      if (err) throw err;
    });
  });
}

function writeWarc(text) {
  fs.appendFileSync(options.location+"/"+currentWarc, text);
}

function getSha1(text) {
  return sha1(text).toUpperCase();
}

//==========
// start test code

startWarc(options);

var reqest = {
  "User-Agent": "ArchiveTeam ArchiveBot/20131009.01",
  "Accept": "*/*",
  "Host": "study.gaijinpot.com",
  "Connection": "Keep-Alive"
};

var methode = "GET / HTTP/1.1";

addReqest(reqest, methode);
