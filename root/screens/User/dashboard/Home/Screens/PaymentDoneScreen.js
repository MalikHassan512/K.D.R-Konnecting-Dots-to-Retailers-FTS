import {View, StyleSheet, Image} from "react-native";
import TextKdr from "../../../../../components/Text";
import ButtonKdr from "../../../../../components/Button/Buttonkdr";

function SuccessInner({title, description, onPress}) {
    return (
        <>
            <Image source={require("../../../../../../assets/img/done.png")}/>
            <TextKdr style={styles.heading}>{title}</TextKdr>
            <TextKdr style={styles.subHeading}>{description}</TextKdr>
            <ButtonKdr onPress={onPress} style={{marginTop: 70}} text={"Ok"}/>
        </>
    )
}

export default function PasswordRecoveryDoneScreen({navigation, ...props}) {
    return (
        <View style={styles.container}>
            <SuccessInner onPress={() => {
                navigation.navigate("EntryHome", {
                    screen: "Home",
                    index: 0,
                })
            }} title={"Done"} description={"You have successfully set up your new password."}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 150,
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

    }
});

export {
    SuccessInner,
}
