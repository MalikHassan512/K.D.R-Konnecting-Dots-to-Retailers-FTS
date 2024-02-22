import {StyleSheet, View} from "react-native";
import {useState} from "react";
import SelectDropdown from 'react-native-select-dropdown'
import SettingInputBase from "./SettingInputBase";
import {Feather} from "@expo/vector-icons";
import FLEX_STYLE from "../../../Styles/FLEXSTYLE";


export default function DropDownInputKdrMaterial({
                                                     style,
                                                     label,
                                                     error,
                                                     children,
                                                     data,
                                                     ...props
                                                 }) {

    return (
        <SettingInputBase style={[styles.container,style]}
                          innerStyle={[FLEX_STYLE.center]}
                          inputValue={props.value} placeholder={label}
                          error={error}>
            <SelectDropdown
                data={data}
                onSelect={(selectedItem, index) => {
                    props.setValue(selectedItem)
                }}
                defaultValue={props.value}
                
                defaultButtonText={label}
                buttonStyle={{
                    flex: 1,
                    backgroundColor: "transparent",
                    padding: 0,
                    height: 34,
                }}
                buttonTextStyle={{
                    color: "#000",
                    textAlign: "left",
                    fontSize: 16,
                    margin: 0,
                    marginStart: -7,
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item
                }}
            />
            <Feather name="chevron-down" size={24} color="black"/>
        </SettingInputBase>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {

    }
});