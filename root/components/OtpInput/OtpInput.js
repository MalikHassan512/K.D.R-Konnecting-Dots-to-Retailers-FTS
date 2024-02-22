import {StyleSheet, TextInput, View} from "react-native";
import {useState, useEffect, useRef} from "react";
import TextKdr from "../Text";

export default function OtpInput(props) {
    const error = props.error;
    const BorderColor = error.length > 0 ? "red" : "#000000";
    const style = StyleSheet.create({
        MainContainer: {
            flexDirection: "column"
        }, errorText: {
            color: "red",
            marginTop: 20,
            fontSize: 14,
            textAlign: "center",

        },
        container: {
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            marginTop: 25,
        },
        border: {
            borderColor: BorderColor,
            width: 40,
            height: 40,
            borderRadius: 4,
            borderWidth: 1,
            marginStart: 5,
            marginEnd: 5,
        },
        Input: {
            flex: 1,
            color: "#000000",
            paddingStart: 14,
            fontWeight: "500",
            fontSize: 18,

        }

    })
    const PinCount = props.pinCount;
    let [Pin, setPin] = useState(new Array(PinCount));
    const onCodeChange = props.onCodeChange;
    let TextInputRef = []
    for (let i = 0; i < PinCount; i++) {
        TextInputRef.push(new useRef())
    }
    const didMountRef = useRef(false);

    useEffect(() => {
        if (didMountRef.current === false) {
            didMountRef.current = true;
            return;
        }

        onCodeChange(Pin);
    }, [Pin])

    function getInputs() {
        let inp = []
        for (let i = 0; i < PinCount; i++) {
            if (i === 0) {
                inp.push(<View key={i} style={style.border}>
                        <TextInput autoFocus={props.autoFocusOnLoad} keyboardType={"numeric"} maxLength={1}
                                   onChangeText={text => {
                                       let Copy = [...Pin]
                                       Copy[i] = text;
                                       setPin(Copy);
                                       if (text.length === 0) {
                                           return
                                       }

                                       TextInputRef[i + 1].current.focus();


                                   }
                                   }
                                   style={style.Input}/>
                    </View>
                )
            } else {
                inp.push(
                    <View key={i} style={style.border}>
                        <TextInput keyboardType={"numeric"}
                                   maxLength={1}
                                   onChangeText={text => {
                                       props.setError()
                                       let Copy = [...Pin]
                                       Copy[i] = text;
                                       setPin(Copy);
                                       if (text.length === 0) {

                                           return
                                       }

                                       try {
                                           TextInputRef[i + 1].current.focus();
                                       } catch (Ex) {
                                       }

                                   }

                                   }
                                   ref={TextInputRef[i]}
                                   style={style.Input}/>
                    </View>)
            }

        }
        return inp
    }

    return (

        <View style={style.MainContainer}>
            <View style={style.container}>

                {
                    getInputs()

                }


            </View>

            {error.length > 0 ? <TextKdr style={style.errorText}>{error}</TextKdr> : null}
        </View>
    )
}