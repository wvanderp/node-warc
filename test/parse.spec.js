"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const mocha_1 = require("mocha");
const chai_1 = require("chai");
const Warc_1 = __importDefault(require("../src/Warc"));
(0, mocha_1.describe)('parse', () => {
    (0, mocha_1.describe)('internets warc files', () => {
        // source for warc files: https://github.com/webrecorder/pywb/tree/main/sample_archive/warcs
        const warcPath = path_1.default.join(__dirname, 'data');
        for (const file of fs_1.default.readdirSync(warcPath)) {
            (0, mocha_1.it)(`should parse ${file}`, () => {
                const warcFile = fs_1.default.readFileSync(path_1.default.join(warcPath, file), 'utf8');
                const warc = Warc_1.default.parse(warcFile);
                (0, chai_1.expect)(warc.toFile()).to.equal(warcFile);
            });
        }
    });
    (0, mocha_1.describe)('warc files with invalid records', () => {
        (0, mocha_1.it)('should throw when we feed it garbage', () => {
            (0, chai_1.expect)(() => Warc_1.default.parse('garbage')).to.throw();
        });
        (0, mocha_1.it)('should throw when we feed it an empty string', () => {
            (0, chai_1.expect)(() => Warc_1.default.parse('')).to.throw();
        });
        (0, mocha_1.it)('should throw when we feed it a string with only newlines', () => {
            (0, chai_1.expect)(() => Warc_1.default.parse('\n\n\n')).to.throw();
        });
        (0, mocha_1.it)('should throw when we feed it a semi-valid warc file', () => {
            const warcFile = '\n\n\nWARC/1.0';
            (0, chai_1.expect)(() => Warc_1.default.parse(warcFile)).to.throw();
        });
        (0, mocha_1.it)('should throw when we feed it a warc file with a invalid record type', () => {
            const warcFile = '\n\n\nWARC/1.0\nWARC-Type: invalid';
            (0, chai_1.expect)(() => Warc_1.default.parse(warcFile)).to.throw();
        });
    });
});
