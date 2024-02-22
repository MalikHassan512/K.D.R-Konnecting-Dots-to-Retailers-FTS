import {FlatList, StyleSheet, View, Animated, RefreshControl, ActivityIndicator} from "react-native";
import TitleBar from "../../../../../components/TitleBar/TitleBar";
import FLEX_STYLE from "../../../../../Styles/FLEXSTYLE";
import PADDINGS from "../../../../../Styles/PADDINGS";
import Items from "../../../../User/dashboard/Home/other/itemsData";
import COLOR from "../../../../../Styles/Color";
import OrderCard from "../../../../ServiceProvider/dashboard/Orders/Component/OrderCard";
import OrdersAnimations, {OrdersAnimationsList} from "../../../../../animation/OrdersAnimations";
import {useContext, useEffect, useState} from "react";
import NoData from "../../../../../components/other/NoData";
import SessionContext from "../../../../../context/Session/session";
import {CancelOrder, GetOrders} from "../../../../../API/USER/Orders";
import {getUrl} from "../../../../../other/raw";
import Toast from "react-native-toast-message";
//
//
export default function Orders({navigation, ...props}) {
    const [data, setData] = useState(null);
    const [page, setPage] = useState(1);
    const [refreshing, setRefreshing] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const session = useContext(SessionContext);

    function FetchData(appendData = false) {
        console.log("Fetching Data", page);
        if (refreshing) return;
        if (data?.next === null && appendData) return;
        if (appendData) setLoadingMore(true);
        console.log(page, data?.next === null && appendData === true);
        GetOrders(session.session.token, {
            page: appendData ? page + 1 : 1,
            page_size: 10,
        }).then(res => {
            if (appendData) {
                res.results = [...data.results, ...res.results];
                setPage(page + 1);
            }
            setData(res);
            setRefreshing(false);
            setLoadingMore(false);
        }).catch(err => {

        })
    }

    useEffect(() => {
        FetchData();
    }, [])

    const CancelUserOrder = (id) => {
        console.log("Cancel Order", id);
        const order = data.results.find(item => item.id === id);
        if (order === undefined) return;
        CancelOrder(session.session.token, id,order?.serviceData?.id).then(res => {
            FetchData();
            Toast.show({
                type: "success",
                text1: "Order Cancelled",
                text2: "Order has been cancelled successfully",
            });
        }).catch(err => {
            console.log(err);
        })
    }
    return (
        <View style={[styles.container]}>
            <TitleBar title={"Orders"} navigation={navigation}/>
            <View style={[FLEX_STYLE.row, PADDINGS.p10]}>
                <FlatList
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={() => {
                            setRefreshing(true);
                            FetchData();
                        }}/>
                    }
                    data={data?.results}
                    ListEmptyComponent={() => {
                        if (data !== null) return <NoData text={"No Orders Found"}/>
                        else return <OrdersAnimationsList/>
                    }}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        if (data?.next !== null) FetchData(true);
                    }}
                    contentContainerStyle={{paddingBottom: 100}}
                    renderItem={({item}) => {
                        return <OrderCard
                            style={styles.content}
                            onPressDelete={CancelUserOrder}
                            id={item.id}
                            source={getUrl(item?.serviceData.media[0]?.file)}
                            discount={item.discount}
                            onPress={() => navigation.navigate("OrderDetail",{
                                orderData:item
                            })}
                            title={item?.serviceData?.title} price={item?.serviceData?.price}
                            rating={item?.serviceData?.rating}/>

                    }}
                    keyExtractor={(item, index) => index.toString()}
                    ListFooterComponent={loadingMore ? <ActivityIndicator/> : null}
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