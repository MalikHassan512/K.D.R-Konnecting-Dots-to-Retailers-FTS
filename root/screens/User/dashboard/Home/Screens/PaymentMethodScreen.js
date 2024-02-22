import {FlatList, Pressable, StyleSheet, View} from "react-native";
import TitleBar from "../../../../../components/TitleBar/TitleBar";
import {StatusBar} from "expo-status-bar";
import COLOR from "../../../../../Styles/Color";
import SelectCardButton from "../Component/SelectCardButton";
import CardsData from "../other/CardsData";
import {useState} from "react";
import TextKdr from "../../../../../components/Text";
import HEADINGS from "../../../../../Styles/heading";
import ButtonKdr from "../../../../../components/Button/Buttonkdr";

function AddNew({navigation}) {

    return <Pressable style={{marginTop: 20, marginStart: 10}} onPress={() => {
        navigation.navigate("AddNewCard")
    }}>
        <TextKdr style={[HEADINGS.H3, {textDecorationLine: "underline"}]}>+ Add new</TextKdr>
    </Pressable>

}


export default function PaymentMethodScreen({navigation, ...props}) {
    const [selected, SetSelected] = useState(null);

    return (
        <View style={[styles.container]} {...props}>
            <StatusBar style={"dark"} backgroundColor={COLOR.white}/>
            <TitleBar title={"Select payment method"} navigation={navigation}/>
            <FlatList
                data={CardsData}
                contentContainerStyle={{
                    paddingHorizontal: 20,
                    marginTop: 10,
                    paddingBottom:20,
                }}
                renderItem={({item}) => {
                    return <SelectCardButton selected={selected === item.id} onPress={(id) => SetSelected(id)}
                                             number={item.cardNumberIban} id={item.id}/>

                }}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                key={item => item.id}
                ListFooterComponent={<AddNew navigation={navigation}/>}
            />
            <ButtonKdr style={{marginHorizontal: 25}} text={"Proceed for payment"}/>

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