import { WarcRecord } from './types';
/**
 *
 * A class representing a WARC file
 *
 * @class Warc
 */
export default class Warc {
    records: WarcRecord[];
    /**
     * creates a new empty warc file
     *
     * @example
     * const warc = new Warc();
     */
    constructor();
    /**
     * adds a record to the warc file
     *
     * @param {WarcRecord} record the record to add
     * @example
     * warc.addRecord(record);
     */
    addRecord(record: WarcRecord): void;
    /**
     * adds multiple records to the warc file
     *
     * @param {WarcRecord[]} records the records to add
     * @example
     * warc.addRecords(records);
     */
    addRecords(records: WarcRecord[]): void;
    /**
     * creates a utf-8 string from the warc file
     *
     * @returns {string} the stringified warc file
     * @example
     * warc.toFile();
     */
    toFile(): string;
    /**
     * parses a warc file into a Warc object
     *
     * @param {string} warcFile the warc file to parse
     * @returns {Warc} the parsed warc file
     * @example
     * Warc.parse(warcFile);
     */
    static parse(warcFile: string): Warc;
}
//# sourceMappingURL=Warc.d.ts.map