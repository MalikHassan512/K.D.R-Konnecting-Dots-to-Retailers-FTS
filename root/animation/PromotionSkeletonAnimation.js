import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Skeleton } from "@rneui/base";
import SHADOWS from "../Styles/shadows";
import PADDING from "../Styles/PADDINGS";

const ImageSize = 150;


export default function SkeletonServicesAnimationComponent({ ContainerStyles }) {


    return (
        <View style={[styles.container, SHADOWS.shadowSm, ContainerStyles]}>
            <Skeleton style={{
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,

            }} height={ImageSize} />

            <View style={[PADDING.H10, {
                width: "100%",
            }]}>
                <Skeleton style={[{ marginTop: 20, }]} height={5} />
                <Skeleton style={[{ marginTop: 5, }]} height={5} />
            </View>

        </View>
    )
}


function PromotionSkeletonAnimation({ fromHome }) {

    return <View style={{
        width: "100%",
        flex: 1,
        padding: !fromHome ? 30 : null,
        marginTop: !fromHome ? 14 : null,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    }}>
        <SkeletonServicesAnimationComponent ContainerStyles={{ width: "100%", marginTop: 14, height: 200 }} />
        {!fromHome && (
            <>
                <SkeletonServicesAnimationComponent ContainerStyles={{ width: "100%", marginTop: 14, height: 200 }} />

                <SkeletonServicesAnimationComponent ContainerStyles={{ width: "100%", marginTop: 14, height: 200 }} />
            </>
        )}



    </View>
}


function EmptyListAnimation() {

    return <View style={{
        width: "100%",
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    }}>
        <SkeletonServicesAnimationComponent ContainerStyles={{ width: "48%", marginTop: 14 }} />
        <SkeletonServicesAnimationComponent ContainerStyles={{ width: "48%", marginTop: 14 }} />
        <SkeletonServicesAnimationComponent ContainerStyles={{ width: "48%", marginTop: 14 }} />
        <SkeletonServicesAnimationComponent ContainerStyles={{ width: "48%", marginTop: 14 }} />
        <SkeletonServicesAnimationComponent ContainerStyles={{ width: "48%", marginTop: 14 }} />
        <SkeletonServicesAnimationComponent ContainerStyles={{ width: "48%", marginTop: 14 }} />
    </View>
}


const styles = StyleSheet.create({
    container: {
        width: ImageSize,
        borderRadius: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        marginHorizontal: 3,
        paddingBottom: 20,
    },

});


export {
    SkeletonServicesAnimationComponent,
    EmptyListAnimation,
    PromotionSkeletonAnimation
}