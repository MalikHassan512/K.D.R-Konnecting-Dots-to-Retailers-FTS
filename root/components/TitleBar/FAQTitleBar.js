import {Pressable, StyleSheet, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import FLEX_STYLE from "../../Styles/FLEXSTYLE";
import Constants from "expo-constants";
import COLOR from "../../Styles/Color";
import SHADOWS from "../../Styles/shadows";
import TextKdr from "../Text";
import HEADINGS from "../../Styles/heading";
import {StatusBar} from "expo-status-bar";
import SearchInput from "../SearchInput/SearchInput";


export default function FAQTitleBar({navigation, title,search,setSearch, ...props}) {

    return (
        <View style={[styles.container, FLEX_STYLE.row, SHADOWS.shadowSm]}>
            <StatusBar backgroundColor={"white"} style={"dark"}/>
            <Pressable onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={28} color="black"/>
            </Pressable>
            <TextKdr style={[HEADINGS.H3, {marginStart: 10, flex: 1}]}>{title}</TextKdr>
            <SearchInput search={search} setSearch={setSearch} style={{borderWidth: 1, flex: 3, borderColor: COLOR.gray_700}} hideRightIcon={false}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,
        backgroundColor: COLOR.white,
        padding: 10,
        alignItems: "center",
        paddingVertical: 15,
    }
});