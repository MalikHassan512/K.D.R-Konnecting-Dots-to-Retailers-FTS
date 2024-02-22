import {Image, StyleSheet, View} from "react-native";
import TextKdr from "../../components/Text";
import HEADINGS from "../../Styles/heading";
import ButtonKdr from "../../components/Button/Buttonkdr";
import FLEX_STYLE from "../../Styles/FLEXSTYLE";
import {StatusBar} from "expo-status-bar";
import {LinearGradient} from 'expo-linear-gradient';
import database from "@react-native-firebase/database";
import {useEffect, useState} from "react";




export default function WelcomeScreen({navigation, ...props}) {



    const [appstoreChecker, setAppstoreChecker] = useState(false)


    useEffect(() => {
        appStoreCheckerForButton()
    }, [appstoreChecker]);

    const appStoreCheckerForButton = async () => {
        database().ref('appstore').on('value', snapshot => {
            if (snapshot.exists()) {
                if (snapshot.child("firstCheck").val()) {
                    setAppstoreChecker(snapshot.child("firstCheck").val())
                }
            }
        })
    }


    return (
        <LinearGradient
            colors={['#4c7ac5', '#e3121e']}
            style={styles.container}
        >


            <StatusBar style={"dark"}/>
            <View style={[styles.imageContainer]}>
                <Image style={styles.image} source={require("../../../assets/img/logo.png")}/>
            </View>
            <View style={[styles.contentContainer]}>
                <TextKdr style={[HEADINGS.H1, {
                    color: "#fff",
                }]}>
                    Order any service, online!
                </TextKdr>
                <TextKdr style={[HEADINGS.p, {
                    color: "#fff",
                    textAlign: "center",
                }]}>
                    Konnecting Dots for Retailers is a platform that connects you to the best service providers in your
                    area.
                </TextKdr>

                <View style={[styles.Buttons]}>

                    <ButtonKdr
                        onPress={() => navigation.navigate("UserAuthEntry")}

                        textStyle={{fontSize: 12}} style={[styles.Button, {
                        flex: 2,
                        borderColor: "#fff",
                        borderWidth: 1,
                        backgroundColor: "#111111",
                    }]} text={"I am a Visitor"}/>


                    {!appstoreChecker ?

                        <ButtonKdr
                            onPress={() => navigation.navigate("ServiceProviderAuthEntry")}
                            textStyle={{fontSize: 12}} style={[styles.Button, {
                            flex: 3,
                        }]} text={"I want to provide service"}/>
                        : null}

                </View>

            </View>

        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#111111",
    },
    imageContainer: {
        position: "absolute",
        top: "40%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    contentContainer: {
        position: "absolute",
        bottom: "10%",
        alignItems: "center",
        paddingHorizontal: 30,

    },
    Buttons: {
        flexDirection: "row",
        marginVertical: 40,
    },
    Button: {
        padding: 0,

        marginHorizontal: 5,
    }
});
