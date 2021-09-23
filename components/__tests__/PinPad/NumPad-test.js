import * as React from 'react';
import renderer from 'react-test-renderer';

import { NumPad } from '../../PinPad';

it(`renders correctly`, () => {
    const tree = renderer.create(<NumPad number="1" theme="dark" />).toJSON();
    expect(tree).toMatchSnapshot();
});

it("returns correct number on Press");