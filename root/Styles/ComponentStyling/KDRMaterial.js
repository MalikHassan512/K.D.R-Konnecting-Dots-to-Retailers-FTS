import {StyleSheet} from "react-native";
import SHADOWS from "../shadows";
import COLOR from "../Color";


function Card(props = {}) {
    const backgroundColor = props.backgroundColor ? props.backgroundColor : "#fff";
    const borderColor = props.borderColor ? props.borderColor : "#fff";
    const borderWidth = props.borderWidth ? props.borderWidth : 0;
    const borderRadius = props.borderRadius ? props.borderRadius : 10;

    return [{
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: borderWidth,
        borderRadius: borderRadius,
        padding: 10,
    }, SHADOWS.shadowSm]
}

const MaterialStyles = StyleSheet.create({
    line: {
        borderBottomWidth: 1,
        borderBottomColor: COLOR.gray_800,
    }
});

const Circle = (radius) => {
    return {
        width: radius,
        height: radius,
        borderRadius: radius / 2,
    }
}

const KDRMaterial = {
    Card: Card,
    MaterialStyles: MaterialStyles,
    Circle: Circle,
}

export default KDRMaterial;

export {
    Card,
    MaterialStyles,
    Circle,
}