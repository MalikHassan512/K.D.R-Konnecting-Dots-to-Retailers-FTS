import {FlatList, StyleSheet, View, SafeAreaView, RefreshControl} from "react-native";
import {useContext, useEffect, useState} from "react";
import SkeletonServicesAnimationComponent, {
    EmptyListAnimation
} from "../../../../../../animation/SkeletonServicesAnimation";
import SessionContext from "../../../../../../context/Session/session";
import getCurrentLocation, {getUrl, JsonToQueryString} from "../../../../../../other/raw";
import {fetchServices} from "../../../../../../API/USER";
import TextKdr from "../../../../../../components/Text";
import HEADINGS from "../../../../../../Styles/heading";
import PopularServicesCard from "../../../../../../components/ServicesCards/PopularServicesCard";
import NoData from "../../../../../../components/other/NoData";
import ContactFooter from "../../../../../../components/Footer/ContactFooter";
import {getFavServices} from "../../../../../../API/USER/FavortieApi";


export default function FavoriteMain({navigation, showTitle, style, contentContainerStyle, ...props}) {
    const [data, setData] = useState(null)
    const session = useContext(SessionContext);
    const [refreshing, setRefreshing] = useState(false);
    const [page, setPage] = useState(1);

    function FetchData() {
        getFavServices(session.session.token, {
            page: 1,
            page_size: 12
        }).then((res) => {
            setData(res)
        }).catch((e) => {
        });
    }


    function NextPage() {
        if (data?.next === null) return;
        setPage(page + 1)
        getFavServices(session.session.token, {
            page: page + 1,
            page_size: 12
        }).then((res) => {
            setData(res)
        }).catch((e) => {

        });
    }


    useEffect(() => {
        FetchData()
    }, [])


    return (
        <View style={[styles.container]}>
            <FlatList
                data={data?.results}
                style={{flex: 1, backgroundColor: '#f5f4f4'}}
                refreshControl={<RefreshControl refreshing={refreshing}
                                                onRefresh={() => {
                                                    setData(null);
                                                    FetchData()

                                                }}

                />}
                ListEmptyComponent={data?.results.length === 0 ? <NoData/> : <EmptyListAnimation/>}
                contentContainerStyle={[{
                    padding: 10,

                }]}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => {
                    return <PopularServicesCard
                        serviceID={item?.id}
                        style={styles.content}
                        onPress={() => {
                            // navigation.navigate("ServiceDetail", {id: item.id})
                        }}
                        isLikedByUser={item?.isServiceLiked}
                        source={getUrl(item?.media[0]?.file)}
                        discount={item?.discount}
                        title={item?.title}
                        price={item?.price}
                        rating={item?.rating}

                    />
                }}
                keyExtractor={item => item.id}
                numColumns={2}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                    NextPage();
                }}
                key={item => item.id}
                ListFooterComponent={<ContactFooter/>}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,

        flex: 1,
        backgroundColor: '#ffffff',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    }, contentContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',

    },
    content: {
        width: "48%",
        marginTop: 10,
    }
});