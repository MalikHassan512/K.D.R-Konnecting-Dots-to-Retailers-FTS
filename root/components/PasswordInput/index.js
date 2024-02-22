import {TextInput, View, StyleSheet, Pressable} from "react-native";
import React from "react";
import TextKdr from "../Text";
import LabelKdr from "../Label";
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import COLOR from "../../Styles/Color";
import roundedCircleStyle from "../../Styles/Other";
import FLEX_STYLE from "../../Styles/FLEXSTYLE";

export default function PasswordInputKdr({containerStyle, outlineStyle, label, style, error, ...props}) {
    const styles = StyleSheet.create({
        main: {
            flexDirection: 'column',
            flex: 1,
            padding:3
        },
        container: {
            paddingVertical: 10,
            borderColor: error?.length > 0 ? 'red' : COLOR.gray_800,
            borderRadius: 10,
            flexDirection: "row",
            width: "100%",
           
                backgroundColor:"white",
                shadowColor: "#000",
    shadowOffset: {
        width: 3,
        height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    
    elevation: 6,
                
    
            
            
        },
        input: {
            marginHorizontal: 20,
            color: error?.length > 0 ? 'red' : '#000',
            flex: 1,
        },
        error: {
            color: 'red',
            fontSize: 12,
            marginTop: error?.length > 0 ? 5 : 0,
            marginHorizontal: 20,
        },
        label: {
            color: error?.length > 0 ? "red" : "#000",
            marginHorizontal: 5,
            marginBottom: 5,
        },
        icon: {
            marginHorizontal: 10,
        }
    });
    const [showPassword, setShowPassword] = React.useState(false);

    return (
        <>
            <View style={[{flexDirection: "row"}, containerStyle]}>
                <View style={[styles.main]}>
                    {label ? <LabelKdr style={[styles.label]}>{label}</LabelKdr> : null}
                    <View style={[styles.container, outlineStyle]}>
                    
                            <View style={[{marginLeft:15}, FLEX_STYLE.center]}>
                                <MaterialCommunityIcons name="lock" size={24} color={COLOR.primary}/>
                            </View> 
                        <TextInput style={[styles.input]}
                                   {...props}
                                      secureTextEntry={!showPassword}
                                    />
                        <Pressable style={[styles.icon]} onPress={() => setShowPassword(!showPassword)}>
                            {showPassword ? <Ionicons name="md-eye-off-outline" size={24} color="#AAAAAA"/> :
                                <Ionicons name="md-eye-outline" size={24} color="#AAAAAA"/>}
                        </Pressable>
                    </View>
                    <TextKdr style={[styles.error]}>{error} </TextKdr>
                </View>
            </View>
        </>

    )
}

