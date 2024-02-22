import {Pressable, View, StyleSheet, Image, Text, Platform} from "react-native";
import TextInputKdr from "../../../../components/Input";
import PasswordInputKdr from "../../../../components/PasswordInput";
import BaseAuth from "../Base";
import ButtonKdr from "../../../../components/Button/Buttonkdr";
import TextKdr from "../../../../components/Text";
import RoundButtonKdr from "../../../../components/Button/roundButton";
import {AntDesign, EvilIcons, MaterialCommunityIcons} from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import {useContext, useState} from "react";
import {LoadingContext} from "../../../../context/modal/LoadingContext";
import SessionContext from "../../../../context/Session/session";
import API_URLS from "../../../../API/USER/URLS";
import TitleBar from "../../../../components/TitleBar/TitleBar";
import HEADINGS from "../../../../Styles/heading";
import COLOR from "../../../../Styles/Color";


////firebase work
import database from '@react-native-firebase/database'
import messaging from "@react-native-firebase/messaging";


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
    const [error, setError] = useState(null);
    const session = useContext(SessionContext);
    const [token, setToken] = useState(null)

    messaging().getToken().then(token => {
        setToken(token)
    });

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    })

    const submit = () => {
        if (credentials.email.trim() === "" || credentials.password.trim() === "" ) {
            setError("Please fill all the fields");
            return;
        }
        loading.show();
        setError(null);

        console.log(JSON.stringify({
            email: credentials.email,
            password: credentials.password,
            deviceToken: token
        }), )


        fetch(API_URLS.login, {
            method: 'POST',
            // body: JSON.stringify(credentials),
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
                deviceToken: token
            }),
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(async (response) => {
                loading.close();
                let json = await response.json();
                if (response.status <= 200) {
                    console.log("response from login::>>", json)
                    return json;
                } else if (response.status >= 400) {
                    json.then(err => {
                        setError(err.error);
                    });
                }
            })
            .then(async (result) => {

                if (result === undefined) {
                    return;
                }

                if (result.profile.roles === "CLIENT") {
                    session.setSession(result);
                    navigation.reset({
                        index: 0,
                        routes: [
                            {
                                name: "UserDashboardEntry",
                                state: {
                                    routes: [
                                        {
                                            name: "EntryHome"
                                        }]
                                }

                            }]

                    })
                }

                // if (result.profile.roles === "CLIENT") {

                //     let email = result.profile.email.split('@')


                //     await database().ref("kdrUsers").child(email[0])
                //         .set({
                //             "userID": result?.profile?.id,
                //             "deviceToken": token ,
                //             "email": result.profile.email
                //         }).then((data) => {
                //         session.setSession(result);

                //         navigation.reset({
                //                 index: 0,
                //                 routes: [
                //                     {
                //                         name: "UserDashboardEntry",
                //                         state: {
                //                             routes: [
                //                                 {
                //                                     name: "EntryHome"
                //                                 }]
                //                         }

                //                     }]
                //             }
                //         )

                     
                //     }).catch((error) => {
                //         console.log("error in login catch::>> ", error)
                //     })
                // } else {
                //     Toast.show({
                //         type: 'error',
                //         text1: 'Error',
                //         text2: 'You are not a client'
                //     });
                // }


            }).catch(error => {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Please check your data'
            });
            loading.close();
            console.log('error', error)
        });
    }
    return (
        <View style={{flex: 1}}>
            <TitleBar specificBack={"WelcomeScreen"} navigation={navigation} title={""}/>
            <BaseAuth subHeading={"Please enter your data to continue"} heading={"Welcome to K.D.R"}>


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


                <ButtonKdr onPress={() => submit()} text={"Log in"}/>


                <View style={[styles.forget, {marginTop: 10}]}>
                    <Pressable onPress={() => {
                        navigation.navigate("UserAuthEntry", {
                            screen: "SignUp"
                        })
                    }} style={[styles.registerNow]}>
                        <TextKdr>
                            Don’t have an account?
                        </TextKdr>
                        <TextKdr style={{fontWeight: "bold", marginStart: 5, color: COLOR.primary}}>
                            Sign Up
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
