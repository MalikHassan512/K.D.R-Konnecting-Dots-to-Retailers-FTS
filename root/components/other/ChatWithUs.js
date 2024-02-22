import {StyleSheet, View, Image, Pressable} from "react-native";
import TextKdr from "../Text";
import ContactNumber from "../../other/satticString";
import {Ionicons} from "@expo/vector-icons";

const Size = 50;

export default function ChatWithUs({navigation, style, ...props}) {

    return (
        <Pressable style={[styles.container, style]} onPress={() => {
            if (navigation === undefined) return;
            navigation.navigate("EntryChat", {
                screen: "HelpAndSupportChat"
            })
        }} {...props}>
            <View style={[styles.iconContainer]}>
                <Ionicons name="chatbubbles" size={20} color="#E83D23"/>
            </View>
            <View style={styles.numberContainer}>
                <TextKdr>Chat with us</TextKdr>
            </View>

        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    iconContainer: {
        width: Size,
        height: Size,
        borderRadius: Size / 2,
        backgroundColor: "white",
        justifyContent: 'center',
        alignItems: 'center',

    },
    icon: {},
    numberContainer: {
        marginHorizontal: 10,

    }
});