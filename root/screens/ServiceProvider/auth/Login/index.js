import {Pressable, View, StyleSheet, Image, Text} from "react-native";
import TextInputKdr from "../../../../components/Input";
import PasswordInputKdr from "../../../../components/PasswordInput";
import ButtonKdr from "../../../../components/Button/Buttonkdr";
import TextKdr from "../../../../components/Text";
import RoundButtonKdr from "../../../../components/Button/roundButton";
import {AntDesign, MaterialCommunityIcons} from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import {useContext, useState} from "react";
import {LoadingContext} from "../../../../context/modal/LoadingContext";
import BaseAuth from "../../../User/auth/Base";
import Urls from "../../../../other/Urls";
import SessionContext from "../../../../context/Session/session";
import TitleBar from "../../../../components/TitleBar/TitleBar";
import API_URLS from "../../../../API/USER/URLS";
import HEADINGS from "../../../../Styles/heading";
import colors from "../../../../config/colors";
import COLOR from "../../../../Styles/Color";


import messaging from "@react-native-firebase/messaging";
import database from "@react-native-firebase/database";


function OrLine({style, ...props}) {
    const LineColor = "#CCCCCC";
    return (
        <View
            style={[{flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center"}, style]} {...props}>
            <View style={{flex: 1, borderWidth: 0.5, borderColor: LineColor, height: 0, marginHorizontal: 10}}/>
            <TextKdr style={{marginHorizontal: 5}}>Or</TextKdr>
            <View style={{flex: 1, borderWidth: 0.5, borderColor: LineColor, height: 0, marginHorizontal: 10}}/>
        </View>
    )


}


export default function Login({navigation, ...props}) {
    const loading = useContext(LoadingContext);
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })
    let session = useContext(SessionContext);
    const [token, setToken] = useState(null)

    messaging().getToken().then(token => {
        setToken(token)
    });

    const [error, setError] = useState("")
    const login = () => {
        loading.show();
        if (credentials.email.trim() === "" || credentials.password.trim() === "") {
            showToast("Error", "Email and password is required")
            loading.close();
            return
        }
        let tempCredentials = {
            email: credentials.email.trim(),
            password: credentials.password
        }
        console.log(tempCredentials)
        fetch(API_URLS.login, {
            method: 'POST',
            // body: JSON.stringify(tempCredentials),
            body: JSON.stringify({
                email: tempCredentials.email,
                password: tempCredentials.password,
                deviceToken: token
            }),
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'

            }
        }).then(res => res.json()).then(async (res) => {

            console.log("res", res)
            if (res.token !== undefined) {
                if (res.profile.roles === "SERVICE_PROVIDER") {                    

                    let email = res.profile.email.split('@')


                    // database().ref("kdrUsers").child(email[0])
                    //     .set({
                    //         "userID": res?.profile?.id,
                    //         "deviceToken": token,
                    //         "email": res.profile.email
                    //     }).then((data) => {
                        session.setSession(res)
                        session.loadSession()
                        setTimeout(() => {
                            navigation.reset({
                                    index: 0,
                                    routes: [
                                        {
                                            name: "SpDashboardEntry",
                                            state: {
                                                routes: [
                                                    {
                                                        name: "SpHomeEntry"
                                                    }]
                                            }

                                        }]
                                }
                            )
                        }, 1000)

                    // }).catch((error) => {

                    // })

                } else {
                    showToast("Error", "You are not a service provider")
                }
            } else {
                showToast("Error", "Try Again with Credentials or Contact Admin")
            }

        }).catch(err => {
            console.log(err.message)
            showToast("Error", "Something went wrong")
        }).finally(() => {
            loading.close();
        })
    }
    const showToast = (er1, er2) => {
        Toast.show({
            type: 'error',
            text1: er1,
            text2: er2,
        });

    }
    return (
        <View style={{flex: 1}}>
            <TitleBar specificBack={"WelcomeScreen"} navigation={navigation} title={""}/>
            <BaseAuth subHeading={"Please enter your data to continue"} heading={"Welcome to K.D.R"}>
                {/* <View style={styles.socialContainer}>
<View style={{ flex: 1 }}>
<Image source={require('../../../../../assets/img/google.png')} resizeMode="contain" style={{ width: 30, height: 30 }}/>
</View>
<View style={{ flex: 3 }}>
<Text style={HEADINGS.H3}>Login with Google</Text>
</View>
</View> */}
                {/* <OrLine style={{marginTop: 30}}/> */}

                <TextInputKdr containerStyle={{marginTop: 40,}} error={""} label={"Email"}
                              placeholder={"Enter your Email here"}
                              value={credentials.email}
                              icon={<MaterialCommunityIcons name="email" size={25} color={COLOR.primary}/>}
                              onChangeText={(e) => {
                                  setCredentials({
                                      ...credentials,
                                      email: e.trim(),
                                  })
                              }}
                />


                <PasswordInputKdr containerStyle={{marginTop: 8}} error={""}
                                  label={"Password"} placeholder={"********"}
                                  value={credentials.password}
                                  onChangeText={(e) => {
                                      setCredentials({
                                          ...credentials,
                                          password: e.trim(),
                                      })
                                  }}
                />

                {error !== null && <TextKdr style={{color: "red", marginTop: 5, fontSize: 14}}>
                    {error}
                </TextKdr>}
                <View style={[styles.forget]}>
                    <Pressable onPress={() => {
                        navigation.navigate("UserAuthEntry", {
                            screen: "RecoverEmail"
                        })
                    }} style={{padding: 10, flex: 1, justifyContent: "flex-end", alignItems: "flex-end"}}>
                        <TextKdr style={{color: COLOR.primary}}>
                            Forget Password?
                        </TextKdr>
                    </Pressable>
                </View>


                <ButtonKdr onPress={() => login()} text={"Log in"}/>


                <View style={[styles.forget, {marginTop: 10}]}>
                    <Pressable onPress={() => {
                        navigation.navigate("ServiceProviderAuthEntry", {
                            screen: "SpPage1"
                        })
                    }} style={[styles.registerNow]}>
                        <TextKdr>
                            Don’t have an account?
                        </TextKdr>
                        <TextKdr style={{fontWeight: "bold", marginStart: 5, color: COLOR.primary}}>
                            Sign up
                        </TextKdr>
                    </Pressable>
                </View>


                {/*

        <View style={{flexDirection: "row"}}>
           <View style={styles.authLayout}>
               <RoundButtonKdr style={styles.roundRadius}>
                   <AntDesign name="google" size={20} color="black"/>
               </RoundButtonKdr>
               <RoundButtonKdr style={styles.roundRadius}>
                   <AntDesign name="twitter" size={20} color="black"/>
               </RoundButtonKdr>
               <RoundButtonKdr style={styles.roundRadius}>
                   <AntDesign name="apple1" size={20} color="black"/>
               </RoundButtonKdr>
           </View>
        </View> */}

            </BaseAuth>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 90,
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
        marginTop: 10,
        color: "#333333"
    },
    input: {
        marginTop: 10,
    },
    forget: {
        flexDirection: "row",
        marginBottom: 10,
    },
    registerNow: {
        padding: 10,
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    roundRadius: {
        marginHorizontal: 10,
    },
    authLayout: {
        flex: 1,
        flexDirection: "row",
        marginTop: 40,
        justifyContent: "center",
        alignItems: "center"
    },
    socialContainer: {
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginHorizontal: "2%",
        borderRadius: 10,
        flexDirection: "row",
        alignSelf: "center",
        alignItems: "center",
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    }
});
