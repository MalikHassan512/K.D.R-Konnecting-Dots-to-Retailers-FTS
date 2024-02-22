import {StyleSheet, View, Image, Text} from "react-native";
import BaseAuth from "../../../User/auth/Base";
import {useContext, useEffect, useState} from "react";
import Toast from "react-native-toast-message";
import TextInputKdr from "../../../../components/Input";
import PasswordInputKdr from "../../../../components/PasswordInput";
import ButtonKdr from "../../../../components/Button/Buttonkdr";
import {LoadingContext} from "../../../../context/modal/LoadingContext";
import MARGINS from "../../../../Styles/MARGIN";
import DateInput from "../../../../components/Input/DateInput";
import Urls from "../../../../other/Urls";
import TitleBar from "../../../../components/TitleBar/TitleBar";
import HEADINGS from "../../../../Styles/heading";
import TextKdr from "../../../../components/Text";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import COLOR from "../../../../Styles/Color";
import PasswordValidation from "../../../../components/PasswordInput/PasswordValidation";
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

export default function SignUpPage1({navigation, ...props}) {
    const loading = useContext(LoadingContext);
    const [passwordIsValid, setPasswordValid] = useState(false)
    const [form, setForm] = useState({
        Name: "",
        username: "",
        email: "",
        dob: "",
        password: "",
        phone: "",
    })
    const [error, setError] = useState({
        Name: "",
        username: "",
        email: "",
        dob: "",
        password: "",
        phone: "",
    })
    const showToast = (type, txt1, txt2) => {
        Toast.show({
            type: type,
            text1: txt1,
            text2: txt2,
        });

    }


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


    const handleContinue = async () => {
        loading.show();
        await fetch(
            Urls.pageOneValidation,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form)


            }).then((e) => {
            loading.close();
            if (e.status === 200) {
                navigation.navigate("ServiceProviderAuthEntry", {
                    screen: "SpPage2",
                    params: {
                        form: form
                    }
                })
            } else if (e.status === 400) {
                e.json().then((e) => {
                    setError(e.error);
                    showToast("error", "Error", "Please provide valid data")
                });
            }
        })
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
                <TextInputKdr containerStyle={{marginTop: 40}} error={error.Name} label={"Full Name"}
                              placeholder={"Enter your name here"}
                              value={form.Name}
                              icon={<MaterialCommunityIcons name="account" size={30} color={COLOR.primary}/>}
                              onChangeText={(e) => {
                                  setForm({
                                      ...form,
                                      Name: e,
                                  })
                              }}
                />
                <TextInputKdr containerStyle={{marginTop: 5}} error={error.username} label={"Username"}
                              placeholder={"Enter your username here"}
                              value={form.username}
                              icon={<MaterialCommunityIcons name="account" size={30} color={COLOR.primary}/>}
                              onChangeText={(e) => {
                                  setForm({
                                      ...form,
                                      username: e,
                                  })
                              }}
                />

                <TextInputKdr containerStyle={{marginTop: 5}} error={error.email} label={"Email"}
                              placeholder={"jhon@example.com"}
                              icon={<MaterialCommunityIcons name="email" size={30} color={COLOR.primary}/>}
                              value={form.email}
                              onChangeText={(e) => {
                                  setForm({
                                      ...form,
                                      email: e,
                                  })
                              }}
                />

                {!appstoreChecker ?

                    <DateInput containerStyle={{marginTop: 5}} error={error?.dob} label={"Date of Birth"}
                               placeholder={"DD-MM-YYYY"}
                               icon={<MaterialCommunityIcons name="calendar" size={30} color={COLOR.primary}/>}
                               value={form.dob}
                               onChangeText={(e) => {

                                   let date = moment(e).format("YYYY-MM-DD");
                                   setForm({
                                       ...form,
                                       dob: date,
                                   })

                               }}
                    />
                    : null}

                <TextInputKdr containerStyle={{marginTop: 5}} label={"Phone Number"}
                              error={error.phone}
                              icon={<MaterialCommunityIcons name="phone" size={30} color={COLOR.primary}/>}
                              placeholder={"Enter your mobile number here"}
                              value={form.phone}
                              onChangeText={(e) => {
                                  setForm({
                                      ...form,
                                      phone: e,
                                  })
                              }}
                />
                <PasswordInputKdr containerStyle={{marginTop: 5}} error={error.password}
                                  label={"Password"} placeholder={"********"}
                                  value={form.password}
                                  onChangeText={(e) => {
                                      setForm({
                                          ...form,
                                          password: e,
                                      })
                                      console.log(form)
                                  }}
                />
                <PasswordValidation password={form.password} setIsValid={setPasswordValid}/>


                <ButtonKdr

                    disabled={!passwordIsValid}
                    style={[MARGINS.v14, !passwordIsValid && {backgroundColor: "grey"}]}
                    onPress={handleContinue} text={"Continue"}/>


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
        color: "#E83D23",
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
