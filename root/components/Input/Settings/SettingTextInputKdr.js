import {StyleSheet, View} from "react-native";
import React from "react";
import SettingInputBase from "./SettingInputBase";
import {TextInput} from "react-native-gesture-handler";
import TextKdr from "../../Text";


export default function SettingTextInputKdr({
                                                navigation,
                                                style,
                                                placeholder,
                                                error,
                                                textStyle,
                                                leftIcon,
                                                rightIcon,
                                                ...props
                                            }) {
    const [value, onChangeText] = React.useState('');
    console.log(props.value);
    return (
        <>
            <SettingInputBase style={[styles.container, {

                paddingVertical: value?.length > 0 ? 5 : 10,
                borderColor: error?.length > 0 ? "red" : "gray",
            }, style]} inputValue={props.value} placeholder={placeholder}>
                {leftIcon}
                <TextInput 
                style={[styles.input,{
                    color: error?.length > 0 ? "red" : "black",
                }, textStyle]}
                           onChangeText={text => onChangeText(text)}
                    

                           placeholder={placeholder} {...props}/>
                {rightIcon}
            </SettingInputBase>
            {error?.length > 0 && <TextKdr style={{color: "red"}}>{error}</TextKdr>}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
    },
    input: {
        flex: 1,
    }
});