import {Pressable, StyleSheet, View} from "react-native";
import {Card, MaterialStyles} from "../../../../../Styles/ComponentStyling/KDRMaterial";
import PADDINGS from "../../../../../Styles/PADDINGS";
import HEADINGS from "../../../../../Styles/heading";
import TextKdr from "../../../../../components/Text";
import MARGINS from "../../../../../Styles/MARGIN";
import FLEX_STYLE from "../../../../../Styles/FLEXSTYLE";
import React from "react";
import {MaterialIcons} from "@expo/vector-icons";
import {CURRENCY} from "../../../../../settings/settings";

function GetOpenCloseIcon(isopen) {
    return isopen ? "keyboard-arrow-up" : "keyboard-arrow-down"
}


function PlanDetail({details}) {
    return <>
        {details.map((detail, index) => {
            return <TextKdr key={index} style={[HEADINGS.p, MARGINS.v4,MARGINS.H8]}>- {detail}</TextKdr>
        })}
    </>
}

export default function PlansComponent({
                                           navigation,
                                            id,
                                           title,
                                           description,
                                           price,
                                           isMonthly,
                                           onSubscribe,
                                           details,
                                           discount,


                                           ...props
                                       }) {

    const [open, setOpen] = React.useState(false)

    return (
        <View style={[Card(), styles.container, PADDINGS.H16]}>
            <View>
                <TextKdr style={[HEADINGS.H2, MARGINS.v10]}>{title}</TextKdr>
                <TextKdr style={[HEADINGS.p, MARGINS.v4]}>{description}</TextKdr>
                <View style={[FLEX_STYLE.rowCenter]}>
                    <TextKdr style={[HEADINGS.H1, MARGINS.v4, MARGINS.H2]}>{CURRENCY}{price}</TextKdr>
                    <TextKdr style={[HEADINGS.p, MARGINS.v4, MARGINS.H2]}>
                        each {isMonthly ? "Month" : "Year"}</TextKdr>
                </View>
                {discount ?
                    <TextKdr style={[HEADINGS.p1, MARGINS.v4, MARGINS.H4]}>You save {discount}%</TextKdr> : null}
                <Pressable
                    onPress={()=>{
                        navigation.navigate("MakePayment",{
                            amount:price,
                            id:id,
                            title:title,
                        })
                    }}
                    style={[MARGINS.v4, PADDINGS.p6]}>
                    <TextKdr style={[HEADINGS.p, HEADINGS.underline, HEADINGS.colorPrimary]}>Choose this plan</TextKdr>
                </Pressable>
                <View style={[MaterialStyles.line, MARGINS.v16]}/>
                <View style={[FLEX_STYLE.rowCenter]}>
                    <TextKdr style={[HEADINGS.H3, MARGINS.v4, MARGINS.H2, {flex: 1}]}>Plan Details</TextKdr>
                    <Pressable onPress={() => setOpen(!open)}>
                        <MaterialIcons name={GetOpenCloseIcon(open)} size={24} color="black"/>
                    </Pressable>
                </View>
                <View style={[MARGINS.v8]}>

                {open ? <PlanDetail details={details}/> : null}

                </View>


            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 30,

    }
});