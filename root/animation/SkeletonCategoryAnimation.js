import React, {Component} from 'react';
import {StyleSheet, View, Dimensions, Animated, Platform, ScrollView, Pressable} from 'react-native';
import {Skeleton} from "@rneui/base";
import SHADOWS from "../Styles/shadows";
import FLEX_STYLE from "../Styles/FLEXSTYLE";
import TextKdr from "../components/Text";
import HEADINGS from "../Styles/heading";
import CategoryServiceCard from "../components/ServicesCards/CategoryServiceCard";

const ImageSize = 70;


function SkeletonCategoryAnimationComponent() {


    return (
        <View style={[styles.container, SHADOWS.shadowSm]}>
            <Skeleton circle width={ImageSize} height={ImageSize}/>
            <View style={[FLEX_STYLE.one]}/>
            <Skeleton style={{
                marginTop: 20,
            }} height={5}/>
        </View>
    )
}


export default function SkeletonCategoryAnimation({navigation, ...props}) {

    return (
        <View style={[styles2.container]}>
            <TextKdr style={[styles2.heading, HEADINGS.H3]}>Our Services</TextKdr>


            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles2.contentContainer}>
                <SkeletonCategoryAnimationComponent/>
                <SkeletonCategoryAnimationComponent/>
                <SkeletonCategoryAnimationComponent/>
                <SkeletonCategoryAnimationComponent/>
                <SkeletonCategoryAnimationComponent/>
            </ScrollView>

        </View>

    )
}

const styles2 = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    }, contentContainer: {
        flexGrow: 1,
    }
});
const styles = StyleSheet.create({
    container: {
        width: 120,
        borderRadius: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginHorizontal: 4,
        paddingBottom: 20,
    },
});


export {
    SkeletonCategoryAnimationComponent
}