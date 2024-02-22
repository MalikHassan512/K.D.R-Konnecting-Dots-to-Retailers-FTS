import {Pressable, StyleSheet, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import FLEX_STYLE from "../../Styles/FLEXSTYLE";
import Constants from "expo-constants";
import COLOR from "../../Styles/Color";
import SHADOWS from "../../Styles/shadows";
import TextKdr from "../Text";
import HEADINGS from "../../Styles/heading";
import {StatusBar} from "expo-status-bar";


export default function TitleBar({navigation, title, ...props}) {
    return (
        <View style={[styles.container, FLEX_STYLE.row]}>
            <StatusBar backgroundColor={"white"} style={"dark"}/>
            <Pressable onPress={() =>{
                if(props.specificBack){
                    navigation.navigate(props.specificBack)

                }
                else{
                    navigation.goBack()
                }
            }}>
                <Ionicons name="chevron-back" size={28} color="black"/>
            </Pressable>
            <TextKdr style={[HEADINGS.H3, {marginStart: 10}]}>{title}</TextKdr>
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