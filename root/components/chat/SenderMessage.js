import {StyleSheet, View,Image} from "react-native";
import COLOR from "../../Styles/Color";
import TextKdr from "../Text";
import FileMessage from "./FileMessage";

function SenderBaseComponent({navigation, children, time, ...props}) {

    return (
        <View style={styles.container} {...props}>
            <View style={styles.innerContainer}>
                {children}
            </View>
            {props?.isNextMine === false ? <TextKdr style={styles.time}>{time}</TextKdr> :null}
        </View>
    )
}


export default function SenderMessage({navigation,file, text, ...props}) {
    return (
        <SenderBaseComponent {...props}>
           {file? <FileMessage file={file}/>:
            <TextKdr style={styles.message}>{text}</TextKdr>}
        </SenderBaseComponent>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        marginRight: 15,
        alignItems: "flex-end",
    },
    innerContainer: {
        backgroundColor: COLOR.primary,
        padding: 5,
        maxWidth: "70%",
        paddingHorizontal: 10,
        borderRadius: 10,
        borderTopRightRadius: 0,
    },
    message: {
        color: COLOR.white,
    },
    time: {
        fontSize: 12,
        color: COLOR.gray,
        marginTop: 5,
        marginRight: 4,
    }

});