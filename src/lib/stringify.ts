import {WarcRecord} from "../types";

const R = require("ramda");

const br = '\n';

export const headerToString = R.pipe(
    R.toPairs,
    R.map(r => `${r[0]}: ${r[1]}`),
    (r) => r.join(br)
);


export const stringifyRecord = (record: WarcRecord): String => {
    const header = {
        "WARC-Type": record.type,
        "WARC-Date": record.date.toISOString()
    };
    const headerString: String = headerToString(header);
    return "WARC/1.0" + br + headerString + br + br + record.body;
};
