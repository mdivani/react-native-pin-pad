import * as React from 'react';
import renderer from 'react-test-renderer';
import {render, fireEvent} from '@testing-library/react-native';

import { IconPad } from '../../PinPad';

it(`renders correctly`, () => {
    const tree = renderer.create(<IconPad iconName="backspace" theme="dark" />).toJSON();
    expect(tree).toMatchSnapshot();
});

it("calls press handler onPress", () => {
    const onPressMock = jest.fn();
    const {getByTestId} = render(<IconPad iconName="backspace" theme="dark" onPress={onPressMock} />);
    fireEvent(getByTestId("icon-pad"), "onPress");
    expect(onPressMock).toHaveBeenCalled();
});
