import {StyleSheet} from "react-native";

const FLEX_STYLE = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    column: {
        flexDirection: "column",
    },
    center: {
        alignItems: "center",
        justifyContent: "center",
    },
    rowCenter: {
        flexDirection: "row",
        alignItems: "center",
    },
    columnCenter: {
        flexDirection: "column",
        alignItems: "center",
    },
    rap:{
        flexWrap:"wrap"
    },
    spaceBetween: {
        justifyContent: "space-between",

    },
    one: {
        flex: 1,
    }
});


export default FLEX_STYLE;