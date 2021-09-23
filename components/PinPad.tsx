import React, { forwardRef, useCallback, useImperativeHandle, useMemo } from 'react';
import {FontAwesome5} from "@expo/vector-icons";
import { Pressable } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { TextInput } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import {useStateWithCallback} from '../hooks/useStateWithCallback';
import { View, Text } from './Themed';

interface IPinPadProps {
    theme: "light" | "dark";
    errorMessage?: string;
    onSubmit?: (pin: string) => void;
    onChange?: (pin: string) => void;
}

function PinPad({theme, errorMessage = "", onSubmit, onChange}: IPinPadProps, ref: React.Ref<any>) {
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

interface INumPadProps {
    theme: "light" | "dark";
    number: string;
    onPress: (num: string) => void;
}

export function NumPad({number = "", theme, onPress}: INumPadProps) {
    const styles = useMemo(() => Styles(theme), []);

    const handlePress = () => {
        if (number && onPress) {
            onPress(number);
        }
    }

    return (
        <Pressable onPress={handlePress} style={[styles.pad, styles.numPad]}>
            <Text style={styles.padText}>{number}</Text>
        </Pressable>
    );
}

interface IIconPadProps {
    theme: "light" | "dark";
    iconName?: string;
    onPress?: () => void;
}

export function IconPad({iconName, theme, onPress}: IIconPadProps) {
    const styles = useMemo(() => Styles(theme), []);

    return (
        <Pressable onPress={onPress} style={styles.pad}>
            <FontAwesome5 style={styles.padIcon} name={iconName} />
        </Pressable>
    );
}

const Styles = (theme: "light" | "dark") => EStyleSheet.create({
    container: {
        flex: 1,
        maxWidth: "30rem",
        maxHeight: "50rem",
        alignSelf: "center",
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
    },
    pad: {
        width: "30%",
        aspectRatio: 1,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: "1rem",
    },
    numPad: {
        borderBottomWidth: 1,
        borderBottomColor: Colors[theme].tint,
    },
    padText: {
        fontSize: "3rem",
    },
    errorText: {
        fontSize: "2rem",
        color: "red",
    },
    padIcon: {
        fontSize: "2rem",
        color: Colors[theme].text,
    },
    input: {
        fontSize: "3rem",
        width: "2rem",
        marginHorizontal: ".5rem",
        color: Colors[theme].text,
        borderBottomWidth: 1,
        borderBottomColor: Colors[theme].tint,
    }
});
