import EStyleSheet from "react-native-extended-stylesheet";
import Colors from "../../constants/Colors";

export const Styles = (theme: "light" | "dark") => EStyleSheet.create({
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