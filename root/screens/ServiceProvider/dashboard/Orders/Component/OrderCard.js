import {StyleSheet, View, Image, Animated, Pressable} from "react-native";
import {Card} from "../../../../../Styles/ComponentStyling/KDRMaterial";
import FLEX_STYLE from "../../../../../Styles/FLEXSTYLE";
import TextKdr from "../../../../../components/Text";
import HEADINGS from "../../../../../Styles/heading";
import MARGINS from "../../../../../Styles/MARGIN";
import {Ionicons} from "@expo/vector-icons";
import {RectButton} from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import RoundButtonKdr from "../../../../../components/Button/roundButton";
import {CURRENCY} from "../../../../../settings/settings";


export default function OrderCard({
                                      navigation,
                                      style,
                                      source,
                                      discount,
                                      onPress,
                                      price,
                                      rating,
                                      imageStyle,
                                      id,
                                      onPressDelete,
                                      title,
                                      ...props
                                  }) {

    const ButtonSize = 35;
    let media = source
    //if media is an array then it is a list of media
    if (Array.isArray(media) && media.length > 0) {
        console.log(media[0].file)
        media = {uri: media[0].file}
    } else {
        media = require("../../../../../../assets/img/call.png")
    }

    const renderLeftActions = (progress, dragX) => {
        const trans = dragX.interpolate({
            inputRange: [0, 50, 100, 101],
            outputRange: [0, 0, 0, 1],
        });
        return (
            <View style={styles.leftAction}>
                <Animated.View
                    style={[
                        FLEX_STYLE.row,
                        FLEX_STYLE.center,

                        {
                            flex: 1,
                            transform: [{translateX: trans}],
                        },
                    ]}>
                    {/*<RoundButtonKdr onPress={() => alert("INFO")} style={{borderWidth: 1, marginHorizontal: 3}}*/}
                    {/*                ButtonSize={ButtonSize}>*/}
                    {/*    <Ionicons name="information" size={20} color="black"/>*/}
                    {/*</RoundButtonKdr>*/}
                    {/*<RoundButtonKdr onPress={() => alert("PROFILE")} style={{borderWidth: 1, marginHorizontal: 3}}*/}
                    {/*                ButtonSize={ButtonSize}>*/}
                    {/*    <Ionicons name="ios-person-outline" size={20} color="black"/>*/}
                    {/*</RoundButtonKdr>*/}
                    <RoundButtonKdr onPress={() => onPressDelete(id)} style={{borderWidth: 1, marginHorizontal: 3}}
                                    ButtonSize={ButtonSize}>
                        <Ionicons name="trash" size={20} color="black"/>
                    </RoundButtonKdr>


                </Animated.View>
            </View>
        );
    };
    return (
        <Swipeable cancelsTouchesInView={true} renderRightActions={renderLeftActions}>
            <Pressable onPress={onPress} style={[Card(), styles.container]}>
                <View style={[FLEX_STYLE.row]}>
                    <Image source={source} style={[styles.image]}/>
                    <View style={[styles.contentContainer]}>
                        <View style={[FLEX_STYLE.row]}>
                            <TextKdr style={[HEADINGS.H3,FLEX_STYLE.one]}>{title}</TextKdr>
                            <TextKdr style={[HEADINGS.p,{
                                color: "#FFB217",
                                fontSize: 10
                            }]}>order id #{id}</TextKdr>

                        </View>
                        <View style={[FLEX_STYLE.row, MARGINS.v16]}>
                            <View style={[FLEX_STYLE.rowCenter, {flex: 1}]}>
                                <TextKdr style={[HEADINGS.p]}>{CURRENCY}</TextKdr>
                                <TextKdr style={[HEADINGS.H3]}>{price}</TextKdr>
                                {/*<TextKdr style={[HEADINGS.p]}>/h</TextKdr>*/}
                            </View>
                            <View style={[FLEX_STYLE.rowCenter, {flex: 1}]}>
                                <Ionicons name="star" size={18} color="#FFB217"/>
                                <TextKdr style={[HEADINGS.p]}>({rating})</TextKdr>
                            </View>
                        </View>
                    </View>
                </View>

            </Pressable>
        </Swipeable>
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
    },
    leftAction: {
        marginLeft: 10,
    }
});