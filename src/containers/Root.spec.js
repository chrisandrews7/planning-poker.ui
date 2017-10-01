import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import fakeStore from '../../test/mocks/store';
import RootContainer from './Root';
import JoinContainer from './Join';

describe('Root Container', () => {
  const store = fakeStore({ 1: 'test' });

  it('should render the redux provider with the store', () => {
    const wrapper = shallow(<RootContainer store={store} />);

    expect(
      wrapper
        .find(Provider)
        .props()
        .store
    ).to.deep.equal(store);
  });

  it('should render the Join Route', () => {
    const wrapper = shallow(<RootContainer store={store} />);
    expect(
      wrapper
        .find(Route)
        .props()
        .component
    ).to.equal(JoinContainer);
  });
});
