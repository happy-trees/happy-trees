import React from 'react';
import { shallow } from 'enzyme';
import GamePage from './GamePage';

describe('Game component', () => {
  it('renders Game page', () => {
    const wrapper = shallow(<GamePage />);
    expect(wrapper).toMatchSnapshot();
  });
});
