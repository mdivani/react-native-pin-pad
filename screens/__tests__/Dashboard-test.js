import * as React from 'react';
import renderer from 'react-test-renderer';
import {render, fireEvent, cleanup} from '@testing-library/react-native';

import Dashboard from '../Dashboard';

beforeEach(cleanup);

it(`renders correctly`, () => {
    const tree = renderer.create(<Dashboard />).toJSON();
    expect(tree).toMatchSnapshot();
});