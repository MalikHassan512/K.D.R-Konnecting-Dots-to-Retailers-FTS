import {Pressable, StyleSheet, View} from "react-native";
import React from "react";
import SettingInputBase from "./SettingInputBase";
import {TextInput} from "react-native-gesture-handler";
import {Ionicons} from "@expo/vector-icons";


export default function SettingPasswordTextInputKdr({navigation, style, placeholder, textStyle, ...props}) {
    const [value, onChangeText] = React.useState('');
    const [isSecure, setIsSecure] = React.useState(true);

    return (
        <SettingInputBase style={[styles.container, {
            paddingVertical: value?.length > 0 ? 5 : 10,
        }, style]} inputValue={value} placeholder={placeholder}>
            <TextInput style={[styles.input, textStyle]}
                       onChangeText={text => onChangeText(text)}
                        secureTextEntry={isSecure}
                       placeholder={placeholder} {...props}/>
            <Pressable style={[styles.icon]} onPress={() => setIsSecure(!isSecure)}>
                {isSecure ? <Ionicons name="md-eye-off-outline" size={24} color="#AAAAAA"/> :
                    <Ionicons name="md-eye-outline" size={24} color="#AAAAAA"/>}
            </Pressable>
        </SettingInputBase>
    )
}

const styles = StyleSheet.create({
    container: {},
    input: {
        flex: 1,
    }
});