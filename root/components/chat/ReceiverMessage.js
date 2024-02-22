import {Pressable, StyleSheet, View, Image} from "react-native";
import COLOR from "../../Styles/Color";
import TextKdr from "../Text";
import SHADOWS from "../../Styles/shadows";
import FileMessage from "./FileMessage";

function ReceiverBaseComponent({navigation, children, name, isPreviousMine, nextMine, time, dp, dpSize, ...props}) {
    const size = dpSize ? dpSize : 40;
    const SizeDp = size - 4;
    const Name = name ? name : "Sender Name";
    const dpStyle = dp ? dp : {uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJBKVDMmP8NAmTmRvVsWrW9BJktNqNwwsong&usqp=CAU"};
    const previousSame = isPreviousMine ? isPreviousMine : false;
    const nextMessageMine = nextMine ? nextMine : false;

    return (
        <View style={[styles.container, {marginBottom: nextMessageMine === true ? 0 : 5}]} {...props}>
            {previousSame === false ?
                <Pressable style={[SHADOWS.shadowSm, {width: size, height: size, borderRadius: size / 2}, styles.dp]}>
                    <Image source={dpStyle} style={{width: SizeDp, height: SizeDp, borderRadius: SizeDp / 2}}/>
                </Pressable> : null}
            <View style={{maxWidth: "70%", marginStart: previousSame === false ? 3 : size + 18}}>
                {
                    previousSame === false ?
                        <TextKdr style={styles.senderName}>{Name}</TextKdr>
                        : null
                }
                <View style={[styles.innerContainer]}>
                    {children}
                </View>
                {
                    nextMessageMine === false ?
                        <TextKdr style={styles.time}>{time}</TextKdr>
                        : null
                }

            </View>
        </View>
    )
}


export default function ReceiverMessage({navigation, file,text, ...props}) {

    return (

        <ReceiverBaseComponent {...props}>
    {file?<FileMessage file={file}/>:
         <TextKdr style={styles.message}>{text}</TextKdr>}
        </ReceiverBaseComponent>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        flexDirection: "row",
        marginLeft: 15,
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    innerContainer: {
        backgroundColor: COLOR.white,
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        borderTopLeftRadius: 0,
        marginStart: 5,
    },
    message: {
        color: COLOR.black,
    },
    time: {
        fontSize: 12,
        color: COLOR.gray,
        marginTop: 5,
        marginRight: 7,
        alignSelf: "flex-end",
    },
    dp: {
        backgroundColor: COLOR.white,
        margin: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    senderName: {
        fontSize: 14,
        fontWeight: "700",
        marginBottom: 5,
        marginTop: 5,
    }

});