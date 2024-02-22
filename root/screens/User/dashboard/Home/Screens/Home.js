import { StyleSheet, View, ScrollView, LogBox, RefreshControl } from "react-native";
import UserHomeTitleBar from "../../../../../components/TitleBar/User/UserHomeTitleBar";
import OurServices from "../Component/OurServices";
import PopularServices from "../Component/PopularServices";
import Offers from "../Component/Offers";
import TopReviewedProduct from "../Component/TopReviewedProduct";
import ContactFooter from "../../../../../components/Footer/ContactFooter";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import Promotions from "../Component/Promotions";
import { FlatList } from "react-native-gesture-handler";
import { dummmyPromoData } from "../../Account/other/DummyData";
import TextKdr from "../../../../../components/Text";
import HEADINGS from "../../../../../Styles/heading";
import HomePromos from "../Component/HomePromos";
import { useFocusEffect } from "@react-navigation/native";
import { checkAppVersion } from "../../../../../other/helperFunctions";

export default function Home({ navigation, ...props }) {
    const [refreshing, setRefreshing] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setRefreshing(false);
        }, 300)
    }, [])


    return (<View style={[styles.container]}>
        <UserHomeTitleBar navigation={navigation} />
        <ScrollView nestedScrollEnabled={true}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => {
                setRefreshing(true);
                setTimeout(() => {
                    setRefreshing(false);
                }, 300)
            }} />}
            showsVerticalScrollIndicator={false}
            style={[styles.mainContainer]} contentContainerStyle={{ paddingBottom: 30 }}>

            <HomePromos refresh={refreshing} />

            <OurServices refresh={refreshing} navigation={navigation} />
            <PopularServices refresh={refreshing} navigation={navigation} />
            <Offers refresh={refreshing} />
            <TopReviewedProduct refresh={refreshing} showTitle={true} navigation={navigation} />
            <ContactFooter navigation={navigation} />
        </ScrollView>

    </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1, flexDirection: 'column',
    }, mainContainer: {
        flex: 1, flexDirection: 'column', backgroundColor: '#F2F2F2', padding: 15, paddingBottom: 70,

    }, Contact: {
        justifyContent: "center", flexDirection: "row"
    }
});