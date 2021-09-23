import { Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

export const { width: screenWidth, height: screenHeight } = Dimensions.get(
    "window",
);

export default () => {
    EStyleSheet.build({
        $rem: screenWidth > 340 ? screenWidth > 800 ? 14 : 10 : 8,
    });
}