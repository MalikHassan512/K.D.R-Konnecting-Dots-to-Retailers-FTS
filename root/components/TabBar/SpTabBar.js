import {Platform, Pressable, StyleSheet, View} from "react-native";
import PADDINGS from "../../Styles/PADDINGS";
import SHADOWS from "../../Styles/shadows";
import TextKdr from "../Text";
import {Ionicons} from "@expo/vector-icons";
import COLOR from "../../Styles/Color";
import HEADINGS from "../../Styles/heading";
import FLEX_STYLE from "../../Styles/FLEXSTYLE";
import SpTabBarConfig, {getScreenName} from "./SpTabBarConfig";
import RoundButtonKdr from "../Button/roundButton";
import {useContext, useEffect, useLayoutEffect, useState} from "react";
import SessionContext from "../../context/Session/session";
import Urls from "../../other/Urls";

function TabBarButton({children, ...props}) {
    return (
        <Pressable {...props} style={[styles.tabBarButton, FLEX_STYLE.center]}>
            {children}
        </Pressable>
    )
}


export default function SpTabBar({navigation, state,isUser6MonthsOld,subscription, descriptors,isVisible, ...props}) {
    const IconSize = 20;
    const[wholeTabBarVisible,setWholeTabBarVisible] = useState(true)
    useEffect(() => {
        if(isUser6MonthsOld && subscription.count===0){
            setWholeTabBarVisible(false)
        }
    }, [isUser6MonthsOld, subscription])

    // useEffect(() => {
    //     if(!wholeTabBarVisible)
    //     {
    //         setTimeout(() => {
    //             setWholeTabBarVisible(true)
    //         }, 500);
    //     }

    // },[wholeTabBarVisible])
    if(!wholeTabBarVisible)
    {
        return null
    }
    if(!isVisible)
    {
        return null
    }



    return (
        <View style={[styles.container, PADDINGS.p4, SHADOWS.shadowLg, 
            Platform.OS === "ios" ? {paddingBottom: 20, } : {paddingBottom: 0}
         ]}>
            <View style={[styles.contentContainer]}>
                {state.routes.map((route, index) => {
                    const {options} = descriptors[route.key];
                    const isFocused = state.index === index;
                    if(options.title === "Update Product")
                    return 
                    if (options.title === "Add Product")
                    {
                        if(isUser6MonthsOld && subscription.count===0){
                            return <></>
                        }
                        else {
                            return <View key={index} style={{width: IconSize, height: IconSize}}></View>;
                        }
                    }
                    return (
                        
                        <TabBarButton key={index} onPress={() => navigation.navigate(route.name)}>
                            {SpTabBarConfig(isFocused, IconSize, route)}
                            <TextKdr
                                style={[HEADINGS.tabBar, {color: isFocused ? COLOR.primary : COLOR.black}]}>{options.title}</TextKdr>
                        </TabBarButton>
                    )

                })}
            </View>

            {
                isUser6MonthsOld && subscription.count===0?
                    <></>: <View style={[styles.RoundedButton,     Platform.OS === "ios" ? {paddingBottom: 20, } : {paddingBottom: 0}]}>
                        <RoundButtonKdr onPress={() => navigation.navigate("AddProductsEntry",{
                            screen:"AddProduct1"
                        })} ButtonSize={50}
                                        style={{backgroundColor: COLOR.primary, borderWidth: 0}}>
                            <Ionicons name="add" size={IconSize} color={COLOR.white}/>
                        </RoundButtonKdr>
                    </View>
            }


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLOR.white,
   
    },
    contentContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 20,
    },

    tabBarButton: {
        alignItems: "center",
        padding: 5,
    },
    RoundedButton: {
        position: "absolute",
        bottom: 25,
        marginLeft: 10,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
    }

});