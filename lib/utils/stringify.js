"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.headerToString = void 0;
const br_1 = __importDefault(require("./br"));
/**
 * creates a string from a record's header by joining the key and value with a colon and space and joining each header with a newline
 *
 * @param {Record<string, string>} record the headers to stringify
 * @returns {string} the stringified headers
 * @example
 * headerToString(record.header);
 */
function headerToString(record) {
    return Object.entries(record)
        .map((r) => `${r[0]}: ${r[1]}`)
        .join(br_1.default);
}
exports.headerToString = headerToString;
/**
 * creates a utf-8 string from a warc record
 *
 * @param {WarcRecord} record the record to stringify
 * @returns {string} the stringified record
 * @example
 * stringifyRecord(record);
 */
function stringifyRecord(record) {
    const headerString = headerToString(record.header);
    if (record.body.length === 0) {
        return `WARC/1.0${br_1.default}${headerString}`;
    }
    return `WARC/1.0${br_1.default}${headerString}${br_1.default}${br_1.default}${record.body}`;
}
exports.default = stringifyRecord;
