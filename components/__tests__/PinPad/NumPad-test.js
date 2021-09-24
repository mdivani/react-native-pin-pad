import * as React from 'react';
import renderer from 'react-test-renderer';
import {render, fireEvent} from '@testing-library/react-native';

import { NumPad } from '../../PinPad';

it(`renders correctly`, () => {
    const tree = renderer.create(<NumPad number="1" theme="dark" />).toJSON();
    expect(tree).toMatchSnapshot();
});

it("returns correct number on Press", () => {
    const onPressMock = jest.fn();
    const {getByTestId} = render(<NumPad number="2" theme="dark" onPress={onPressMock} />);
    fireEvent(getByTestId("num-pad"), "onPress");
    expect(onPressMock).toHaveBeenCalledWith("2");
});

it("doesn't fire onPress event if numbers not a truthy value", () => {
    const onPressMock = jest.fn();
    const {getByTestId} = render(<NumPad theme="dark" onPress={onPressMock} />);
    fireEvent(getByTestId("num-pad"), "onPress");
    expect(onPressMock).not.toHaveBeenCalled();
});