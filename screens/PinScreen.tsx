import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View } from '../components/Themed';
import PinPad, { IPinPad } from '../components/PinPad/PinPad';
import useColorScheme from '../hooks/useColorScheme';
import { FetchState, useFetch } from '../hooks/useFetch';
import { AuthContext } from '../context/authContext';

export default function PinScreen() {
    const [{data, error}, loginRequest, fetchStatus] = useFetch<{token: string}>();
    const [errorMessage, setErrorMessage] = useState("");
    const auth = useContext(AuthContext);
    const pinPadRef = useRef<IPinPad>();
    const theme = useColorScheme();

    useEffect(() => {
        if (data) {
            auth.setToken(data.token);
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            if (error.error === "INCORRECT_PIN") {
                setErrorMessage("Incorrect pin");
                resetPin();
            } else {
                setErrorMessage("Try again later");
            }
        }
    }, [error]);

    const handleSubmit = useCallback((pin: string) => {
        loginRequest({
            url: "/login",
            method: "POST",
            data: {pin},
        });
    }, [loginRequest]);

    const resetPin = () => {
        if (pinPadRef && pinPadRef.current) {
            pinPadRef.current.reset();
        }
    }

    return (
        <View style={styles.container}>
            {
                fetchStatus === FetchState.fetching ?
                <ActivityIndicator /> :
                <PinPad
                    ref={pinPadRef}
                    onSubmit={handleSubmit}
                    onChange={() => setErrorMessage("")}
                    theme={theme}
                    errorMessage={errorMessage} />
            }
        </View>
    );
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});