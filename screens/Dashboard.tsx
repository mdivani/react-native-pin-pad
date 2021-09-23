import axios from 'axios';
import React, { useContext, useState } from 'react';
import { ActivityIndicator, Alert, Pressable } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text } from '../components/Themed';
import { AuthContext } from '../context/authContext';

export default function Dashboard() {
    const [fetching, setFetching] = useState(false);
    const auth = useContext(AuthContext);

    const logout = async () => {
        try {
            setFetching(true);
            const response = await axios.post(
                "http://localhost:3000/logout",
                {},
                {
                    headers: {Authorization: auth.token},
                },
            );
            setFetching(false);

            if (response.status === 200) {
                auth.setToken("");
            }
        } catch (ex) {
            setFetching(false);
            Alert.alert("Failed to logout", "Please try again later");
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hi, Welcome</Text>
            <Pressable onPress={logout} style={styles.button}>
                {
                    fetching ?
                    <ActivityIndicator /> :
                    <Text style={styles.buttonTitle}>Logout</Text>
                }
            </Pressable>
        </View>
    );
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: "2rem"
    },
    title: {
        fontSize: "2.5rem",
    },
    button: {
        borderWidth: 1,
        borderColor: "white",
        paddingVertical: "1rem",
        paddingHorizontal: "2rem",
        marginVertical: "2rem",
        width: "100%",
        alignItems: "center",
    },
    buttonTitle: {
        fontSize: "2rem",
    }
});
