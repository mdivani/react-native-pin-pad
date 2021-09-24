import * as React from 'react';
import renderer from 'react-test-renderer';
import {render, fireEvent, cleanup} from '@testing-library/react-native';

import PinPad from '../../PinPad';

beforeEach(cleanup);

it(`renders correctly`, () => {
    const tree = renderer.create(<PinPad theme="dark" />).toJSON();
    expect(tree).toMatchSnapshot();
});

it("renders 10 buttons for numbers", () => {
    const {getAllByTestId} = render(<PinPad theme="dark" />);
    expect(getAllByTestId("num-pad").length).toEqual(10);
});

it("calls submit when 4th pin is set", () => {
    const handleSubmitMock = jest.fn();
    const {getAllByTestId} = render(<PinPad theme="dark" onSubmit={handleSubmitMock} />);
    const pinPad = getAllByTestId("num-pad")[0];
    fireEvent(pinPad, "onPress");
    fireEvent(pinPad, "onPress");
    fireEvent(pinPad, "onPress");
    fireEvent(pinPad, "onPress");

    expect(handleSubmitMock).toHaveBeenCalled();
});

it("calls onChange when pin is set", () => {
    const handleChangeMock = jest.fn();
    const {getAllByTestId} = render(<PinPad theme="dark" onChange={handleChangeMock} />);
    const pinPad = getAllByTestId("num-pad")[0];
    fireEvent(pinPad, "onPress");
    fireEvent(pinPad, "onPress");

    expect(handleChangeMock).toHaveBeenCalledTimes(2);
});

it("calls submit with correct pin", () => {
    const handleSubmitMock = jest.fn();
    const {getAllByTestId} = render(<PinPad theme="dark" onSubmit={handleSubmitMock} />);;
    fireEvent(getAllByTestId("num-pad")[0], "onPress");
    fireEvent(getAllByTestId("num-pad")[3], "onPress");
    fireEvent(getAllByTestId("num-pad")[6], "onPress");
    fireEvent(getAllByTestId("num-pad")[9], "onPress");

    expect(handleSubmitMock).toHaveBeenCalledWith("1470");
});