import {StyleSheet, View} from "react-native";
import {Entypo} from '@expo/vector-icons';
import COLOR from "../../Styles/Color";
import TextKdr from "../Text";
import HEADINGS from "../../Styles/heading";
import MARGINS from "../../Styles/MARGIN";

export default function NoData({navigation, text, ICON, ...props}) {

    return (
        <View style={[styles.container]}>
            {ICON ? ICON : <Entypo name="emoji-sad" size={40} color={COLOR.primary}/>}
            <TextKdr style={[HEADINGS.H3, {
                color: COLOR.primary,

            }, MARGINS.v10]}>
                {text?text:"No Services Found"}
            </TextKdr>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
    }
});