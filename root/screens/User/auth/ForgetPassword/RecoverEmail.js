import TextInputKdr from "../../../../components/Input";
import BaseAuth from "../Base";
import ButtonKdr from "../../../../components/Button/Buttonkdr";
import Toast from "react-native-toast-message";
import {useContext, useState} from "react";
import {LoadingContext} from "../../../../context/modal/LoadingContext";
import SendPasswordResetEmail from "../../../../API/USER/ForgetPasswordApi";
import TitleBar from "../../../../components/TitleBar/TitleBar";
import { View } from "react-native";


export default function RecoverEmail({navigation,...props}) {
    const loading = useContext(LoadingContext);
    const [error, setError] = useState(false)
    const [credentials, setCredentials] = useState({
        email: "",
    })


    const Submit = () => {
        loading.show();
        setError(null)
        SendPasswordResetEmail(credentials).then((res) => {
            loading.close()
           if (res.status <= 201){
               Toast.show({
                   type: 'success',
                   text1: 'Password Recovery Email Sent',
                   text2: 'An email has been sent to your email address.',
               });
            navigation.navigate("UserAuthEntry", {
                screen: "OtpScreen",
                params: {
                    email: credentials.email,
                }
            })}else{
               setError(res)

           }
        }).catch((e) => {
            console.log(e)
            loading.close()
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: "Something went wrong"
            });
        })
        
    }
    return (
        <View style={{flex:1}}>
<TitleBar navigation={navigation} title={"Forget Password"}/>
        <BaseAuth subHeading={"Recover your password using your email address"} heading={"Password Recovery"}>


            <TextInputKdr containerStyle={{marginTop: 40, marginBottom: 20}} error={error?.message} label={"Email"}
                          placeholder={"jhon@example.com"}
                          value={credentials.email}
                          onChangeText={(e) => {
                              setCredentials({
                                  ...credentials,
                                  email: e.trim(),
                              })
                          }}
            />


            <ButtonKdr onPress={() => Submit()} text={"Send Password Recovery Email"}/>


        </BaseAuth>
        </View>
    )
}

