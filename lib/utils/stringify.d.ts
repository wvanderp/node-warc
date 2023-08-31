import { WarcRecord } from '../types';
/**
 * creates a string from a record's header by joining the key and value with a colon and space and joining each header with a newline
 *
 * @param {Record<string, string>} record the headers to stringify
 * @returns {string} the stringified headers
 * @example
 * headerToString(record.header);
 */
export declare function headerToString(record: Record<string, string>): string;
/**
 * creates a utf-8 string from a warc record
 *
 * @param {WarcRecord} record the record to stringify
 * @returns {string} the stringified record
 * @example
 * stringifyRecord(record);
 */
export default function stringifyRecord(record: WarcRecord): string;
//# sourceMappingURL=stringify.d.ts.map