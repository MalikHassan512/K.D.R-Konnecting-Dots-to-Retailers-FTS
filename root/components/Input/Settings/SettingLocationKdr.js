import {StyleSheet, View} from "react-native";
import React from "react";
import SettingInputBase from "./SettingInputBase";
import {TextInput} from "react-native-gesture-handler";
import TextKdr from "../../Text";


export default function SettingLocationKdr({
                                                navigation,
                                                style,
                                                placeholder,
                                                error,
                                                textStyle,
                                                leftIcon,
                                                rightIcon,
                                                value,
                                                ...props
                                            }) {
    console.log(props.value);
    return (
        <>
            <SettingInputBase style={[styles.container, {

                paddingVertical:  15,
                borderColor: error?.length > 0 ? "red" : "gray",
            }, style]} inputValue={props.value} placeholder={placeholder}>
                {leftIcon}
                <TextKdr 
                style={[styles.input,{
                    color: error?.length > 0 ? "red" : "black",
                }, textStyle]}
                          {...props}>{value}</TextKdr>
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