import {Pressable, View, Text, StyleSheet, Image} from "react-native";
import TextInputKdr from "../../../../components/Input";
import PasswordInputKdr from "../../../../components/PasswordInput";
import BaseAuth from "../Base";
import ButtonKdr from "../../../../components/Button/Buttonkdr";
import TextKdr from "../../../../components/Text";
import Toast from "react-native-toast-message";
import {useContext, useEffect, useState} from "react";
import {LoadingContext} from "../../../../context/modal/LoadingContext";
import Checkbox from 'expo-checkbox';
import DateInput from "../../../../components/Input/DateInput";
import API_URLS from "../../../../API/USER/URLS";
import COLOR from "../../../../Styles/Color";
import PADDING from "../../../../Styles/PADDINGS";
import TitleBar from "../../../../components/TitleBar/TitleBar";
import HEADINGS from "../../../../Styles/heading";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import PasswordValidation from "../../../../components/PasswordInput/PasswordValidation";
import {useNavigation} from "@react-navigation/native";

import moment from "moment";
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

function TermAndCondition({style, form, setForm, error, ...props}) {
    const navigation = useNavigation()
    return (
        <>
            <View style={[styles.forget, {marginBottom: 0}]}>
                <View style={{
                    padding: 10,
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "flex-start"
                }}>
                    <View style={{
                        backgroundColor: "white",
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 3,
                            height: 3,
                        },
                        shadowOpacity: 0.27,
                        shadowRadius: 4.65,

                        elevation: 6,
                    }}>
                        <Checkbox
                            value={form.agreeForTermsAndCond}
                            color={form.agreeForTermsAndCond && COLOR.primary}
                            onValueChange={(newValue) => setForm({...form, agreeForTermsAndCond: newValue})}
                        />
                    </View>

                    <TextKdr style={{marginHorizontal: 10}}>
                        I agree to terms & conditions*
                    </TextKdr>
                </View>
            </View>
            <View style={[styles.forget, {marginBottom: 0}]}>
                <View style={{
                    padding: 10,
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "flex-start"
                }}>
                    <View style={{
                        backgroundColor: "white",
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 3,
                            height: 3,
                        },
                        shadowOpacity: 0.27,
                        shadowRadius: 4.65,

                        elevation: 6,
                    }}>

                        <Checkbox
                            value={form.agreeForNewsUpdate}
                            color={form.agreeForTermsAndCond && COLOR.primary}
                            onValueChange={(newValue) => setForm({...form, agreeForNewsUpdate: newValue})}
                        />
                    </View>
                    <TextKdr style={{marginHorizontal: 10}}>
                        I agree to receive offers, news and updates
                    </TextKdr>
                </View>
            </View>
            <View style={[styles.forget, {marginTop: 10}]}>
                <TextKdr style={[styles.TermAndConditions]}>
                    By clicking Register, you agree to K.D.R’s
                    <Text style={styles.boldText} onPress={() => navigation.navigate("ServiceProviderAuthEntry", {
                        screen: "TermsOfService"
                    })}>Terms and Conditions</Text>
                    , confirm you have read our
                    <Text style={styles.boldText} onPress={() => navigation.navigate("ServiceProviderAuthEntry", {
                        screen: "PrivacyPolicy"
                    })}> Privacy Notice.</Text>
                </TextKdr>

            </View>
            <TextKdr style={[{color: "red", marginBottom: 10}]}>
                {error}
            </TextKdr>
        </>

    )


}


export default function SignUp({navigation, ...props}) {
    const loading = useContext(LoadingContext);
    const [passwordIsValid, setPasswordValid] = useState(false)
    const [form, setForm] = useState({
        Name: "",
        username: "",
        email: "",
        password: "",
        phone: "",
        address: {
            address: "",
        },
        roles: "CLIENT",
        agreeForNewsUpdate: false,
        agreeForTermsAndCond: false
    })
    const [error, setError] = useState(null);


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


    const submit = () => {
        setError(null)
        if (form.agreeForTermsAndCond === false) {
            setError({
                termAndConditions: "Please agree to the terms and conditions"
            })
            return;
        }
        loading.show();
        fetch(API_URLS.signUp, {
            method: 'POST',
            body: JSON.stringify(form),
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json'

            }
        }).then(response => {

            loading.close();
            if (response.status <= 201) {
                return response.json();
            } else if (response.status === 400) {
                console.log(response)
                Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: "Please check your data",
                })
                response.json().then((e) => {
                    console.log(e)
                    setError(e);
                });
                return null;
            }
        }).then((e) => {
            if (e) {
                Toast.show({
                    type: "success",
                    text1: "Success",
                    text2: "You have successfully registered",
                })
                navigation.reset(
                    {
                        index: 0,
                        routes: [{name: "SignUpComplete"}]
                    }
                );
            }
        }).catch(
            (e) => {
                Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: "Something went wrong",
                })
            }
        )


    }
    return (
        <View style={{flex: 1}}>
            <TitleBar navigation={navigation} title={""}/>
            <BaseAuth subHeading={"Please enter your data to continue"} heading={"Welcome to K.D.R"}>
                {/* <View style={styles.socialContainer}>
<View style={{ flex: 1 }}>
<Image source={require('../../../../../assets/img/google.png')} resizeMode="contain" style={{ width: 30, height: 30 }}/>
</View>
<View style={{ flex: 3 }}>
<Text style={HEADINGS.H3}>Signup with Google</Text>
</View>
</View> */}
                {/* <OrLine style={{marginTop: 30}}/> */}
                <TextInputKdr containerStyle={{marginTop: 40}} error={error?.Name} label={"Full Name"}
                              placeholder={"Enter your name here"}
                              icon={<MaterialCommunityIcons name="account" size={30} color={COLOR.primary}/>}
                              value={form.Name}
                              onChangeText={(e) => {
                                  setForm({
                                      ...form,
                                      Name: e,
                                  })
                              }}
                />
                <TextInputKdr containerStyle={{marginTop: 5}} error={error?.username} label={"Username"}
                              placeholder={"Enter your username here"}
                              icon={<MaterialCommunityIcons name="account" size={30} color={COLOR.primary}/>}
                              value={form.username}
                              onChangeText={(e) => {
                                  setForm({
                                      ...form,
                                      username: e,
                                  })
                              }}
                />

                <TextInputKdr containerStyle={{marginTop: 5}} error={error?.email} label={"Email"}
                              placeholder={"jhon@example.com"}
                              icon={<MaterialCommunityIcons name="email" size={30} color={COLOR.primary}/>}
                              value={form.email}
                              onChangeText={(e) => {
                                  setForm({
                                      ...form,
                                      email: e.toLowerCase().trim(),
                                  })
                              }}
                />

                {!appstoreChecker ?

                    <DateInput containerStyle={{marginTop: 5}} error={error?.dob} label={"Date of Birth"}
                               placeholder={"DD-MM-YYYY"}
                               icon={<MaterialCommunityIcons name="calendar" size={30} color={COLOR.primary}/>}
                               value={form.dob}
                               onChangeText={(e) => {
                                   setForm({
                                       ...form,
                                       dob: moment(e).format("YYYY-MM-DD"),
                                   })
                               }}
                    />

                    : null}

                <TextInputKdr containerStyle={{marginTop: 5}} error={error?.address?.address}
                              label={"Address"} placeholder={"address"}
                              value={form.address.address}
                              icon={<MaterialCommunityIcons name="home" size={30} color={COLOR.primary}/>}
                              onChangeText={(e) => {
                                  setForm({
                                      ...form,
                                      address: {
                                          address: e
                                      }

                                  })
                              }}
                />
                <TextInputKdr containerStyle={{marginTop: 5}} error={error?.phone}
                              label={"Phone"} placeholder={"phone"}
                              icon={<MaterialCommunityIcons name="phone" size={30} color={COLOR.primary}/>}
                              value={form.phone}
                              keyboardType={"phone-pad"}
                              onChangeText={(e) => {
                                  setForm({
                                      ...form,
                                      phone: e

                                  })
                              }}
                />
                <PasswordInputKdr containerStyle={{marginTop: 5}} error={error?.password}
                                  label={"Password"} placeholder={"********"}
                                  value={form.password}
                                  onChangeText={(e) => {
                                      setForm({
                                          ...form,
                                          password: e.trim(),
                                      })

                                  }}
                />
                <PasswordValidation password={form.password} setIsValid={setPasswordValid}/>


                <TermAndCondition form={form} setForm={setForm} error={error?.termAndConditions}/>
                <ButtonKdr
                    disabled={!passwordIsValid}
                    style={!passwordIsValid && {backgroundColor: "grey"}}
                    onPress={() => submit()} text={"Register as Consumer"}/>

                <View style={[styles.forget, {marginTop: 15}]}>
                    <Pressable onPress={() => navigation.goBack()} style={[styles.TermAndConditions]}>
                        <TextKdr>
                            Already have an account?
                        </TextKdr>
                        <TextKdr style={{fontWeight: "bold", marginStart: 5, color: COLOR.primary}}>
                            Login Now
                        </TextKdr>
                    </Pressable>
                </View>


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
        marginTop: 10,
        marginBottom: 15,
    },
    TermAndConditions: {
        flex: 1,
        flexDirection: "row",
        textAlign: "left",
        fontSize: 12,
        marginStart: 10,
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
    boldText: {
        fontWeight: "bold",
        color: COLOR.primary,
        fontSize: 12,
        textDecorationLine: "underline"
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


export {
    TermAndCondition
}
