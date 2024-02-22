import {Feather} from "@expo/vector-icons";
import {View, StyleSheet, Pressable} from "react-native";
import shadows from "../../Styles/shadows";
import COLOR from "../../Styles/Color";
export default function IconButton({style, size,ICON,leftAlign, ...props}) {
    let SIZE = size ? size : 30;
    const sizeStyle = {
        height: SIZE,
        width: SIZE
    }

    return (
        <Pressable style={[styles.container, sizeStyle,  style]} {...props}>
            <Feather name={ICON} size={(SIZE + 7) / 2} color={COLOR.gray_500}/>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    container: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        bottom: 10,
    }
})