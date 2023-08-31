"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stringify_1 = __importDefault(require("./utils/stringify"));
const br_1 = __importDefault(require("./utils/br"));
const parseWarc_1 = __importDefault(require("./parse/parseWarc"));
/**
 *
 * A class representing a WARC file
 *
 * @class Warc
 */
class Warc {
    /**
     * creates a new empty warc file
     *
     * @example
     * const warc = new Warc();
     */
    constructor() {
        this.records = [];
    }
    /**
     * adds a record to the warc file
     *
     * @param {WarcRecord} record the record to add
     * @example
     * warc.addRecord(record);
     */
    addRecord(record) {
        this.records.push(record);
    }
    /**
     * adds multiple records to the warc file
     *
     * @param {WarcRecord[]} records the records to add
     * @example
     * warc.addRecords(records);
     */
    addRecords(records) {
        this.records.push(...records);
    }
    /**
     * creates a utf-8 string from the warc file
     *
     * @returns {string} the stringified warc file
     * @example
     * warc.toFile();
     */
    toFile() {
        return this.records
            .map((record) => (0, stringify_1.default)(record))
            .join(br_1.default + br_1.default + br_1.default);
    }
    /**
     * parses a warc file into a Warc object
     *
     * @param {string} warcFile the warc file to parse
     * @returns {Warc} the parsed warc file
     * @example
     * Warc.parse(warcFile);
     */
    static parse(warcFile) {
        return (0, parseWarc_1.default)(warcFile);
    }
}
exports.default = Warc;
