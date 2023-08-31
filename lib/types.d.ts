/// <reference types="node" />
export type WarcRecordTypes = 'warcinfo' | 'response' | 'resource' | 'request' | 'metadata' | 'revisit' | 'conversion' | 'continuation';
export declare const warcRecordTypes: WarcRecordTypes[];
export interface WarcRecord {
    type: WarcRecordTypes;
    header: Record<string, string>;
    body: Buffer;
}
//# sourceMappingURL=types.d.ts.map