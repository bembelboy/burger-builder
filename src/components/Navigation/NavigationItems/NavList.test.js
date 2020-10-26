import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import NavList from './NavList';
import NavItem from './NavItem';
import React, { Component } from 'react';

configure ({adapter: new Adapter()})

describe('<NavList/>' , () => {
    it('should render two items if not authenticated', () => {
        const wrapper = shallow(<NavList />);
        expect(wrapper.find(NavItem)).toHaveLength(2);
    });
});