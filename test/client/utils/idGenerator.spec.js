import { expect } from 'chai';
import { generateShortId } from '../../../src/client/utils/idGenerator';

describe('Id Generator', () => {
  describe('Generate Short ID', () => {
    it('should generate a number 5 digits long', () => {
      const result = generateShortId();

      expect(result).to.be.a('number');
      expect(result).to.be.within(10000, 99999);
    });
  });
});
