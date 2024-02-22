import {View, StyleSheet, Pressable} from "react-native";
import shadows from "../../Styles/shadows";
import {Ionicons} from "@expo/vector-icons";

export default function LikeButton({style, size, isLiked, setLiked, ...props}) {
    let SIZE = size ? size : 30;
    const sizeStyle = {
        height: SIZE,
        width: SIZE,
        borderRadius: SIZE / 2,
    }
    const ICON = isLiked ? "heart" : "heart-outline";

    return (
        <Pressable style={[styles.container, sizeStyle, shadows.shadowSm, style]} {...props}>
            <Ionicons name={ICON} size={(SIZE + 7) / 2} color={isLiked ? "#E83D23" : "#999999"}/>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        position: "absolute",
        right: 10,
        justifyContent: "center",
        alignItems: "center",
        bottom: 10,
    }
})