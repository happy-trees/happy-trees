import React from 'react';
import { shallow } from 'enzyme';
import Game from './Gamepage';

describe('Game component', () => {
  it('renders Game page', () => {
    const wrapper = shallow(<Game />);
    expect(wrapper).toMatchSnapshot();
  });
});
