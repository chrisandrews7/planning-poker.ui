import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import { Home } from './Home';

describe('Home Container', () => {
  const connect = (state, props) => shallow(
    <Home {...state} {...props} />
  );

  describe('Home', () => {
    it('renders', () => {
      const wrapper = connect();

      expect(wrapper).to.be.ok;
    });
  });
});
