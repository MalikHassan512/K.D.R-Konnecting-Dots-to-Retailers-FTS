import {StyleSheet, Pressable, View} from "react-native";
import FLEX_STYLE from "../../Styles/FLEXSTYLE";


const size = 40;

export default function RoundButtonKdr({children, innerStyle, ButtonSize, style, ...props}) {
    let size = ButtonSize ? ButtonSize : 40;
    let innerSize = size - 30;
    return (
        <Pressable style={[styles.container, FLEX_STYLE.center, style, {
            borderRadius: size / 2,
            height: size,
            width: size,
        }]} {...props}>
            <View style={[styles.inner, innerStyle]}>
                {children}
            </View>
        </Pressable>

    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        borderRadius: size / 2,
        height: size,
        width: size,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#999999",
    },
    inner: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

});