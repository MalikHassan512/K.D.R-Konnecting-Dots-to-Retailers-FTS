import {Pressable, StyleSheet, View, TextInput} from "react-native";
import COLOR from "../../Styles/Color";
import {Entypo, Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import React from "react";

const BUTTON_SIZE = 40;

export default function ChatInput({navigation, OnPressSend,onFileUpload, ...props}) {
    const [message, setMessage] = React.useState("");

    return (
        <View style={[styles.container]}>
            <Pressable onPress={onFileUpload}>
               <Entypo name="attachment" size={BUTTON_SIZE / 2} color="black"/>
            </Pressable>
            <View style={[styles.input]}>
                <TextInput multiline style={[styles.textInput]} placeholder={"message"}
                           onChangeText={(text) => setMessage(text)} value={message}/>

                {/*<Pressable>*/}
                {/*    <MaterialCommunityIcons name="sticker-emoji" size={BUTTON_SIZE / 2}*/}
                {/*                            color={COLOR.gray}/>*/}
                {/*</Pressable>*/}
            </View>
            <Pressable onPress={() => {
                if (message.trim().length === 0) return
                OnPressSend(message.trim())
                setMessage("")
            }} style={[styles.send]}>
                <Ionicons name="send-outline" size={BUTTON_SIZE / 2} color="white"/>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: COLOR.white,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 22,
    },
    send: {
        backgroundColor: COLOR.black,
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        borderRadius: BUTTON_SIZE / 2,
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        flex: 1,
        padding: 5,
        backgroundColor: COLOR.lightGray,
        marginHorizontal: 12,
        flexDirection: "row",
        borderRadius: 12,
        paddingHorizontal: 12,
        alignItems: "center",

    },
    textInput: {
        marginHorizontal: 12,
        flex: 1,
        maxHeight: 80,
    }
});