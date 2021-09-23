import * as React from 'react';
import renderer from 'react-test-renderer';

import PinPad from '../../PinPad';

it(`renders correctly`, () => {
    const tree = renderer.create(<PinPad theme="dark" />).toJSON();
    expect(tree).toMatchSnapshot();
});
