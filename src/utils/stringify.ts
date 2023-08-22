import { WarcRecord } from '../types';
import br from './br';

/**
 * creates a string from a record's header by joining the key and value with a colon and space and joining each header with a newline
 *
 * @param {Record<string, string>} record the headers to stringify
 * @returns {string} the stringified headers
 * @example
 * headerToString(record.header);
 */
export function headerToString(record: Record<string, string>): string {
    return Object.entries(record)
        .map((r) => `${r[0]}: ${r[1]}`)
        .join(br);
}

/**
 * creates a utf-8 string from a warc record
 *
 * @param {WarcRecord} record the record to stringify
 * @returns {string} the stringified record
 * @example
 * stringifyRecord(record);
 */
export default function stringifyRecord(record: WarcRecord): string {
    const headerString = headerToString(record.header);

    if (record.body.length === 0) {
        return `WARC/1.0${br}${headerString}`;
    }
    return `WARC/1.0${br}${headerString}${br}${br}${record.body}`;
}
