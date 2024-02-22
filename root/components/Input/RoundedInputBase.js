import {TextInput, View, StyleSheet} from "react-native";
import TextKdr from "../Text";
import LabelKdr from "../Label";
import COLOR from "../../Styles/Color";

export default function RoundedInputBase({containerStyle, outlineStyle, label, error, children, ...props}) {
    const styles = StyleSheet.create({
        main: {
            flexDirection: 'column',
            flex: 1,

        },
        container: {
            paddingVertical: 7,
            borderColor: error?.length > 0 ? 'red' : '#000',
            borderWidth: 1,
            borderRadius: 50,
            width: "100%",
        },
        input: {
            marginHorizontal: 20,
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
            marginBottom: 5,
        }
    });

    return (
        <>
            <View style={[{flexDirection: "row"}, containerStyle]}>
                <View style={[styles.main]}>
                    {label ? <LabelKdr style={[styles.label]}>{label}</LabelKdr> : null}
                    <View style={[styles.container, outlineStyle]}>
                        {children}
                    </View>
                    <TextKdr style={[styles.error]}>{error} </TextKdr>
                </View>
            </View>
        </>

    )
}

