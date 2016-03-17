import { expect } from 'chai';
import faker from 'faker';

import keys from '../../../utils/keys';

describe('Keys Utils', () => {
    describe('Votes', () => {
        it('should contain the gameId within the returned string', () => {
            const gameId = faker.helpers.randomize();

            const result = keys.votes(gameId);
            expect(result).to.have.string(gameId);
        });
    });

    describe('Players', () => {
        it('should contain the gameId within the returned string', () => {
            const gameId = faker.helpers.randomize();

            const result = keys.players(gameId);
            expect(result).to.have.string(gameId);
        });
    });
});
