//==========
// start test code
var config = require('./config.json');
var options = config.options;

var warc = require("./warc.js");

warc.startWarc(options);

var request = {
    "User-Agent": "ArchiveTeam ArchiveBot/20131009.01",
    "Accept": "*/*",
    "Host": "study.gaijinpot.com",
    "Connection": "Keep-Alive"
};

var methode = "GET / HTTP/1.1";

warc.addrequest(request, methode);
