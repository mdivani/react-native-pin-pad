import * as React from 'react';
import renderer from 'react-test-renderer';
import {render, fireEvent, cleanup} from '@testing-library/react-native';

import PinScreen from '../PinScreen';

beforeEach(cleanup);

it(`renders correctly`, () => {
    const tree = renderer.create(<PinScreen />).toJSON();
    expect(tree).toMatchSnapshot();
});