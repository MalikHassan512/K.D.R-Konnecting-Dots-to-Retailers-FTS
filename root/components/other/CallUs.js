import {StyleSheet, View, Image, Pressable} from "react-native";
import TextKdr from "../Text";
import ContactNumber from "../../other/satticString";

const Size = 50;

export default function CallUs({navigation, style, ...props}) {

    return (
        <Pressable style={[styles.container, style]} {...props}>
            <View style={[styles.iconContainer]}>
                <Image source={require("../../../assets/img/call.png")} style={[styles.icon]}/>
            </View>
            <View style={styles.numberContainer}>
                <TextKdr>Call us</TextKdr>
                <TextKdr style={{
                    fontSize: 12,
                }}>{ContactNumber}</TextKdr>
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