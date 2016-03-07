var fs = require("fs");
var uuid = require("node-uuid");
var sha1 = require("sha1");

var br = "\r\n";

var currentWarcNum = 0;
var currentWarc = "";

var warcInfoUuid = "";

//this contains the whole of the warc file
var warc = "";

// ================
// start of program
module.exports = {
    warc: warc,

    methods: {
        "GET": "GET / HTTP/1.1",
        "HEAD": "",
        "POST": "",
        "PUT": "",
        "DELETE": ""
    },

    startWarc: function (options) {
        //building warcInfoBody
        var warcInfoBody = objToBody(options.warcInfo) + br;
        var warcInfoHeader = warcInfoHeaderGen(warcInfoBody);
        // console.log(warcInfoHeader);

        addToWarc(warcInfoHeader);
        addToWarc(br);
        addToWarc(warcInfoBody);
        addToWarc(br);
        addToWarc(br);

    },

    addrequest: function (request, method) {
        var requestBody = objToBody(request);
        requestBody = method + br + requestBody + br;

        var reqestHeader = warcReqestHeaderGen(requestBody);

        addToWarc(reqestHeader);
        addToWarc(br);
        addToWarc(requestBody);
        addToWarc(br);
        addToWarc(br);

    }
};

// ==================
// warc Part builders

// warc info
// is the header for the whole of the warc file
function warcInfoHeaderGen(body) {
    var header = "";
    var date = new Date();
    warcInfoUuid = uuid.v4();


    header += "WARC-Type" + ": " + "warcinfo" + br;
    header += "Content-Type" + ": " + "application/warc-fields" + br;
    header += "WARC-Date" + ": " + date.toISOString() + br;
    header += "WARC-Record-ID" + ": " + "<urn:uuid:" + warcInfoUuid + ">" + br;
    header += "WARC-Filename" + ": " + currentWarc + br;
    // header += "WARC-Block-Digest" + ": sha1:" + getSha1(body) + br;
    header += "Content-Length" + ": " + getBinarySize(body) + br;

    header = "WARC/1.0" + br + header;

    return header;
}

//a warc request
// is a request to a server.

function warcReqestHeaderGen(body) {
    var header = "";
    var date = new Date();

    header += "WARC-Type: " + "request" + br;
    header += "WARC-Target-URI: " + "http://study.gaijinpot.com/" + br;
    header += "Content-Type: " + "application/http;msgtype=request" + br;
    header += "WARC-Date: " + date.toISOString() + br;
    header += "WARC-Record-ID: " + "<urn:uuid:" + uuid.v4() + ">\r\n";
    header += "WARC-IP-Address: " + "192.237.218.145" + br;
    header += "WARC-Warcinfo-ID: <urn:uuid:" + warcInfoUuid + ">" + br;
    // header += "WARC-Block-Digest: " + "sha1:" + getSha1(body) + br;
    header += "Content-Length: " + getBinarySize(body) + br;

    header = "WARC/1.0" + br + header;
    return header;
}

// ================
// utilities
function getBinarySize(string) {
    return Buffer.byteLength(string, 'utf8');
}

function objToBody(obj) {
    //this function transforms a js object to the format of warc headers.
    var header = "";
    for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
            header += property + ": " + obj[property] + br;
        }
    }
    return header;
}

function openFile(location, name) {
    if (!fs.existsSync(location)) {
        console.log("making dir");
        try {
            fs.mkdirSync(location);
        } catch (e) {
            console.log(e);
        }
    }
    fs.open(location + "/" + name, "w", function (err, fd) {
        if (err) throw err;
        fs.close(fd, function (err) {
            if (err) throw err;
        });
    });
}

function writeWarc(text) {
    //building the file name
    var name = "" + options.filename + "." +currentWarcNum + ".warc";

    //making the file for writing
    openFile(options.location, name);
    currentWarc = name;

    fs.appendFileSync(options.location + "/" + currentWarc, text);
}

function addToWarc(text){
    warc += text;
}

function getSha1(text) {
    return sha1(text).toUpperCase();
}