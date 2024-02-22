import {StyleSheet, View, ScrollView, FlatList} from "react-native";
import TextKdr from "../../../../../components/Text";
import PopularServicesCard from "../../../../../components/ServicesCards/PopularServicesCard";
import HEADINGS from "../../../../../Styles/heading";
import React, {useContext, useEffect, useState} from "react";
import SessionContext from "../../../../../context/Session/session";
import {fetchServices} from "../../../../../API/USER";
import {getUrl, JsonToQueryString} from "../../../../../other/raw";
import SkeletonServicesAnimationComponent from "../../../../../animation/SkeletonServicesAnimation";

// <PopularServicesCard imageStyle={{height:130}} style={{marginHorizontal: 5}}
//                      source={{uri: "https://nextdaycleaning.com/wp-content/uploads/2019/10/carpet-cleaning-hero-imageres2.jpg"}}
//                      discount={"20%"}
//                      title={"House cleaning"} price={"15"} rating={4.2}/>
export default function RelatedServices({navigation, style, category, subCategory, ...props}) {
    const [data, setData] = useState([])
    const session = useContext(SessionContext);

    function fetchData() {
        let query = {
            rating: true,
            sub_category: subCategory,
            category: category

        }
        fetchServices(session.session.token, JsonToQueryString(query)).then((res) => {
            console.log(res)
            setData(res)
        }).catch((e) => {
        })
    }

    useEffect(()=>{
        fetchData();
    },[])

    return (
        <View style={[styles.container, style]} {...props}>
            <TextKdr style={[styles.heading, HEADINGS.H3]}>Customers also ordered -</TextKdr>
            <FlatList data={data?.results}
                      ListEmptyComponent={() => {
                          return <>
                              <SkeletonServicesAnimationComponent/>
                              <SkeletonServicesAnimationComponent/>
                              <SkeletonServicesAnimationComponent/>
                              <SkeletonServicesAnimationComponent/>
                              <SkeletonServicesAnimationComponent/>
                          </>
                      }}

                      contentContainerStyle={styles.contentContainer}
                      renderItem={({item, index}) => {
                          return (
                              <PopularServicesCard
                                  onPress={() => {
                                      navigation.navigate("ServiceDetailScreen",{
                                          service:item
                                      })
                                  }}
                                  serviceID={item?.id}
                                  isLikedByUser={item?.isServiceLiked}
                                  key={index}
                                  imageStyle={{height: 140}}
                                  style={{marginHorizontal: 5,width: 170,}}
                                  source={getUrl(item?.media[0]?.file)}
                                  discount={item?.discount}
                                  title={item?.title}
                                  price={item?.price}
                                  rating={item?.rating}
                              />
                          )
                      }}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
            />

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