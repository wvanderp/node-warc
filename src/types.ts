export type WarcRecordTypes = 'warcinfo' | 'response' | 'resource' | 'request' | 'metadata' | 'revisit' | 'conversion' | 'continuation';

export const warcRecordTypes = [
    'warcinfo',
    'response',
    'resource',
    'request',
    'metadata',
    'revisit',
    'conversion',
    'continuation'
] as WarcRecordTypes[];

export interface WarcRecord {
    type: WarcRecordTypes,
    header: Record<string, string>,
    body: Buffer
}
