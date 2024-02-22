import {StyleSheet, View} from "react-native";
import COLOR from "../../../Styles/Color";
import TextKdr from "../../Text";


export default function SettingInputBase({navigation, style, innerStyle, children, inputValue, placeholder, ...props}) {

    return (
        <View style={[styles.container, style]}>
            {inputValue?.length > 0 ? <TextKdr style={[styles.placeholder]}>{placeholder}</TextKdr> : null}
            <View style={[{flex: 1, flexDirection: "row"}, innerStyle]}>
                {children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        borderWidth: 1,
        marginVertical: 5,
        borderColor: COLOR.gray,
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
    placeholder: {
        color: COLOR.gray_800,
        fontSize: 12,
    }
});