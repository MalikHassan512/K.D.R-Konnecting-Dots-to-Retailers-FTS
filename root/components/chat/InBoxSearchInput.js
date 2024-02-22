import {View, TextInput, StyleSheet} from "react-native";
import {Card} from "../../Styles/ComponentStyling/KDRMaterial";
import MARGINS from "../../Styles/MARGIN";
import FLEX_STYLE from "../../Styles/FLEXSTYLE";
import {AntDesign} from "@expo/vector-icons";

export default function InBoxSearchInput({navigation, ...props}) {


    return (
        <View style={[Card(), styles.container, MARGINS.v14, MARGINS.H14, FLEX_STYLE.rowCenter,]}>
            <AntDesign name="search1" size={20} color="black" style={[MARGINS.H4]}/>
            <TextInput placeholder={"Search"}  style={[MARGINS.H4,{flex:1}]} {...props} />

        </View>
    )
}


const styles = StyleSheet.create({
    container: {}
});