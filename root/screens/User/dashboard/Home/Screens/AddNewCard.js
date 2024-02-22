import {FlatList, Pressable, StyleSheet, View, ScrollView} from "react-native";
import TitleBar from "../../../../../components/TitleBar/TitleBar";
import {StatusBar} from "expo-status-bar";
import COLOR from "../../../../../Styles/Color";
import TextInputKdr from "../../../../../components/Input";
import FLEX_STYLE from "../../../../../Styles/FLEXSTYLE";
import Checkbox from "expo-checkbox";
import {useState} from "react";
import TextKdr from "../../../../../components/Text";
import HEADINGS from "../../../../../Styles/heading";
import ButtonKdr from "../../../../../components/Button/Buttonkdr";


export default function AddNewCard({navigation, ...props}) {
    const [data, setData] = useState({
        cardNumber: "",
        expiryDate: "",
        cvc: "",
        saveCard: false,
    })
    return (
        <View style={[styles.container]} {...props}>
            <StatusBar style={"dark"} backgroundColor={COLOR.white}/>
            <TitleBar title={"Add new "} navigation={navigation}/>
            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 20,
                    marginTop: 40,
                }}
            >
                <View>
                    <TextInputKdr
                        label={"Card number"}
                        placeholder={"Enter card number"}
                        maxLength={16}
                        keyboardType={"number-pad"}
                    />
                    <View style={[FLEX_STYLE.row, {flex: 1}]}>
                        <TextInputKdr
                            label={"Expiry date"}
                            placeholder={"05/27"}
                            containerStyle={{flex: 1, marginStart: 5}}
                            maxLength={5}
                        />
                        <TextInputKdr
                            label={"CVC"}
                            placeholder={"789"}
                            containerStyle={{flex: 1, marginStart: 5}}
                            maxLength={3}
                        />
                    </View>
                    <TextInputKdr
                        label={"Card Holder Name"}
                        placeholder={"jhon doe"}
                    />

                    <View style={[FLEX_STYLE.row, {margin: 20}]}>
                        <Checkbox
                            value={data.saveCard}
                            color={"#E83D23"}
                            onValueChange={(newValue) => setData({...data, saveCard: newValue})}
                        />
                        <TextKdr style={[HEADINGS.p, {marginStart: 10}]}> Securely save card and details</TextKdr>
                    </View>

                </View>

            </ScrollView>
            <ButtonKdr text={"Proceed for payment"} onPress={() => {
                navigation.navigate("PasswordRecoveryDoneScreen")
            }} style={{marginHorizontal: 25}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.white,
        paddingBottom: 30,
    }
});