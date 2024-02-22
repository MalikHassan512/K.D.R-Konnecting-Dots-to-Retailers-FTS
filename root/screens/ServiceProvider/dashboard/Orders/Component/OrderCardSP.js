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
import Urls from "../../../../../other/Urls";
import {useContext, useRef} from "react";
import SessionContext from "../../../../../context/Session/session";
import Toast from "react-native-toast-message";
import ConformationModel from "../../../../../modal/ConformationModel";
import {CURRENCY} from "../../../../../settings/settings";


export default function OrderCardSP({
                                      navigation,
                                      style,
                                      source,
                                      discount,
                                      onPress,
                                      price,
                                      rating,
    item,
                                      imageStyle,
                                      title,
                                      ...props
                                  }) {
    const showToast = (type,txt1,txt2) => {
        Toast.show({
            type: type,
            text1: txt1,
            text2: txt2,
        });

    }

    const ButtonSize = 35;
    let media = source
    //if media is an array then it is a list of media
    if(Array.isArray(media) && media.length > 0){
        media = {uri:media[0].file}
    }
    else{
        media = require("../../../../../../assets/img/call.png")
    }
    const session = useContext(SessionContext)
    let cancelOrder = () => {
        let obj = props.item
        let formData = new FormData()
        formData.append("service", parseInt(obj.service))
        formData.append("order_status","CANCELLEDBYSP")

        fetch(Urls.OrderUpdate+"/"+obj.id,{
            method:"PUT",
            headers:{
                "Content-Type":"multipart/form-data",
                "Authorization":"Token "+session.session.token
            },
            body:formData
        }).then(res=>res.json()).then(res=>{
            confirmationModel.current.close()
            if(res.id){
                showToast("success","Success","Order Cancelled")
            }
            else{
                showToast("error","Error","Something went wrong")
                console.log(res)
            }
        })

    }
    const confirmationModel = useRef(null);
    const renderLeftActions = (progress, dragX) => {
        const trans = dragX.interpolate({
            inputRange: [0, 50, 100, 101],
            outputRange: [0, 0, 0, 1],
        });
        return (
            <View style={styles.leftAction} >
                <ConformationModel title={"Cancel Order"} message={"Are you sure you want to mark this order as Canceled?"}
                                   onPressYes={cancelOrder} ref={confirmationModel}/>
                <Animated.View
                    style={[
                        FLEX_STYLE.row,
                        FLEX_STYLE.center,

                        {
                            flex: 1,
                            transform: [{translateX: trans}],
                        },
                    ]}>
                    <RoundButtonKdr onPress={()=>props.onInfoPress()} style={{borderWidth: 1, marginHorizontal: 3}} ButtonSize={ButtonSize}>
                        <Ionicons name="information" size={20} color="black"/>
                    </RoundButtonKdr>
                    {/*<RoundButtonKdr onPress={()=>alert("PROFILE")} style={{borderWidth: 1, marginHorizontal: 3}} ButtonSize={ButtonSize}>*/}
                    {/*    <Ionicons name="ios-person-outline" size={20} color="black"/>*/}
                    {/*</RoundButtonKdr>*/}
                    <RoundButtonKdr onPress={() => confirmationModel.current.open()} style={{borderWidth: 1, marginHorizontal: 3}} ButtonSize={ButtonSize}>
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
                    <Image source={media} style={[styles.image]}/>
                    <View style={[styles.contentContainer]}>
                        <View style={[FLEX_STYLE.row]}>
                            <TextKdr style={[HEADINGS.H3,FLEX_STYLE.one]}>{title}</TextKdr>
                            <TextKdr style={[HEADINGS.p,{
                                color: "#FFB217",
                                fontSize: 10
                            }]}>order id #{item.id}</TextKdr>

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