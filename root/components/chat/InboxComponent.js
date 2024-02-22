import {Image, Pressable, StyleSheet, View} from 'react-native'
import React from 'react'
import {AntDesign} from '@expo/vector-icons';
import TextKdr from "../Text";
import {getUrl} from "../../other/raw";

const InBoxComponent = (props) => {
    let noOfNotSeen = props.noOfNotSeen;
    const handleClick = () => {
        props.handleClick()
    }
    return (
        <View
            style={{
                paddingHorizontal: 20,
                paddingVertical: 16,
                borderBottomWidth: 1,
                borderBottomColor: "#2222220F",
            }}
        >
            <Pressable onPress={handleClick} style={styles.Container}>
                <View style={styles.ImageAndNameContainer}>
                    {/* <View style={{borderRadius:42 , width:42, height:42}}> */}
                    <Image style={{width: 42, height: 42, borderRadius: 42}} source={getUrl(props.uri)}/>
                    {/* </View> */}
                    <View style={{marginLeft: 12,}}>
                        <TextKdr numberOfLines={1}
                                 style={{fontWeight: "500", fontSize: 16, lineHeight: 20}}>{props.name}</TextKdr>
                        {props.message && <TextKdr numberOfLines={1} style={{
                            fontWeight: !props.isNew ? "bold" : "300",
                            fontSize: 14,
                            lineHeight: 17.5,
                            color: "#777777"
                        }}>{props.newMessage ? props.email : props.message}</TextKdr>}
                    </View>
                </View>
                <View style={{justifyContent: props.newMessage ? "center" : "flex-start",}}>
                    {props.newMessage ? <View><AntDesign name="right" size={24} color="black"/></View> :
                        <View style={{justifyContent: "center", alignItems: "center"}}>
                            <TextKdr style={{fontSize: 12, lineHeight: 15,}}>{props.time}</TextKdr>
                            {props.noOfNotSeen !== 0 ? <View style={{
                                backgroundColor: "#FF0000",
                                borderRadius: 15,
                                marginTop: 5,
                                padding: 2,
                                width: 30,
                                height: 30,
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                                <TextKdr
                                    style={{color: "white", fontSize: 12, lineHeight: 15}}
                                >
                                    {noOfNotSeen > 9 ? "9+" : noOfNotSeen}
                                </TextKdr>

                            </View> : null}
                        </View>


                    }
                </View>
            </Pressable>
        </View>
    )
}

export default InBoxComponent

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    ImageAndNameContainer: {
        flexDirection: "row",
        width: "70%"

    },
    TimeContainer: {},
})