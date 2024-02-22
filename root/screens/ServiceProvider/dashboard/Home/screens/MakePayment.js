import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    ImageBackground,
    FlatList,
    Pressable, KeyboardAvoidingView,
} from "react-native";
import React, {useContext, useEffect, useState} from "react";

import {CardField, confirmPayment, useConfirmPayment} from "@stripe/stripe-react-native";
import Urls from "../../../../../other/Urls";
import SessionContext from "../../../../../context/Session/session";
import Toast from "react-native-toast-message";
import TextKdr from "../../../../../components/Text";
import COLOR from "../../../../../Styles/Color";
import ButtonKdr from "../../../../../components/Button/Buttonkdr";
import {CURRENCY} from "../../../../../settings/settings";
import FLEX_STYLE from "../../../../../Styles/FLEXSTYLE";
import TitleBar from "../../../../../components/TitleBar/TitleBar";

const MakePayment = ({navigation, route}) => {
    let session = useContext(SessionContext);
    let Amount = route.params.amount
    let title = route.params.title
    let pkgId = route.params.id
    const [ButtonText, setButtonText] = useState("Make Payment of "+CURRENCY+Amount)
    const savePayment = async (intent,status,subscription) => {
        let payment_status = "CANCELLED"
        if(status)
            payment_status = "COMPLETED"
        console.log(payment_status)

        let data = {
            subscription:subscription,
            payment_status: payment_status,
            intent: intent

        }
        await fetch(Urls.savePayment, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: "Token " + session.session.token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json()
            ).then(
                data => {

                    if (data.status <= 200) {

                        if(payment_status === "COMPLETED")
                        {
                            showToast("success","Payment Successful","Your payment was successful")
                            navigation.navigate("SpHome");
                        }
                        else{
                            showToast("error","Payment Failed","Your payment was not successful")
                        }
                    }
                }
            ).catch(
                error => {
                    console.log(error)
                    showToast("error","Payment Failed","Your payment was not successful")
                }
            )
    }
    const showToast = (type,txt1,txt2) => {
        Toast.show({
            type: type,
            text1: txt1,
            text2: txt2,
        });

    }
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    let subscribeToPackage = async (intent,) => {
        let data = {
            package: pkgId

        }
        await fetch(Urls.AddSubscription, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: "Token " + session.session.token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json()
            ).then(
                data => {

                    if (data?.package === pkgId) {
                        savePayment(intent,true,data.id)

                    }
                }
            ).catch(
                error => {
                    console.log(error)
                    showToast("error","Error occurred",
                        "Something went wrong while adding subscription")

                }
            )
    }
    let handlePayment = async () => {
        setButtonText("Processing...")
        let secretIntent = ""
        let data = {
            amount: Amount
        }
        await fetch(Urls.createPaymentIntent, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: "Token " + session.session.token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json()
            ).then(async data => {
                if (data.status <= 200) {
                    secretIntent = data.clientSecret
                }
                let intent = data.clientSecret
                const {error,paymentIntent} = await confirmPayment(secretIntent,
                    {
                        type: "Card",
                        paymentMethodType: "Card",
                        billingDetails: {
                            name: session.session.profile.email,
                        }
                    })
                if(error)
                {
                    showToast("error","Payment Failed",error.message)
                    setButtonText("Make Payment of $"+Amount)
                    await savePayment("NONE",intent,false,error.message)

                }
                if(paymentIntent)
                {
                    await subscribeToPackage(intent,true,"Success")
                }






            }).catch(err => {
                showToast("error","Network Error",err.message)
            })
        // navigation.navigate("Confirmation");
    }
    // const [walletModal, setWalletModal] = useState(false);
    const [paymentModal, setPaymentModal] = useState(false);

    return (
        <View style={[FLEX_STYLE.one]}>
            <TitleBar navigation={navigation} title={"Make Payment"}/>
            <View style={[styles.container,FLEX_STYLE.one]}>
                {/* header Start */}

                {/* header closed */}
                <View
                    style={{
                        flex: 2,
                        alignSelf: "flex-start",

                        width: "100%",
                        marginTop: 8,
                    }}
                >
                    <View
                        style={{
                            width: "100%",

                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Image
                            style={{width: 69, height: 69, borderRadius: 16, marginTop: 23}}
                            source={{uri: session.session.profile.dpUrl}}
                        />
                        <TextKdr  style={{fontWeight: "500", fontSize: 20, marginTop: 8}}>
                            {session.session.profile.Name}
                        </TextKdr>
                        <TextKdr
                            style={{
                                fontWeight: "300",
                                fontSize: 11,
                                marginTop: 3,
                                color: "#22222280",
                            }}
                        >
                            subscribing to {title}
                        </TextKdr>
                        <TextKdr
                            style={{
                                fontWeight: "600",
                                fontSize: 24,
                                marginTop: 3,


                                color: "rgba(86, 0, 180, 1)",
                            }}
                            children={CURRENCY + Amount}
                        />

                    </View>
                    <View  showsVerticalScrollIndicator={false} style={{flex:5,backgroundColor:"rgba(255, 255, 255, 1)",elevation:5,borderTopLeftRadius:14,borderTopRightRadius:14,marginHorizontal:25,marginTop:30}}>
                        <View style={{flex:1}}>


                            <View
                                style={{
                                    width: "100%",
                                    borderTopWidth: 0.5,
                                    borderColor: "rgba(0, 0, 0, 0.19)",
                                    marginVertical:0,
                                }}
                            ></View>

                            <View
                                style={{
                                    width: "100%",
                                    borderTopWidth: 0.5,
                                    borderColor: "rgba(0, 0, 0, 0.19)",
                                    marginVertical:0,
                                }}
                            ></View>
                            <View style={{padding:25,flexDirection:"row",paddingBottom:15,paddingTop:10}}>
                                <TextKdr style={{fontSize:14,flex:5,marginTop: 8}}>Add Card Details</TextKdr>
                            </View>

                            {/*<AccountModal*/}
                            {/*    text={"By clicking on the button below you agree to the terms and conditions of the payment."}*/}
                            {/*    handleModal={()=>{*/}
                            {/*        setPaymentModal(false)*/}
                            {/*        handlePayment()*/}
                            {/*    }} visible={paymentModal} setVisible={setPaymentModal}/>*/}
                            <KeyboardAvoidingView
                                style={{
                                    alignItems: "center",
                                }}
                            >
                                <CardField

                                    style={{width:"95%",height:50,marginVertical:20}}
                                    postalCodeEnabled={false}
                                    cardStyle={{
                                        backgroundColor: "#FFFFFF",
                                        textColor: "#000000",
                                        borderRadius: 5,
                                        borderWidth: 1,



                                    }}

                                />
                            </KeyboardAvoidingView>
                            <View style={{flex:1,marginTop:20,alignItems:"center"}}

                            >

                                <ButtonKdr onPress={() => handlePayment()}
                                           style={[styles.button, ]}
                                           textStyle={[{color: COLOR.white},]} text={ButtonText}/>


                            </View>



                        </View>

                    </View>

                </View>
            </View>
        </View>
    );
};

export default MakePayment;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f3f3f3",
        paddingTop: 30,
        alignItems: "center",
        // justifyContent: "space-between",
    },
    button: {
        borderRadius: 10,
        marginHorizontal: 25,
        borderWidth: 1,
        backgroundColor: COLOR.primary,

        borderColor: COLOR.secondary,

    },
    header: {
        alignItems: "flex-start",
        justifyContent: "flex-start",
        width: "100%",
        marginTop: 30,
        paddingBottom: 15,
        borderBottomWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderBottomColor: "#22222217",
    },
    head: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    Shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.41,
        shadowRadius: 5.11,

        elevation: 6,
    },
});
