import {Text, StyleSheet} from "react-native";

export default function TextKdr({children, style, ...props}) {

    return (
        <Text style={[styles.container, style]} {...props}>
            {children}
        </Text>

    )
}

const styles = StyleSheet.create({
    container: {

    }

});
