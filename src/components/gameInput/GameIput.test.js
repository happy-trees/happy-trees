import React from 'react';
import { shallow } from 'enzyme';
import GameInput from './GameInput';

describe('Game Input', () => {
  it('renders Game input component', () => {
    const wrapper = shallow(<GameInput />);
    expect(wrapper).toMatchSnapshot();
  });
});
