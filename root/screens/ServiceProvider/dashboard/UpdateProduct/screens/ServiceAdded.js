import {StyleSheet, View} from "react-native";
import {SuccessInner} from "../../../../User/dashboard/Home/Screens/PaymentDoneScreen";
import FLEX_STYLE from "../../../../../Styles/FLEXSTYLE";
import PADDINGS from "../../../../../Styles/PADDINGS";


export default function ServiceAdded({navigation, ...props}) {

    return (
        <View style={[styles.container, FLEX_STYLE.center,PADDINGS.H20      ]}>
            <SuccessInner title={"Done"} description={"You have successfully updated your service."}
            onPress={() => {
                navigation.navigate("SpHomeEntry", {
                    screen: "SpHome",
                    index: 0,
                })
            }}

            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});