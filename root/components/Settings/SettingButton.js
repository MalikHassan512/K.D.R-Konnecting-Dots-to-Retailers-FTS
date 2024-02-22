import {Pressable, StyleSheet, View} from "react-native";
import FLEX_STYLE from "../../Styles/FLEXSTYLE";
import COLOR from "../../Styles/Color";
import TextKdr from "../Text";
import HEADINGS from "../../Styles/heading";
import {MaterialIcons} from "@expo/vector-icons";


const MAIN_ICON_SIZE = 45;
const NAV_ICON_SIZE = 40;

export default function SettingButton({
                                          navigation,
                                          title,
                                          icon,
                                          description,
                                          metaDescription,
                                          screenName,
                                          useCustomOnPress,
                                          style,
                                          onPress,
                                          ...props
                                      }) {

    return (<Pressable onPress={() => {
        if (onPress) {
            onPress();
            return;
        }
        navigation.navigate(screenName)
    }} style={[styles.container, FLEX_STYLE.row, style]} {...props}>
        <View style={[styles.mainIcon]}>
            {icon}
        </View>
        <View style={[styles.contentContainer]}>
            <TextKdr style={[HEADINGS.H4]}>{title}</TextKdr>
            <TextKdr style={[HEADINGS.p1]}>{description}</TextKdr>
        </View>
        <TextKdr style={[HEADINGS.p1, {paddingHorizontal: 10}]}>{metaDescription}</TextKdr>
        <View style={[styles.navigationIcon]}>
            <MaterialIcons name="navigate-next" size={24} color="black"/>
        </View>

    </Pressable>)
}

const styles = StyleSheet.create({
    container: {
        padding: 5, justifyContent: "flex-start", alignItems: "center", marginVertical: 7,
    }, mainIcon: {
        width: MAIN_ICON_SIZE,
        height: MAIN_ICON_SIZE,
        borderRadius: MAIN_ICON_SIZE / 2,
        backgroundColor: COLOR.gray_900,
        justifyContent: "center",
        alignItems: "center",
    }, contentContainer: {
        flexDirection: "column", paddingHorizontal: 10, justifyContent: "center", alignItems: "flex-start", flex: 1,
    }, navigationIcon: {
        width: NAV_ICON_SIZE,
        height: NAV_ICON_SIZE,
        borderRadius: 10,
        backgroundColor: COLOR.white,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: COLOR.gray,
    }
});