import {StyleSheet, Pressable, View, Image} from "react-native";
import SHADOWS from "../../Styles/shadows";
import TextKdr from "../Text";
import {Ionicons} from "@expo/vector-icons";
import LikeButton from "../Button/LikeButton";
import {useContext, useState} from "react";
import SessionContext from "../../context/Session/session";
import LikeServiceApi from "../../API/USER/FavortieApi";
import Toast from "react-native-toast-message";
import {CURRENCY} from "../../settings/settings";
import IconButton from "../Button/IconButton";
import FLEX_STYLE from "../../Styles/FLEXSTYLE";
import COLOR from "../../Styles/Color";

const ImageSize = 150;

export default function PopularServicesCard({
                                                navigation,
                                                style,
                                                source,
                                                discount,
                                                onPress,
                                                price,
                                                rating,
                                                serviceID,
                                                imageStyle,
                                                title,
                                                isLikedByUser,
                                                onDelete,
                                                onEdit,
                                                showControls,
                                                userName,
                                                userProfile,
                                                onPressImage,
                                                setCardImage,
                                                ...props
                                            }) {

    const [isLiked, setLiked] = useState(isLikedByUser ? isLikedByUser : false);
    const session = useContext(SessionContext).session;

    let ChangeStatus = () => {
        LikeServiceApi(session.token, {
            action: isLiked ? "remove" : "add",
            serviceID: serviceID
        }).then((res) => {
            setLiked(!isLiked)
            console.log(res)
        }).catch((e) => {
            console.log(e.message())
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Error Occurred',
                text2: 'Please try again later',
            });
        })

    };
    const getName=(name)=>{
        if(!name)
        return ""
if(name.length>=6)
return name=name.slice(0,6)+".."
    }
    return (
        <Pressable style={[styles.container, SHADOWS.shadowSm, style]} onPress={onPress} {...props}>
     {       <View style={{width:"100%",...FLEX_STYLE.row,...FLEX_STYLE.rowCenter,gap:10,paddingHorizontal:10,marginVertical:3,flexWrap:"wrap"}}>
{userProfile&&<Image source={userProfile}
 style={{borderRadius:15,borderWidth:1,borderColor:COLOR.gray_700,height:30,width:30}}/>}
 <TextKdr>{getName(userName)}</TextKdr>
</View>}
            <View style={[styles.image, imageStyle]}>
                <Pressable
                onPress={()=>{onPressImage(); setCardImage(source)}}
                >
            <Image source={source} style={[styles.image, imageStyle]}/>        
            </Pressable>        
            {onEdit&&<IconButton ICON={"edit"} color="white" onPress={onEdit} style={{top:10,left:10}}/>}
            {onDelete&&<IconButton ICON={"trash"} color="white" onPress={onDelete} style={{top:10,right:10}}/>}
                <LikeButton isLiked={isLiked} setLiked={setLiked} onPress={ChangeStatus}/>
            </View>
            <TextKdr style={styles.title}>{title}</TextKdr>
            <View style={[styles.price]}>
                <TextKdr style={{fontWeight: "bold"}}>{CURRENCY}{price}</TextKdr>
                <TextKdr style={{fontWeight: "bold", color: "#777777"}}>/h</TextKdr>
                <View style={{flex: 1}}/>
                <Ionicons name="star" size={18} color="#FFB217"/>
                <TextKdr style={{marginHorizontal: 4, color: "#777777"}}>({rating})</TextKdr>
            </View>

        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: ImageSize,
        borderRadius: 7,
        backgroundColor: 'white',
        alignItems: 'center',
        marginLeft: 5,

    }, image: {
        width: "100%",
        height: 180,
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
    },
    title: {
        marginTop: 5,
        textAlign: 'left',
        width: "100%",
        paddingHorizontal: 10,
        fontSize: 16,
        fontWeight: '400',
    },
    price: {
        flexDirection: "row",
        paddingVertical: 5,
        marginHorizontal: 10,
        paddingBottom: 10,
    }
});