import {headerToString} from '../../src/lib/stringify';
import {expect} from 'chai';
import 'mocha';

describe('tests', () => {
    describe('stringify', () => {
        it('headerToString', () => {
            const result = headerToString({
                'Referer': 'http://study.gaijinpot.com/wp-content/themes/study2/css/main.css',
                'User-Agent': 'ArchiveTeam ArchiveBot/20131009.01',
                'Accept': '*/*'
            });

            const expected = "Referer: http://study.gaijinpot.com/wp-content/themes/study2/css/main.css\n" +
                "User-Agent: ArchiveTeam ArchiveBot/20131009.01\n" +
                "Accept: */*";

            expect(result).to.equal(expected);
        });
    });
});
