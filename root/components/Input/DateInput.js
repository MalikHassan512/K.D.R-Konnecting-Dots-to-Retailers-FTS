import {TextInput, View, StyleSheet, Pressable, Platform} from "react-native";
import TextKdr from "../Text";
import LabelKdr from "../Label";
import COLOR from "../../Styles/Color";
import roundedCircleStyle from "../../Styles/Other";
import FLEX_STYLE from "../../Styles/FLEXSTYLE";
import {useEffect, useState} from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import {RemoveYearFromCurrentDate} from "../../other/IdentifyCard";
import RNDateTimePicker from "@react-native-community/datetimepicker";


export default function DateInput({containerStyle, outlineStyle, icon, label, style, error,onChangeText, ...props}) {
    const [date, setDate] = useState(null);
    const [Datelabel, setLabel] = useState("Select Date");
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    useEffect(() => {
        if (date !== null) {
            onChangeText(date)
        }
    }, [date])
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
            paddingVertical: 7,
            flex: 1,
            color: error?.length > 0 ? 'red' : date === null ? "#888888" : '#000',
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
        },
        datePicker: {

            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
        },
    });


    return (
        <>
            <Pressable onPress={() => setDatePickerVisibility(true)} style={[{flexDirection: "row"}, containerStyle]}>
                <View style={[styles.main]}>
                    {label ? <LabelKdr style={[styles.label]}>{label}</LabelKdr> : null}
                    <View style={[styles.container, outlineStyle]}>
                    {icon ?
                            <View style={[roundedCircleStyle(40), FLEX_STYLE.center]}>
                                {icon}
                            </View> : null}
                        <TextKdr style={[styles.input]}>
                            {Datelabel}
                        </TextKdr>
                  
                    </View>
                    <TextKdr style={[styles.error]}>{error} </TextKdr>
                </View>

            </Pressable>

            {isDatePickerVisible && (
                <RNDateTimePicker
                    value={date === null ? new Date() : date}
                    mode={'date'}
                    themeVariant={'light'}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    maximumDate={RemoveYearFromCurrentDate(16)}
                    minimumDate={RemoveYearFromCurrentDate(100)}


                    is24Hour={true}
                    onChange={(event, date) => {
                        setDatePickerVisibility(false)
                        setDate(date)
                        setLabel(date.toDateString())

                    }}
                    style={styles.datePicker}
                />
            )}
        </>

    )
}

