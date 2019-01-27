import { expect } from 'chai';
import { generateShortId } from './idGenerator';

describe('Id Generator', () => {
  describe('generateShortId()', () => {
    it('generates a number 4 digits long', () => {
      const result = generateShortId();

      expect(result).to.be.a('number');
      expect(result).to.be.within(1000, 9999);
    });
  });
});
