const br = '\n';

export class WarcFile {
  constructor(fileLocation) {
    this.fileLocation = fileLocation;
  }
}

// ==================
// warc Part builders

// warc info
// is the header for the whole of the warc file
function warcInfoHeaderGen(body) {
  let header = '';
  let date = new Date();
  let warcInfoUuid = uuid.v4();


  header += 'WARC-Type' + ': ' + 'warcinfo' + br;
  header += 'Content-Type' + ': ' + 'application/warc-fields' + br;
  header += 'WARC-Date' + ': ' + date.toISOString() + br;
  header += 'WARC-Record-ID' + ': ' + '<urn:uuid:' + warcInfoUuid + '>' + br;
  header += 'WARC-Filename' + ': ' + currentWarc + br;
  // header += "WARC-Block-Digest" + ": sha1:" + getSha1(body) + br;
  header += 'Content-Length' + ': ' + getBinarySize(body) + br;

  header = 'WARC/1.0' + br + header;

  return header;
}

// warc request
// is a request to a server.
function warcReqestGen() {
  let body = warcReqestBodyGen();
  let header = warcInfoHeaderGen(body)

  return header + br + br + body;
}

// warc request header
function warcReqestHeaderGen(body) {
  let header = '';
  let date = new Date();

  header += 'WARC-Type: ' + 'request' + br;
  header += 'WARC-Target-URI: ' + 'http://study.gaijinpot.com/' + br;
  header += 'Content-Type: ' + 'application/http;msgtype=request' + br;
  header += 'WARC-Date: ' + date.toISOString() + br;
  header += 'WARC-Record-ID: ' + '<urn:uuid:' + uuid.v4() + '>\r\n';
  header += 'WARC-IP-Address: ' + '192.237.218.145' + br;
  header += 'WARC-Warcinfo-ID: <urn:uuid:' + warcInfoUuid + '>' + br;
  // header += "WARC-Block-Digest: " + "sha1:" + getSha1(body) + br;
  header += 'Content-Length: ' + getBinarySize(body) + br;

  header = 'WARC/1.0' + br + header;
  return header;
}

// warc request body
function warcReqestBodyGen() {

}

// warc responce
// is responce gotten from the server
function warcResponceGen() {

}

// ================
// utilities
function writeWarc(text) {
  //building the file name
  let name = '' + options.filename + '.' + currentWarcNum + '.warc';

  //making the file for writing
  openFile(options.location, name);
  currentWarc = name;

  fs.appendFileSync(options.location + '/' + currentWarc, text);
}

function addToWarc(text) {
  warc += text;
}

function getSha1(text) {
  return sha1(text).toUpperCase();
}

function getBinarySize(string) {
  return Buffer.byteLength(string, 'utf8');
}

function objToBody(obj) {
  //this function transforms a js object to the format of warc headers.
  let header = '';
  for (let property in obj) {
    if (obj.hasOwnProperty(property)) {
      header += property + ': ' + obj[property] + br;
    }
  }
  return header;
}

function fileExisit(location, name) {
  if (!fs.existsSync(location)) {
    console.log('making dir');
    try {
      fs.mkdirSync(location);
    } catch (e) {
      console.log(e);
    }
  }
  fs.open(location + '/' + name, 'w', function (err, fd) {
    if (err) throw err;
    fs.close(fd, function (err) {
      if (err) throw err;
    });
  });
}