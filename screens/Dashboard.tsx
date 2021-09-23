import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Pressable } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text } from '../components/Themed';
import { AuthContext } from '../context/authContext';
import { FetchState, useFetch } from '../hooks/useFetch';

export default function Dashboard() {
    const [{error}, logoutRequest, fetchState] = useFetch();
    const auth = useContext(AuthContext);

    useEffect(() => {
        if (error) {
            Alert.alert("Failed to logout", `${error.error}. Please try again later`);
        }
    }, [error]);

    const logout = async () => {
        logoutRequest({
            url: "logout",
            method: "POST",
            authToken: auth.token,
        }, () => auth.setToken(""));
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hi, Welcome</Text>
            <Pressable onPress={logout} style={styles.button}>
                {
                    fetchState === FetchState.fetching ?
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
