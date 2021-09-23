import React, { forwardRef, useCallback, useImperativeHandle, useMemo } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import {useStateWithCallback} from '../../hooks/useStateWithCallback';
import { View, Text } from '../Themed';
import { Styles } from './styles';
import NumPad from './NumPad';
import IconPad from './IconPad';

export interface IPinPadProps {
    theme: "light" | "dark";
    errorMessage?: string;
    onSubmit?: (pin: string) => void;
    onChange?: (pin: string) => void;
}

export interface IPinPad {
    reset: () => void;
}

function PinPad({theme, errorMessage = "", onSubmit, onChange}: IPinPadProps, ref: React.Ref<IPinPad | undefined>) {
    const [pin, setPin] = useStateWithCallback("");
    const styles = useMemo(() => Styles(theme), [theme]);

    useImperativeHandle(ref, () => ({
        reset: () => setPin(""),
    }));

    const Input = useMemo(() => {
        return (
            <View style={styles.row}>
                <TextInput style={styles.input} secureTextEntry={true} editable={false} value={pin[0]} />
                <TextInput style={styles.input} secureTextEntry={true} editable={false} value={pin[1]} />
                <TextInput style={styles.input} secureTextEntry={true} editable={false} value={pin[2]} />
                <TextInput style={styles.input} secureTextEntry={true} editable={false} value={pin[3]} />
            </View>
        )
    }, [pin]);

    const handlePress = useCallback((num: string) => {
        if (pin.length < 4) {
            setPin(pin + num, (updatedPin) => {
                if (updatedPin.length === 4 && onSubmit) {
                    onSubmit(updatedPin);
                } else if (onChange) {
                    onChange(updatedPin);
                }
            });
        }
    }, [pin, onSubmit, onChange]);

    const handleDelete = useCallback(() => {
        if (pin.length > 0) {
            setPin(pin.slice(0, pin.length - 1), (udpatedPin) => {
                if (onChange) {
                    onChange(udpatedPin);
                }
            });
        }
    }, [pin]);

    return (
        <View style={styles.container}>
            {Input}
            <View style={styles.row}>
                <NumPad theme={theme} onPress={handlePress} number="1" />
                <NumPad theme={theme} onPress={handlePress} number="2" />
                <NumPad theme={theme} onPress={handlePress} number="3" />
            </View>
            <View style={styles.row}>
                <NumPad theme={theme} onPress={handlePress} number="4" />
                <NumPad theme={theme} onPress={handlePress} number="5" />
                <NumPad theme={theme} onPress={handlePress} number="6" />
            </View>
            <View style={styles.row}>
                <NumPad theme={theme} onPress={handlePress} number="7" />
                <NumPad theme={theme} onPress={handlePress} number="8" />
                <NumPad theme={theme} onPress={handlePress} number="9" />
            </View>
            <View style={styles.row}>
                <IconPad theme={theme} />
                <NumPad theme={theme} onPress={handlePress} number="0" />
                <IconPad theme={theme} onPress={handleDelete} iconName="backspace" />
            </View>
            <View style={styles.row}>
                <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
        </View>
    );
}

export default forwardRef(PinPad);
