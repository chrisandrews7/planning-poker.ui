import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import React from 'react';
import fakeStore from '../mocks/fakeStore';

export default function (Component, state, props) {
  const store = fakeStore(state);

  return mount(
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );
}
