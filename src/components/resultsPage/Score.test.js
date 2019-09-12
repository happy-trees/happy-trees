import React from 'react';
import { shallow } from 'enzyme';
import Score from './Score';

describe('Score Input', () => {
  it('renders Score component', () => {
    const wrapper = shallow(<Score />);
    expect(wrapper).toMatchSnapshot();
  });
});
