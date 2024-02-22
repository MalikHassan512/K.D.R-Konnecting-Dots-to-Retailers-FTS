import {TextInput, View, StyleSheet,Platform} from "react-native";
import TextKdr from "../Text";
import LabelKdr from "../Label";
import COLOR from "../../Styles/Color";
import roundedCircleStyle from "../../Styles/Other";
import FLEX_STYLE from "../../Styles/FLEXSTYLE";

export default function TextInputKdr({containerStyle, outlineStyle, icon, label, style, error, ...props}) {
    const styles = StyleSheet.create({
        main: {
            flexDirection: 'column',
            flex: 1,
            padding:3

            
        },
        container: {
            paddingVertical: icon ? 5 : 10,
            borderColor: error?.length > 0 ? 'red' : COLOR.gray_800,
            borderRadius: 10,
            paddingHorizontal: 5,
            justifyContent: "center",
            alignItems: "center",
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
            flex: 1,
            color: error?.length > 0 ? 'red' : '#000',
            
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
            marginBottom: 7,
        }
    });

    return (
                <View style={[styles.main,containerStyle]}>
                    {label ? <LabelKdr style={[styles.label]}>{label}</LabelKdr> : null}
                    <View style={[styles.container, outlineStyle]}>
                        {icon ?
                            <View style={[roundedCircleStyle(40), FLEX_STYLE.center]}>
                                {icon}
                            </View> : null}
                        <TextInput style={[styles.input]} {...props} />
                    </View>
                    <TextKdr style={[styles.error]}>{error} </TextKdr>
                </View>
        

    )
}
export  function LocationInputKdr({containerStyle, outlineStyle, icon, label, style,value, error, ...props}) {
    const styles = StyleSheet.create({
        main: {
            flexDirection: 'column',
            flex: 1,
            padding:3

            
        },
        container: {
            paddingVertical: icon ? 5 : 10,
            borderColor: error?.length > 0 ? 'red' : COLOR.gray_800,
            borderRadius: 10,
            paddingHorizontal: 5,
            justifyContent: "center",
            alignItems: "center",
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
            flex: 1,
            padding:5,
            color: error?.length > 0 ? 'red' : '#000',
            
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
            marginBottom: 7,
        }
    });

    return (
                <View style={[styles.main,containerStyle]}>
                    {label ? <LabelKdr style={[styles.label]}>{label}</LabelKdr> : null}
                    <View style={[styles.container, outlineStyle]}>
                        {icon ?
                            <View style={[roundedCircleStyle(40), FLEX_STYLE.center]}>
                                {icon}
                            </View> : null}
                        <TextKdr style={[styles.input]} {...props} >
                            {value}
                        </TextKdr>
                    </View>
                    <TextKdr style={[styles.error]}>{error} </TextKdr>
                </View>
        

    )
}
