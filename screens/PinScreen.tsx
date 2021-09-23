import React, { useCallback, useContext, useRef, useState } from 'react';
import axios from "axios";
import { View } from '../components/Themed';
import EStyleSheet from 'react-native-extended-stylesheet';
import PinPad from '../components/PinPad';
import useColorScheme from '../hooks/useColorScheme';
import { AuthContext } from '../context/authContext';
import { ActivityIndicator } from 'react-native';

export default function PinScreen() {
    const [state, setState] = useState({error: "", fetching: false});
    const auth = useContext(AuthContext);
    const pinPadRef = useRef<any>();
    const theme = useColorScheme();

    const handleSubmit = useCallback(async (pin: string) => {
        try {
            setState((prev) => ({...prev, fetching: true}))
            const response = await axios.post("http://localhost:3000/login", {pin});
            if (response.status === 200 && response.data.token) {
                const token = response.data.token;
                setState({fetching: false, error: ""});
                auth.setToken(token);
            } else {
                setState({fetching: false, error: "Oops something went wrong"});
                resetPin();                
            }
        } catch (ex: any) {
            if (ex.response && ex.response.status === 403) {
                setState({fetching: false, error: "Incorrect pin"});
                resetPin();
            } else {
                setState({fetching: false, error: "Try Again"});
            }
        }
    }, []);

    const resetPin = () => {
        if (pinPadRef && pinPadRef.current) {
            pinPadRef.current.reset();
        }
    }

    return (
        <View style={styles.container}>
            {
                state.fetching ?
                <ActivityIndicator /> :
                <PinPad
                    ref={pinPadRef}
                    onSubmit={handleSubmit}
                    onChange={() => setState((prev) => ({...prev, error: ""}))}
                    theme={theme}
                    errorMessage={state.error} />
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