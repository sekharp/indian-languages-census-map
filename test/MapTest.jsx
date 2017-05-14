import UnitedStatesMap from './../src/UnitedStatesMap';
import React from 'react'
import {mount, render, shallow} from 'enzyme'

const wrapper = mount(<UnitedStatesMap />) // mount/render/shallow when applicable

expect(wrapper.find(App).first()).to.have.props([ 'selectedLanguage' ])
// expect(wrapper.find(User).first()).to.not.have.props([ 'invalid' ])


// expect(wrapper.find(User).first()).to.have.props({ index: 1 })
// expect(wrapper.find(User).first()).to.not.have.props({ index: 2 })

// expect(wrapper.find(User).first()).to.have.props([ 'index', 'user' ]).deep.equal([ 1, { name: 'Jane' } ])