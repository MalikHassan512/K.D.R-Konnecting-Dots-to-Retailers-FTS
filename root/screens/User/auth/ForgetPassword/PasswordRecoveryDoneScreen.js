import {View, StyleSheet, Image} from "react-native";
import TextKdr from "../../../../components/Text";
import ButtonKdr from "../../../../components/Button/Buttonkdr";


export default function PasswordRecoveryDoneScreen({navigation, ...props}) {
    return (
        <View style={styles.container}>
            <Image source={require("../../../../../assets/img/done.png")}/>
            <TextKdr style={styles.heading}>Done</TextKdr>
            <TextKdr style={styles.subHeading}>You have successfully set up your new password.</TextKdr>
            <ButtonKdr onPress={() => {
                navigation.navigate("UserAuthEntry", {
                    screen: "Login",
                    index: 0,
                })
            }} style={{marginTop: 70}} text={"Ok"}/>
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