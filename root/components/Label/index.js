import TextKdr from "../Text";
import {StyleSheet} from "react-native";

export default function LabelKdr({children, style, ...props}) {

    return (
        <TextKdr style={[styles.container, style]} {...props}>
            {children}
        </TextKdr>

    )
}

const styles = StyleSheet.create({
    container: {
        fontSize: 16,
    }
});