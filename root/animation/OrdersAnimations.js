import {StyleSheet, View, Image, Animated, Pressable} from "react-native";
import FLEX_STYLE from "../Styles/FLEXSTYLE";
import {Skeleton} from "@rneui/base";
import {Card} from "../Styles/ComponentStyling/KDRMaterial";


export default function OrdersAnimations({
                                             style,

                                             title,
                                         }) {


    return (
        <View style={[Card(), styles.container]}>
            <View style={[FLEX_STYLE.row]}>
                <Skeleton style={styles.image}/>
                <View style={[styles.contentContainer]}>
                    <Skeleton style={styles.textStyle}/>

                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 10,
                    }}>
                        <Skeleton style={[styles.textStyle2, {flex: 5}]}/>
                        <Skeleton style={[styles.textStyle2]}/>

                    </View>


                </View>
            </View>

        </View>
    )
}

export function OrdersAnimationsList() {

    return (
        <>
            <OrdersAnimations />
            <OrdersAnimations />
            <OrdersAnimations />
            <OrdersAnimations />
            <OrdersAnimations />
            <OrdersAnimations />
            <OrdersAnimations />
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        padding: 0,
    },
    image: {
        flex: 1,
        borderRadius: 10,
        height: 120,
    },
    contentContainer: {
        flex: 1,
        padding: 10,
        justifyContent: "center"
    },
    leftAction: {
        marginLeft: 10,
    },
    textStyle: {
        width: "60%",
        height: 7,
        borderRadius: 5,
        marginTop: 5,
    },
    textStyle2: {
        width: null,
        flex: 2,
        height: 7,
        borderRadius: 5,
        marginHorizontal: 5,
        marginTop: 5,
    }
});