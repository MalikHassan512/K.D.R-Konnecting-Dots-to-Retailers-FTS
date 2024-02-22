import {StyleSheet} from "react-native";
import COLOR from "./Color";

const HEADINGS = StyleSheet.create({
    H1: {
        fontSize: 20,
        fontWeight: '700',
    },
    H2: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 15,
    },
    H3: {
        fontSize: 16,
        fontWeight: '500',
    },
    H4: {
        fontSize: 14,
        fontWeight: '400',
    },
    p: {
        fontSize: 14,
        fontWeight: '400',
        color: "#333333",
    },
    p1: {
        fontSize: 12,
        fontWeight: '400',
        color: "#333333",
    },tabBar: {
        fontSize: 10,
        fontWeight: '400',
        color: "#333333",
    },
    underline: {
        textDecorationLine: 'underline',
    },
    colorPrimary: {
        color: COLOR.primary
    },
    colorBlack: {
        color: COLOR.black
    },
    colorWhite: {
        color: COLOR.white
    }
});


export default HEADINGS;