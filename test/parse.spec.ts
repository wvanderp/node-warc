import fs from 'fs';
import path from 'path';

import { describe, it } from 'mocha';
import { expect } from 'chai';
import Warc from '../src/Warc';

describe('parse', () => {
    describe('internets warc files', () => {
        // source for warc files: https://github.com/webrecorder/pywb/tree/main/sample_archive/warcs
        const warcPath = path.join(__dirname, 'data');
        for (const file of fs.readdirSync(warcPath)) {
            it(`should parse ${file}`, () => {
                const warcFile = fs.readFileSync(path.join(warcPath, file), 'utf8');
                const warc = Warc.parse(warcFile);

                expect(warc.toFile()).to.equal(warcFile);
            });
        }
    });

    describe('warc files with invalid records', () => {
        it('should throw when we feed it garbage', () => {
            expect(() => Warc.parse('garbage')).to.throw();
        });

        it('should throw when we feed it an empty string', () => {
            expect(() => Warc.parse('')).to.throw();
        });

        it('should throw when we feed it a string with only newlines', () => {
            expect(() => Warc.parse('\n\n\n')).to.throw();
        });

        it('should throw when we feed it a semi-valid warc file', () => {
            const warcFile = '\n\n\nWARC/1.0';
            expect(() => Warc.parse(warcFile)).to.throw();
        });

        it('should throw when we feed it a warc file with a invalid record type', () => {
            const warcFile = '\n\n\nWARC/1.0\nWARC-Type: invalid';
            expect(() => Warc.parse(warcFile)).to.throw();
        });
    });
});
