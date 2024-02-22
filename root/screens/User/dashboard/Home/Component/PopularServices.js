import { StyleSheet, View, ScrollView, FlatList, Pressable } from "react-native";
import TextKdr from "../../../../../components/Text";
import PopularServicesCard from "../../../../../components/ServicesCards/PopularServicesCard";
import HEADINGS from "../../../../../Styles/heading";
import React, { useContext, useEffect, useState } from "react";
import SkeletonServicesAnimationComponent from "../../../../../animation/SkeletonServicesAnimation";
import FLEX_STYLE from "../../../../../Styles/FLEXSTYLE";
import COLOR from "../../../../../Styles/Color";
import getCurrentLocation, { getUrl, JsonToQueryString } from "../../../../../other/raw";
import { fetchServices } from "../../../../../API/USER";
import SessionContext from "../../../../../context/Session/session";
import API_URLS from "../../../../../API/USER/URLS";
import NoData from "../../../../../components/other/NoData";
import ImageViewerModal from "../../../../../components/ImageViewerModal";
import { dummyData } from "../../../../../other/dummyData";

export default function PopularServices({ navigation, refresh, ...props }) {
    const [Location, setLocation] = useState(null)
    const [data, setData] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [cardImage, setCardImage] = useState(null)
    const session = useContext(SessionContext);



    function getLocation() {
        getCurrentLocation().then((res) => {
            setLocation(res)
        }).catch((e) => {
            setLocation(null)
        })
    }

    function FetchNearbyServices() {
        let query = {
            lat: Location?.coords.latitude,
            lng: Location?.coords.longitude,
            rating: true,
        }
        if (Location === null)
            query = {};
        fetchServices(session.session.token, JsonToQueryString(query)).then((res) => {
            setData(res)
        }).catch((e) => {
        })
    }

    useEffect(() => {
        getLocation()
    }, [])
    useEffect(() => {
        if (refresh === true) {
            setData([])
            FetchNearbyServices()
        }
    }, [Location, refresh])

    return (
        <View style={[styles.container]}>
            <View style={[FLEX_STYLE.row]}>
                <TextKdr style={[styles.heading, HEADINGS.H3, FLEX_STYLE.one]}>Popular Services Nearby</TextKdr>
                <Pressable>
                    <TextKdr style={[styles.heading, HEADINGS.H4, {
                        color: COLOR.primary,
                    }]}>View more</TextKdr>
                </Pressable>
            </View>

            <FlatList
                data={data?.results}
                // data={dummyData}
                ListEmptyComponent={() => {
                    if (refresh === true)
                        return <>
                            <SkeletonServicesAnimationComponent />
                            <SkeletonServicesAnimationComponent />
                            <SkeletonServicesAnimationComponent />
                            <SkeletonServicesAnimationComponent />
                            <SkeletonServicesAnimationComponent />
                        </>
                    else
                        return <NoData />

                }}

                contentContainerStyle={styles.contentContainer}
                renderItem={({ item, index }) => {
                    return (
                        <PopularServicesCard
                            onPress={() => {
                                navigation.navigate("ServiceDetailScreen", {
                                    service: item
                                })
                            }}
                            onPressImage={() => {
                                setShowModal(true);
                            }
                            }
                            userName={item?.user_data?.Name}
                            userProfile={getUrl(item?.user_data?.DP?.file)}
                            serviceID={item?.id}
                            isLikedByUser={item?.isServiceLiked}
                            key={index}
                            imageStyle={{ height: 130 }}
                            source={getUrl(item?.media[0]?.file)}
                            discount={item?.discount}
                            title={item?.title}
                            price={item?.price}
                            rating={item?.rating}
                            setCardImage={setCardImage}
                        />
                    )
                }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />

            {
                showModal && <ImageViewerModal
                    visible={showModal}
                    onRequestClose={() => setShowModal(false)}
                    images={cardImage}
                />
            }

        </View>

    )
}

const styles = StyleSheet.create({
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