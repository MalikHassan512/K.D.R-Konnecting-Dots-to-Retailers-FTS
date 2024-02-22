import {Linking, Pressable, StyleSheet, View} from "react-native";
import TitleBar from "../../../../../components/TitleBar/TitleBar";
import TextKdr from "../../../../../components/Text";
import HEADINGS from "../../../../../Styles/heading";
import FLEX_STYLE from "../../../../../Styles/FLEXSTYLE";
import RoundedInputBase from "../../../../../components/Input/RoundedInputBase";
import MARGINS from "../../../../../Styles/MARGIN";
import PADDINGS from "../../../../../Styles/PADDINGS";
import COLOR from "../../../../../Styles/Color";
import RoundButtonKdr from "../../../../../components/Button/roundButton";
import {Entypo, Ionicons} from "@expo/vector-icons";
import {Menu, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";
import * as Clipboard from 'expo-clipboard';

import {useRef} from "react";
import {APP_LINK} from "../../../../../settings/settings";
import Toast from "react-native-toast-message";


function InviteMenu() {
    const ref = useRef();
    return (
        <Menu ref={ref}>
            <MenuTrigger
                customStyles={{
                    triggerWrapper: {}
                }}
            >
                <RoundButtonKdr onPress={() => ref.current.open()} ButtonSize={50}
                                style={[{backgroundColor: COLOR.primary, borderWidth: 0, marginBottom: 15}]}>
                    <Ionicons name="share-social" size={20} color={COLOR.white}/>
                </RoundButtonKdr>
            </MenuTrigger>
            <MenuOptions optionsContainerStyle={MenuStyle.menuOptions}>
                <Pressable
                    onPress={() => {
                        Linking.openURL('https://www.facebook.com/sharer/sharer.php?u=' + APP_LINK)
                    }}
                    style={[MenuStyle.option, FLEX_STYLE.center]}>
                    <Entypo name="facebook-with-circle" size={20} color="#15A3FA"/>
                    <TextKdr style={{marginStart: 4, fontSize: 12, flex: 1}}>Facebook</TextKdr>
                </Pressable>
                <Pressable
                    onPress={() => {
                        Linking.openURL('https://www.instagram.com/?url=' + APP_LINK)
                    }}
                    style={[MenuStyle.option, FLEX_STYLE.center]}>
                    <Entypo name="instagram-with-circle" size={20} color={COLOR.primary}/>
                    <TextKdr style={{marginStart: 4, fontSize: 12, flex: 1}}>Instagram</TextKdr>
                </Pressable>
                <Pressable
                    onPress={() => {
                        Linking.openURL('https://www.linkedin.com/shareArticle?mini=true&url=' + APP_LINK)
                    }}

                    style={[MenuStyle.option, FLEX_STYLE.center]}>
                    <Entypo name="linkedin-with-circle" size={20} color="#0077B5"/>
                    <TextKdr style={{marginStart: 4, fontSize: 12, flex: 1}}>Linkedin</TextKdr>
                </Pressable>
                <Pressable
                    onPress={() => {
                        Linking.openURL('https://twitter.com/intent/tweet?text=' + APP_LINK)
                    }}
                    style={[MenuStyle.option, FLEX_STYLE.center]}>
                    <Entypo name="twitter-with-circle" size={20} color={"#1D9BF0"}/>
                    <TextKdr style={{marginStart: 4, fontSize: 12, flex: 1}}>Twitter</TextKdr>
                </Pressable>
                <Pressable
                    onPress={() => {
                        Linking.openURL('mailto:?subject=KDR&body=' + APP_LINK)

                    }}
                    style={[MenuStyle.option, FLEX_STYLE.center]}>
                    <Entypo name="mail-with-circle" size={20} color="red"/>
                    <TextKdr style={{marginStart: 4, fontSize: 12, flex: 1}}>Email</TextKdr>
                </Pressable>

            </MenuOptions>
        </Menu>
    )
}

const MenuStyle = StyleSheet.create({
    menuOptions: {
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        marginTop: 60,

    },
    option: {
        borderBottomWidth: 1,
        borderColor: COLOR.gray_800,
        marginTop: 7,
        flexDirection: "row",
        paddingBottom: 5,


    },
    checkBoxStyle: {
        borderWidth: 1,
        width: 15,
        height: 15,

    },
    ButtonStyle: {
        padding: 0,
        flex: null,
        width: "50%",
        marginTop: 10,
    }
});

export default function InviteFriends({navigation, ...props}) {

    return (
        <View style={[styles.container]}>
            <TitleBar title="Invite" navigation={navigation}/>
            <View style={[styles.contentContainer]}>
                <TextKdr style={[HEADINGS.H4]}>Share with your friends</TextKdr>
                <View style={[styles.shareContainer, FLEX_STYLE.rowCenter]}>
                    <RoundedInputBase containerStyle={[MARGINS.v14, MARGINS.H6]}
                                      outlineStyle={[FLEX_STYLE.rowCenter, PADDINGS.H14]}>
                        <TextKdr
                            style={[HEADINGS.H4, PADDINGS.H8, {
                                color: COLOR.gray_800,
                                flex: 1
                            }]}>{APP_LINK}</TextKdr>
                        <RoundButtonKdr
                            onPress={() => {
                                Clipboard.setStringAsync(APP_LINK);
                                Toast.show({
                                    type: "success",
                                    text1: "Copied",
                                    text2: "Link Copied to Clipboard",
                                });

                            }}

                            ButtonSize={40} style={{backgroundColor: COLOR.gray_1000}}>
                            <Ionicons name="copy" size={18} color={COLOR.white}/>
                        </RoundButtonKdr>
                    </RoundedInputBase>
                    <InviteMenu/>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: 35,
        paddingTop: 40,
    },
    shareContainer: {
        justifyContent: "center",
        alignItems: "center",

    }
});