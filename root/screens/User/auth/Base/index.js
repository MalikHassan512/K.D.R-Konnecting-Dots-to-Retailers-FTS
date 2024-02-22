import {View, Image, StyleSheet, SafeAreaView, ScrollView} from "react-native";
import TextKdr from "../../../../components/Text";
import {StatusBar} from "expo-status-bar";
import TitleBar from "../../../../components/TitleBar/TitleBar";
import React from "react";
import {useNavigation} from "@react-navigation/native";

export default function BaseAuth({heading, subHeading, children}) {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar  backgroundColor='white' style={"dark"}/>

            <ScrollView style={styles.scrollView} contentContainerStyle={{alignItems: 'center', paddingBottom: 70}}>
                {/* <Image source={require("../../../../../assets/img/logo.png")} style={styles.logo}/> */}
                <TextKdr style={styles.heading}>{heading}</TextKdr>
                <TextKdr style={styles.subHeading}>{subHeading}</TextKdr>
                {children}
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        paddingTop: StatusBar.currentHeight,
        backgroundColor: "white",
    }, scrollView: {
        flex: 1,
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: '700',
        marginTop: 20,
    },
    subHeading: {
        fontSize: 16,
        fontWeight: '400',
        marginHorizontal: 60,
        textAlign: "center",
        marginTop: 10,
        color: "#333333"
    },
    logo: {
        marginTop: 60,
    }

});