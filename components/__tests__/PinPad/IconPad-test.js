import * as React from 'react';
import renderer from 'react-test-renderer';

import { IconPad } from '../../PinPad';

it(`renders correctly`, () => {
    const tree = renderer.create(<IconPad iconName="backspace" theme="dark" />).toJSON();
    expect(tree).toMatchSnapshot();
});
