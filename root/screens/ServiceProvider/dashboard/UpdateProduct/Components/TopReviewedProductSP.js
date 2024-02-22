import {FlatList, StyleSheet, View, SafeAreaView} from "react-native";
import TextKdr from "../../../../../components/Text";
import PopularServicesCard from "../../../../../components/ServicesCards/PopularServicesCard";
import HEADINGS from "../../../../../Styles/heading";
import SkeletonServicesAnimationComponent from "../../../../../animation/SkeletonServicesAnimation";
import {useContext, useEffect, useState} from "react";
import SessionContext from "../../../../../context/Session/session";
import getCurrentLocation, {getUrl, JsonToQueryString} from "../../../../../other/raw";
import {fetchServices} from "../../../../../API/USER";

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


export default function TopReviewedProductSP({navigation, showTitle, refresh, ...props}) {
    const [data, setData] = useState([])
    const session = useContext(SessionContext);



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

                <TextKdr style={[styles.heading, HEADINGS.H3]}>Your Top Reviewed Product & Services</TextKdr> : null}
            <SafeAreaView
                style={styles.contentContainer}>
                {
                    props.services?.length > 0 && !props.loading ? props.services?.map((item, index) => {
                        return <PopularServicesCard
                            onPress={() => {
                                navigation.navigate("ServiceDetailScreen", {
                                    service: item
                                })
                            }}
                            serviceID={item?.id}
                            key={index}
                            imageStyle={{height: 170}}
                            isLikedByUser={item?.isServiceLiked}

                            source={getUrl(item?.media[0]?.file)}
                            discount={item?.discount}
                            title={item?.title}
                            price={item?.price}
                            rating={item?.rating}
                            style={styles.content}
                        />
                    }) :  props.services?.length === 0 && !props.loading ?
                        <></>:

                        <AnimationLoader style={styles.content}/>
                }
            </SafeAreaView>
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