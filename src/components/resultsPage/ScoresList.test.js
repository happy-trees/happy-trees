import React from 'react';
import { shallow } from 'enzyme';
import ScoresList from './ScoresList';

describe('ScoresList Input', () => {
  it('renders ScoresList component', () => {
    const wrapper = shallow(<ScoresList />);
    expect(wrapper).toMatchSnapshot();
  });
});
