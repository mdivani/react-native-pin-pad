import React, { useMemo } from "react";
import { Pressable } from "react-native";
import { Text } from '../Themed';
import { Styles } from "./styles";

export interface INumPadProps {
    theme: "light" | "dark";
    number: string;
    onPress: (num: string) => void;
}

export default function NumPad({number = "", theme, onPress}: INumPadProps) {
    const styles = useMemo(() => Styles(theme), []);

    const handlePress = () => {
        onPress(number);
    }

    return (
        <Pressable
            disabled={!number}
            testID="num-pad"
            onPress={handlePress}
            style={[styles.pad, styles.numPad]}
        >
            <Text style={styles.padText}>{number}</Text>
        </Pressable>
    );
}