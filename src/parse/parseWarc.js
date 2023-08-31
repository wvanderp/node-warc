"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const br_1 = __importDefault(require("../utils/br"));
const Warc_1 = __importDefault(require("../Warc"));
/**
 *  this function tries to parse a single warc record
 *
 * @param {string} record the record to parse
 * @returns {WarcRecord} the parsed record
 * @example
 * const record = parseRecord(recordString);
 */
function parseRecord(record) {
    // split on the first double br
    const splitter = br_1.default + br_1.default;
    const [headerString, ...bodyArray] = record.split(splitter);
    const body = bodyArray.join(splitter);
    const header = headerString.split(br_1.default)
        .map((line) => {
        const [key, value] = line.split(': ');
        return [key, value];
    })
        .reduce((accumulator, current) => {
        // filter out the WARC/1.0 line
        if (current[0] === 'WARC/1.0') {
            return accumulator;
        }
        // filter out empty lines
        if (current[0] === '') {
            return accumulator;
        }
        // eslint-disable-next-line prefer-destructuring
        accumulator[current[0]] = current[1];
        return accumulator;
    }, {});
    // check if the record type is valid
    if (header['WARC-Type'] === undefined
        || !types_1.warcRecordTypes.includes(header['WARC-Type'])) {
        throw new Error(`Invalid record: does not contain a valid WARC-Type => "${header['WARC-Type']}"`);
    }
    // check the content length
    // check if the payload digest is valid
    return {
        type: header['WARC-Type'],
        header,
        body: Buffer.from(body),
    };
}
/**
 * this function takes a arbitrary string and tries to parse out the warc records
 *
 * @param {string} warcFile the warc file to parse
 * @returns {Warc} the parsed warc file
 * @example
 * const warc = parseWarc(warcFile);
 */
function parseWarc(warcFile) {
    const records = warcFile
        .split(`${br_1.default + br_1.default + br_1.default}WARC/1.0`)
        .map((record) => parseRecord(record));
    const warc = new Warc_1.default();
    warc.addRecords(records);
    return warc;
}
exports.default = parseWarc;
