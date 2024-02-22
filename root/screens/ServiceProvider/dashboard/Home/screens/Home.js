import {StyleSheet, View, ScrollView} from "react-native";
import TextKdr from "../../../../../components/Text";
import HEADINGS from "../../../../../Styles/heading";
import MARGINS from "../../../../../Styles/MARGIN";
import COLOR from "../../../../../Styles/Color";

import {StatusBar} from "expo-status-bar";
import AddYourFirstProduct from "../../AddProducts/Components/AddYourFirstProduct";
import Trial from "../../AddProducts/Components/Trial";
import TopReviewedProduct from "../../../../User/dashboard/Home/Component/TopReviewedProduct";
import {SafeAreaView} from "react-native-safe-area-context";
import {useContext, useEffect, useRef, useState} from "react";
import SessionContext from "../../../../../context/Session/session";
import Urls from "../../../../../other/Urls";
import TopReviewedProductSP from "../../AddProducts/Components/TopReviewedProductSP";
import {Video,ResizeMode} from "expo-av";
import KDRVideo from "../../AddProducts/Components/KDRVideo";
import RateOurApp from "../../../../Common/RateOurApp";
import HomePromos from "../../../../User/dashboard/Home/Component/HomePromos";


export default function SpHome({navigation, ...props}) {
    const[servicesCount,setServicesCount] = useState(0)
    const[serviceList,setServiceList] = useState([])
    const [refreshing, setRefreshing] = useState(true);

    const session = useContext(SessionContext);
    const [loading, setLoading] = useState(false)
    const [pageData, setPageData] = useState({
        next: null,
        previous: null,
        count: 1,
    })
    const [subscription, setSubscription] = useState({
        count: 1,
    })

    let getCurrentSubscription = () => {

        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Token "+session.session.token

            }
        }
        fetch(Urls.CurrentSubscription, options).then(res => res.json()).then(res => {
            setSubscription(res)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {

        if(pageData?.next){
            topReviewedProduct(pageData.next)
        }
    }, [pageData])
    let topReviewedProduct = (pageQuery) => {
        setLoading(true)
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': "token "+session.session.token
            }
        }
        let query = "?page=1"
        query += "&page_size=4"
        let myservices = Urls.myservices + query
        console.log(myservices);
        if(pageQuery){
            myservices = pageQuery
        }
        else {
            setServiceList([])
            setTimeout(() => {

            }, 500);
        }
        fetch(myservices, options).then(res => res.json()).then(res => {
            setLoading(false)

            if(pageQuery!==null){
                setServiceList([...serviceList, ...res.results])
            }
            else {
                setServiceList(res.results)
            }
            setPageData({
                next: res.next,
                previous: res.previous,
                count: res.count,
            })
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        // Return the function to unsubscribe from the event so it gets removed on unmount

        return navigation.addListener('focus', () => {
            session.loadSession().then(res => {
                topReviewedProduct(null)
                getCurrentSubscription()
            })
        });
    }, [navigation]);
    const [isBuffering, setIsBuffering] = useState(false);

    return (
        <SafeAreaView style={[styles.container]}>
            <RateOurApp/>
            <StatusBar style={"dark"} backgroundColor={COLOR.backgroundColor} />
            <ScrollView showsVerticalScrollIndicator={false}
                        style={[styles.contentContainer]}>
                <TextKdr style={[HEADINGS.H2, MARGINS.v14, {marginBottom: 40}]}>Welcome To K.D.R</TextKdr>


            <HomePromos refresh={refreshing}  />


                {pageData.count === 0 ? <AddYourFirstProduct session={session} navigation={navigation}/> : null}
                {
                    subscription.count === 0 ? <Trial session={session} navigation={navigation}/> : null
                }
                <KDRVideo/>
                <TopReviewedProductSP showTitle={true} loading={loading} navigation={navigation} services={serviceList}/>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.backgroundColor,

    },
    contentContainer: {
        padding: 20,
        paddingBottom: 30,

    },

});