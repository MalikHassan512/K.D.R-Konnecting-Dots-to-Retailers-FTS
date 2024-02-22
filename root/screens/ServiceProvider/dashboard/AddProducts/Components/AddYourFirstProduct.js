import {StyleSheet, View} from "react-native";
import {Card} from "../../../../../Styles/ComponentStyling/KDRMaterial";
import FLEX_STYLE from "../../../../../Styles/FLEXSTYLE";
import PADDINGS from "../../../../../Styles/PADDINGS";
import MARGINS from "../../../../../Styles/MARGIN";
import {Ionicons} from "@expo/vector-icons";
import COLOR from "../../../../../Styles/Color";
import TextKdr from "../../../../../components/Text";
import HEADINGS from "../../../../../Styles/heading";
import ButtonKdr from "../../../../../components/Button/Buttonkdr";
import {useState} from "react";


export default function AddYourFirstProduct({navigation,session, ...props}) {

    return (
        <View style={[Card(), FLEX_STYLE.columnCenter, PADDINGS.H20]}>
            <Ionicons name="pricetags-sharp" size={45} style={[MARGINS.v20]} color={COLOR.gray_800}/>
            <TextKdr style={[HEADINGS.H2, MARGINS.v6]}>Add your first product</TextKdr>
            <TextKdr style={[HEADINGS.p1, styles.descriptionText]}>You haven’t uploaded any service
                / product yet. Get started with your first one!</TextKdr>

            <ButtonKdr text={"+ Add Product"} onPress={() => navigation.navigate("AddProductsEntry", {
                screen: "AddProduct1",

            })}
                       style={[PADDINGS.p0, MARGINS.v28, styles.button]}
                       textStyle={[{color: COLOR.primary}]}
                       innerStyle={[PADDINGS.H20, {flex: null}]}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    descriptionText: {
        textAlign: "center",
        marginHorizontal: 20,
    },
    button: {
        borderWidth: 1,
        borderColor: COLOR.primary,
        borderStyle: "dashed",
        backgroundColor: COLOR.white,

    }
});