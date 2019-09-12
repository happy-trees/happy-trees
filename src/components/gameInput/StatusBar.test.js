import React from 'react';
import { shallow } from 'enzyme';
import StatusBar from './StatusBar';

describe('StatusBar', () => {
  it('renders Status Bar component', () => {
    const wrapper = shallow(<StatusBar />);
    expect(wrapper).toMatchSnapshot();
  });
});
