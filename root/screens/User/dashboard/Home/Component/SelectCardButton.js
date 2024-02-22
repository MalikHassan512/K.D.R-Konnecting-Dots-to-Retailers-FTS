import {Pressable, StyleSheet, View} from "react-native";
import Border from "../../../../../Styles/Border";
import COLOR from "../../../../../Styles/Color";
import getCardType, {hideCardNumber} from "../../../../../other/IdentifyCard";
import TextKdr from "../../../../../components/Text";
import FLEX_STYLE from "../../../../../Styles/FLEXSTYLE";
import HEADINGS from "../../../../../Styles/heading";
import {AntDesign} from "@expo/vector-icons";


export default function SelectCardButton({navigation, selected, id, number, onPress, ...props}) {
    const BackgroundColor = selected ? COLOR.black : COLOR.white;
    const Color = selected ? COLOR.white : COLOR.black;

    return (
        <Pressable style={[styles.container, FLEX_STYLE.row, Border.bdRxl, {backgroundColor: BackgroundColor}]}
                   onPress={() => onPress(id)} {...props}>
            {number ? getCardType(number, Color) : null}
            <TextKdr style={[HEADINGS.p, {marginStart: 10, flex: 1, color: Color}]}>
                {number ? hideCardNumber(number) : null}
            </TextKdr>
            {selected ? <AntDesign name="checkcircle" size={24} color={COLOR.Green}/> : null}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        padding: 15,
        paddingHorizontal: 30,
        marginTop: 10,
        borderWidth: 1,
        borderColor: COLOR.gray,
    }

});