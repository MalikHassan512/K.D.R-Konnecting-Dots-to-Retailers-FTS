import {FlatList, StyleSheet, View, SafeAreaView} from "react-native";
import TextKdr from "../../../../../components/Text";
import PopularServicesCard from "../../../../../components/ServicesCards/PopularServicesCard";
import Items from "../other/itemsData";
import HEADINGS from "../../../../../Styles/heading";
import SkeletonServicesAnimationComponent from "../../../../../animation/SkeletonServicesAnimation";
import {useContext, useEffect, useState} from "react";
import SessionContext from "../../../../../context/Session/session";
import getCurrentLocation, {getUrl, JsonToQueryString} from "../../../../../other/raw";
import {fetchServices} from "../../../../../API/USER";
import NoData from "../../../../../components/other/NoData";
import {dummyData} from "../../../../../other/dummyData";
import ImageViewerModal from "../../../../../components/ImageViewerModal";

function AnimationLoader({style}) {



    return <>
        <SkeletonServicesAnimationComponent ContainerStyles={style}/>
        <SkeletonServicesAnimationComponent ContainerStyles={style}/>
        <SkeletonServicesAnimationComponent ContainerStyles={style}/>
        <SkeletonServicesAnimationComponent ContainerStyles={style}/>
        <SkeletonServicesAnimationComponent ContainerStyles={style}/>
        <SkeletonServicesAnimationComponent ContainerStyles={style}/>

    </>
}


export default function TopReviewedProduct({navigation, showTitle, refresh, ...props}) {
    const [data, setData] = useState([])
    const session = useContext(SessionContext);
    const [cardImage, setCardImage] = useState(null)

    const [showModal, setShowModal] = useState(false)


    function FetchNearbyServices() {
        console.log("refreshing")
        let query = {
            rating: true
        }

        fetchServices(session.session.token, JsonToQueryString(query)).then((res) => {
            setData(res)
        }).catch((e) => {
        })
    }

    useEffect(() => {
    }, [])
    useEffect(() => {
        if (refresh === true) {
            setData([])
            FetchNearbyServices()
        }
    }, [refresh])


    return (
        <View style={[styles.container]}>


            {showTitle === true ?

                <TextKdr style={[styles.heading, HEADINGS.H3]}>Top Reviewed Product & Services</TextKdr> : null}
            <SafeAreaView
                style={styles.contentContainer}>
                {
                    data.length > 0 ? data.map((item, index) => {
                        return <PopularServicesCard
                            onPress={() => {
                                navigation.navigate("ServiceDetailScreen", {
                                    service: item
                                })
                            }}
                            onPressImage={() => {
                                setShowModal(true);
                            }}
                            serviceID={item?.id}
                            key={index}
                            imageStyle={{height: 170}}
                            isLikedByUser={item?.isServiceLiked}
                            userName={item?.user_data?.Name}
                            userProfile={getUrl(item?.user_data?.DP?.file)}
                            source={getUrl(item?.media[0]?.file)}
                            discount={item?.discount}
                            title={item?.title}
                            price={item?.price}
                            rating={item?.rating}
                            style={styles.content}
                            setCardImage={setCardImage}
                        />
                    }) : refresh === true ? <AnimationLoader style={styles.content}/> : <NoData/>
                }
            </SafeAreaView>

            {cardImage && <ImageViewerModal
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
                images={cardImage}
                
            />}

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
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',

    },
    content: {
        width: "48%",
        marginTop: 10,
    }
});