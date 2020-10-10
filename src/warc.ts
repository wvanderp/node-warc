const fs = require("fs");
const R = require("ramda");

const {stringifyRecord} = require("./lib/stringify");

import {WarcRecord} from "./types"

import {br} from './lib/util'

class Warc {
    private records: WarcRecord[];

    constructor() {
        this.records = [];
    }

    writeWarc(fileLocation: String) {
        const writeStream = fs.createWriteStream(fileLocation);
        R.forEach((r) => writeStream.write(stringifyRecord(r)), this.records);
        writeStream.close()
    }

    getWarcSummary(): String {
        return 'Warc summary ' + br +
            'warc records count: ' + this.records.length;


    }

    addAxios(resp) {
        // var cache = [];
        // console.log(JSON.stringify(resp, function (key, value) {
        //     if (typeof value === 'object' && value !== null) {
        //         if (cache.indexOf(value) !== -1) {
        //             // Duplicate reference found, discard key
        //             return value + "";
        //         }
        //         // Store value in our collection
        //         cache.push(value);
        //     }
        //     return value;
        // }));
        // cache = null;

        // request
        const requestBody = resp.request._header


        //response
        // console.log(resp.request.socket._httpMessage)

        const isObject = typeof resp.data === 'object' && resp.data !== null;
        const data = isObject ? JSON.stringify(resp.data) : resp.data;

        const respHeader = R.pipe(
            R.aperture(2),
            R.map(r => r.join(": ")),
            r => r.join(br)
        )(resp.request.res.rawHeaders);

        // console.log(respHeader);

        const httpHead = 'HTTP/' + resp.request.res.httpVersion + ' ' + resp.request.res.statusCode + ' ' + resp.request.res.statusMessage;

        const responseBody = httpHead + br + respHeader + br + br + data;

        // fix all

        // console.log(requestBody);
        // console.log("respones")
        // console.log(responseBody)

        this.records.push({
            type: "request",
            date: new Date(),
            body: requestBody
        });


        this.records.push({
            type: "response",
            date: new Date(),
            body: responseBody
        })
    }

    addInfo(infoObject: Object) {

    }
}

module.exports = Warc;
