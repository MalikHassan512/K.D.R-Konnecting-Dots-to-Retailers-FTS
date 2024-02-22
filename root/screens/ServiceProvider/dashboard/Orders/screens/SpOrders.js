import {FlatList, StyleSheet, View, Animated, ActivityIndicator} from "react-native";
import TitleBar from "../../../../../components/TitleBar/TitleBar";
import FLEX_STYLE from "../../../../../Styles/FLEXSTYLE";
import PADDINGS from "../../../../../Styles/PADDINGS";
import Items from "../../../../User/dashboard/Home/other/itemsData";
import COLOR from "../../../../../Styles/Color";
import OrderCard from "../Component/OrderCard";
import {useContext, useEffect, useState} from "react";
import SessionContext from "../../../../../context/Session/session";
import Urls from "../../../../../other/Urls";
import SkeletonServicesAnimationComponent, {
    EmptyListAnimation, FullEmptyListAnimation
} from "../../../../../animation/SkeletonServicesAnimation";
import OrderCardSP from "../Component/OrderCardSP";


function AnimationLoader() {


    return <>
        <FullEmptyListAnimation />

    </>
}

export default function SpOrders({navigation, ...props}) {
    const session = useContext(SessionContext)
    let defaultPageData = {
        next:null,
        previous:null,
        count:0,
    }

    const [pageData,setPageData] = useState(defaultPageData)
    const [fetching,setFetching] = useState(false)
    const [orderData,setOrderData] = useState([])
    let getOrders = (pageQuery) => {
        setFetching(true)
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Token "+session.session.token
            }
        }
        let query = "?page=1"
        query += "&page_size=5"
        let getOrders = Urls.getOrders + query
        if(pageQuery!==null){
            getOrders = pageQuery
        }
        else {
            setOrderData([])
        }
        setTimeout(() => {
            fetch(getOrders, options).then(res => res.json()).then(res => {
                setFetching(false)

                let tempData = [...orderData,...res.results]
                let filteredArray = tempData.filter(({ id }, i , _arr) => _arr.findIndex((elem) => elem.id === id ) === i);
                setOrderData(filteredArray)
                setPageData({
                    next: res.next,
                    previous: res.previous,
                    count: res.count,
                })
            }).catch(err => {
                setFetching(false)
                console.log(err)
            })
        }, 300);


    }
    // useEffect(() => {
    //
    //
    // }, [pageData])
    useEffect(() => {
        session.loadSession().then(res => {
            getOrders(null)
        })
    }, []);
    return (
        <View style={[styles.container]}>
            <TitleBar title={"Orders"} navigation={navigation}/>
            <View style={[FLEX_STYLE.row, PADDINGS.p10]}>
                <FlatList
                    data={orderData}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        if(pageData.next!==null){
                            getOrders(pageData.next)
                        }
                    }}
                    ListFooterComponent={() => {
                        if (fetching) {
                            return <ActivityIndicator size={"small"} color={"black"}/>
                        }
                    }}
                    contentContainerStyle={{paddingBottom: 100}}

                    renderItem={({item}) => {
                        return <OrderCardSP
                            style={styles.content}
                            source={item?.serviceData?.media}
                            item={item}
                            id={item?.id}
                            onInfoPress={() => {
                                navigation.navigate("SpOrderDetail",{orderData:item})
                            }}
                            onPress={() => {
                                navigation.navigate("SpOrderDetail",{orderData:item})
                            }}
                            discount={item?.serviceData?.discount}
                            title={item?.serviceData?.title} price={item?.serviceData?.price} rating={item?.serviceData?.rating}/>
                    }}
                    keyExtractor={item => item.id}

                />

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.backgroundColor,
    },
    content: {
        flex: 1,
        marginTop: 10,
    }
});