import stringifyRecord from './utils/stringify';

import { WarcRecord } from './types';

import br from './utils/br';
import parseWarc from './parse/parseWarc';

/**
 *
 * A class representing a WARC file
 *
 * @class Warc
 */
export default class Warc {
    public records: WarcRecord[];

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
    addRecord(record: WarcRecord): void {
        this.records.push(record);
    }

    /**
     * adds multiple records to the warc file
     *
     * @param {WarcRecord[]} records the records to add
     * @example
     * warc.addRecords(records);
     */
    addRecords(records: WarcRecord[]): void {
        this.records.push(...records);
    }

    /**
     * creates a utf-8 string from the warc file
     *
     * @returns {string} the stringified warc file
     * @example
     * warc.toFile();
     */
    public toFile(): string {
        return this.records
            .map((record) => stringifyRecord(record))
            .join(br + br + br);
    }

    /**
     * parses a warc file into a Warc object
     *
     * @param {string} warcFile the warc file to parse
     * @returns {Warc} the parsed warc file
     * @example
     * Warc.parse(warcFile);
     */
    static parse(warcFile: string): Warc {
        return parseWarc(warcFile);
    }
}
