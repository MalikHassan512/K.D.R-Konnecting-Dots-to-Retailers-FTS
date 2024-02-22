import {StyleSheet, View} from "react-native";
import TitleBar from "../../../../../components/TitleBar/TitleBar";
import ContactFooter from "../../../../../components/Footer/ContactFooter";
import PADDINGS from "../../../../../Styles/PADDINGS";

export default function HelpAndSupport({navigation, ...props}) {

    return (
        <View style={[styles.container]}>
            <TitleBar navigation={navigation} title={"Help and Support"}/>
            <ContactFooter style={[PADDINGS.p20]}
                           navigation={navigation}

            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});