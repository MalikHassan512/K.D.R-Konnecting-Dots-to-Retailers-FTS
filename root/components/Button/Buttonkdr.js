import {StyleSheet, Pressable, View} from "react-native";
import TextKdr from "../Text";


export default function ButtonKdr({children, innerStyle,textStyle, text, style, ...props}) {

    return (
        <Pressable style={[styles.container, style]} {...props}>
            <View style={[styles.inner,innerStyle]}>
                {children}
                {text ? <TextKdr style={[styles.text, textStyle]}>{text}</TextKdr> : null}
            </View>
        </Pressable>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#2d8ee6",
        flexDirection: "row",
        padding: 7,
        borderRadius: 10,
    },
    inner: {
        flex: 1,
        justifyContent: "center",
        marginVertical: 10,
        alignItems: "center",
    },
    text: {
        color: "#fff",
        fontSize:16,
    }

});