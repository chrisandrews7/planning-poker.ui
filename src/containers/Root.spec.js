import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import fakeStore from '../../test/mocks/fakeStore';
import RootContainer from './Root';
import routes from '../routes';

describe('Root Container', () => {
  const store = fakeStore({ 1: 'test' });
  const history = {};

  it('should render the redux provider with the store', () => {
    const wrapper = shallow(<RootContainer history={history} store={store} />);

    expect(
      wrapper
        .find(Provider)
        .props()
        .store
    ).to.deep.equal(store);
  });

  it('should render a router with the history prop and route list', () => {
    const wrapper = shallow(<RootContainer history={history} store={store} />);

    const props =
      wrapper
        .find(Router)
        .props();

    expect(props.history).to.equal(history);
    expect(props.routes).to.equal(routes);
  });
});
