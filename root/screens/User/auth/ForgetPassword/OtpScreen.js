import BaseAuth from "../Base";
import ButtonKdr from "../../../../components/Button/Buttonkdr";
import Toast from "react-native-toast-message";
import {useContext, useState} from "react";
import {LoadingContext} from "../../../../context/modal/LoadingContext";
import OtpInput from "../../../../components/OtpInput/OtpInput";
import {VerifyOtp} from "../../../../API/USER/ForgetPasswordApi";


export default function OtpScreen({navigation, ...props}) {
    const loading = useContext(LoadingContext);
    const email = props?.route?.params.email;
    const [otp, setOtp] = useState("")
    const [error, setError] = useState(null)


    const Submit = () => {
        loading.show();
        setError(null)
        console.log(otp)
        VerifyOtp({
            otp: otp,
            email: email
        }).then((res) => {
            loading.close()
            if (res.status <= 201) {
                Toast.show({
                    type: 'success',
                    text1: 'Otp Verified',
                    text2: 'You can now reset your password.',
                });
                navigation.navigate("UserAuthEntry", {
                    screen: "NewPassword",
                    params: {
                        email: email,
                        otp: otp,
                    }
                })
            } else {
                setError(res)

            }
        }).catch((e) => {
            loading.close()

            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: "Something went wrong"
            });
        })
    }
    return (
        <BaseAuth subHeading={"Enter the 4 digit code you have received in your email"} heading={"Password Recovery"}>


            <OtpInput style={{width: '80%', height: 200, marginTop: 1}}
                      pinCount={4}
                      error={error === null ? "" : error?.message}
                      setError={() => {

                      }}
                      autoFocusOnLoad={true}
                      onCodeChange={(code => {
                          let otp1 = ""
                          let complete = true
                          for (let i = 0; i < 4; i++) {
                              if (code[i] === "" || code[i] === undefined) {
                                  complete = false
                              } else {
                                  otp1 = otp + code[i]
                              }
                          }
                          if (complete) {
                          }
                              setOtp(otp1)
                      })}
            />


            <ButtonKdr style={{marginTop: 30}} onPress={()=>{
                console.log(otp)
                console.log(email)
                Submit();
            }} text={"Ok"}/>


        </BaseAuth>
    )
}

