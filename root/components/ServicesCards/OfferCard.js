import {StyleSheet, Pressable, View, Image} from "react-native";
import SHADOWS from "../../Styles/shadows";
import TextKdr from "../Text";
import {Dimensions} from 'react-native';


const ImageSize = 40;

export default function OfferCard({navigation, source, onPress, color, discription, title, ...props}) {

    return (
        <View style={[styles.container, SHADOWS.shadowSm, {backgroundColor: color}]} onPress={onPress} {...props}>
            <Image source={source} style={styles.image}/>
            <View style={styles.offer}>
                <TextKdr style={[styles.title, {}]}>{title}</TextKdr>
                <TextKdr style={styles.dis}>{discription}</TextKdr>

                <TextKdr style={styles.button}>Shop Now</TextKdr>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width / 1.3,
        borderRadius: 10,
        backgroundColor: '#272626',
        paddingHorizontal: 20,
        flexDirection: "row",
        paddingVertical: 10,
        marginHorizontal: 4,
        alignItems: 'center',
    }, image: {
        width: ImageSize,
        height: ImageSize,

    },
    title: {
        marginTop: 10,
        flexWrap: 'wrap',
        fontSize: 14,
        color: "white",
        fontWeight: 'bold',
    },
    dis: {
        marginTop: 2,
        flexWrap: 'wrap',
        fontSize: 12,
        color: "white",
    },
    offer: {
        marginLeft: 15,
        flex: 1,
    },
    button: {
        marginTop: 10,
        padding: 5,
        backgroundColor: '#F2F2F2',
        width: 100,
        borderRadius: 5,
        textAlign: 'center',

    }
});