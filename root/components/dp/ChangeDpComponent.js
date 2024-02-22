import {StyleSheet, View, Pressable, Image} from "react-native";
import COLOR from "../../Styles/Color";
import SHADOWS from "../../Styles/shadows";
import TextKdr from "../Text";
import HEADINGS from "../../Styles/heading";
import MARGINS from "../../Styles/MARGIN";
import FLEX_STYLE from "../../Styles/FLEXSTYLE";

const IMAGE_SIZE = 110;


export default function ChangeDpComponent({navigation, style, source, ...props}) {

    return (
        <View style={[styles.container, style]}>
            <Pressable style={[SHADOWS.shadowSm, styles.dpContainer,FLEX_STYLE.center]} {...props}>
                <Image source={source} style={[styles.dp]}/>
            </Pressable>
            <TextKdr style={[HEADINGS.p, HEADINGS.underline, MARGINS.v10]}>Change profile photo</TextKdr>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    dpContainer: {
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
        borderRadius: IMAGE_SIZE / 2,

        backgroundColor: COLOR.gray_900,
    }, dp: {
        width: IMAGE_SIZE - 4,
        height: IMAGE_SIZE - 4,
        borderRadius: IMAGE_SIZE - 4 / 2,
        backgroundColor: COLOR.gray_900,
    },
});