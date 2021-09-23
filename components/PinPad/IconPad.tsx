import { FontAwesome5 } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { Pressable } from "react-native";
import { Styles } from "./styles";

export interface IIconPadProps {
    theme: "light" | "dark";
    iconName?: string;
    onPress?: () => void;
}

export default function IconPad({iconName, theme, onPress}: IIconPadProps) {
    const styles = useMemo(() => Styles(theme), []);

    return (
        <Pressable onPress={onPress} style={styles.pad}>
            <FontAwesome5 style={styles.padIcon} name={iconName} />
        </Pressable>
    );
}