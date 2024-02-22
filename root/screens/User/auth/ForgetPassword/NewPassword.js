import TextInputKdr from "../../../../components/Input";
import BaseAuth from "../Base";
import ButtonKdr from "../../../../components/Button/Buttonkdr";
import Toast from "react-native-toast-message";
import {useContext, useState} from "react";
import {LoadingContext} from "../../../../context/modal/LoadingContext";
import PasswordInputKdr from "../../../../components/PasswordInput";
import {ResetPassword, VerifyOtp} from "../../../../API/USER/ForgetPasswordApi";


export default function NewPassword({navigation, route, ...props}) {
    const loading = useContext(LoadingContext);
    const {otp, email} = route.params;
    const [credentials, setCredentials] = useState({
        password: "", confirmPassword: ""
    })

    const [error, setError] = useState(null)


    function Validation() {
        if (credentials.password.length < 8) {
            setError({password: "Password must be at least 8 characters long."})
            return false
        }
        if (credentials.password !== credentials.confirmPassword) {
            setError({
                password: "Password does not match.", confirmPassword: "Password does not match."
            })
            return false
        }

        return true;
    }

    const Submit = () => {
        if (!Validation()) return;
        loading.show();
        setError(null)
        ResetPassword({
            otp: otp, email: email, password: credentials.password,
        }).then((res) => {
            loading.close()
            if (res.status <= 201) {
                Toast.show({
                    type: 'success', text1: 'Password Changed',
                    text2: 'You have successfully changed your password.',
                });
                navigation.navigate("UserAuthEntry", {
                    screen: "PasswordRecoveryDoneScreen",
                    index: 0,
                })
            } else {
                setError(res)
            }
        }).catch((e) => {
            loading.close()
            Toast.show({
                type: 'error', text1: 'Error', text2: "Something went wrong"
            });
        })
    }
    return (<BaseAuth subHeading={"Enter you new password"} heading={"Password Recovery"}>


        <PasswordInputKdr containerStyle={{marginTop: 40}} error={error?.password} label={"Password"}
                          placeholder={"********"}
                          value={credentials.password}
                          onChangeText={(e) => {
                              setCredentials({
                                  ...credentials, password: e,
                              })
                          }}
        />

        <PasswordInputKdr containerStyle={{marginTop: 5, marginBottom: 20}} error={error?.confirmPassword}
                          label={"Retype new password"}
                          placeholder={"********"}
                          value={credentials.confirmPassword}
                          onChangeText={(e) => {
                              setCredentials({
                                  ...credentials, confirmPassword: e,
                              })
                          }}
        />
        <ButtonKdr onPress={() => Submit()} text={"Set new password"}/>


    </BaseAuth>)
}

