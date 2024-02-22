import {StyleSheet, View} from "react-native";
import TextKdr from "../Text";
import HEADINGS from "../../Styles/heading";
import CallUs from "../other/CallUs";
import ChatWithUs from "../other/ChatWithUs";
import {useRef} from "react";
import CallUsModal from "../../modal/CallUsModal";
import BaseCardModel from "../../modal/BaseCardModel";


export default function ContactFooter({navigation, title, style, innerStyle, ...props}) {
    let mainTitle = title !== undefined ? title : "Helpline";
    const modalRef = useRef(null);
    return (
        <View style={[{padding: 5}, style]}>
            <CallUsModal ref={modalRef}/>
            {mainTitle.length > 0 ? <TextKdr style={[HEADINGS.H3, {marginVertical: 5,}]}>{mainTitle}</TextKdr> : null}
            <View style={[styles.Contact, innerStyle]}>
                <CallUs onPress={() => modalRef.current.show()} navigation={navigation}/>
                <ChatWithUs navigation={navigation}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }, Contact: {
        justifyContent: "center",
        flexDirection: "row"
    }
});