import { warcRecordTypes, WarcRecord, WarcRecordTypes } from '../types';
import br from '../utils/br';
import Warc from '../Warc';

/**
 *  this function tries to parse a single warc record
 *
 * @param {string} record the record to parse
 * @returns {WarcRecord} the parsed record
 * @example
 * const record = parseRecord(recordString);
 */
function parseRecord(record: string): WarcRecord {
    // split on the first double br
    const splitter = br + br;
    const [headerString, ...bodyArray] = record.split(splitter);

    const body = bodyArray.join(splitter);

    const header = headerString.split(br)
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
        }, {} as Record<string, string>);

    // check if the record type is valid
    if (
        header['WARC-Type'] === undefined
        || !warcRecordTypes.includes(header['WARC-Type'] as WarcRecordTypes)
    ) {
        throw new Error(`Invalid record: does not contain a valid WARC-Type => "${header['WARC-Type']}"`);
    }

    // check the content length

    // check if the payload digest is valid

    return {
        type: header['WARC-Type'] as WarcRecordTypes,
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
export default function parseWarc(warcFile: string): Warc {
    const records = warcFile
        .split(`${br + br + br}WARC/1.0`)
        .map((record) => parseRecord(record));

    const warc = new Warc();

    warc.addRecords(records);

    return warc;
}
