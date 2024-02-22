import {FlatList, StyleSheet, View} from "react-native";
import TitleBar from "../../../../../components/TitleBar/TitleBar";
import FLEX_STYLE from "../../../../../Styles/FLEXSTYLE";
import PADDINGS from "../../../../../Styles/PADDINGS";
import COLOR from "../../../../../Styles/Color";
import PopularServicesCard from "../../../../../components/ServicesCards/PopularServicesCard";
import {useContext, useEffect, useState} from "react";
import SessionContext from "../../../../../context/Session/session";
import Urls from "../../../../../other/Urls";
import SkeletonServicesAnimationComponent, {
    EmptyListAnimation
} from "../../../../../animation/SkeletonServicesAnimation";
import {StatusBar} from "expo-status-bar";
import {getUrl} from "../../../../../other/raw";
import axios from 'axios';
import ImageViewerModal from "../../../../../components/ImageViewerModal";


function AnimationLoader({style}) {


    return <>
        <EmptyListAnimation style={style}/>

    </>
}

export default function SpProducts({navigation, ...props}) {
    const [serviceList, setServiceList] = useState([])
    const [loading, setLoading] = useState(false)
    const [pageData, setPageData] = useState({
        next: null,
        previous: null,
        count: 0,
    })
    const session = useContext(SessionContext)
    const [showModal, setShowModal] = useState(false)
    const [cardImage, setCardImage] = useState(null)


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
                'X-Authorization': "Token "+session.session.token
            }
        }
        let query = "?page=1"
        query += "&page_size=4"
        let myservices = Urls.myservices + query
        if(pageQuery){
            myservices = pageQuery
        }
        else {
            setServiceList([])
            setTimeout(() => {

            }, 1000);
        }
        console.log(myservices);
        fetch(myservices, options).then(res => res.json()).then(res => {
            setLoading(false)
            if(pageQuery)
            setServiceList([...serviceList,...res.results])
        else
        setServiceList([...res.results])
            
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
            topReviewedProduct(null)
        });
    }, [navigation]);

    const handleDelete=(id)=>{
        setLoading(true)
     
        let myservices = Urls.myservices + `/${id}/`
        axios.defaults.headers.common['Authorization'] ="Token "+session.session.token
    console.log("delete");
    console.log(myservices);
    console.log(session.session.token);
    // return
        axios.delete(myservices).then(res => {
            console.log("deleted",res);
            setLoading(false)
            topReviewedProduct(pageData.next)
         
        }).catch(err => {
            console.log(err)
        })
    }
    const handleEdit=(item)=>{
        navigation.navigate("UpdateProductsEntry",{
            screen:"UpdateProduct1",
            params: item
        })
    }
    return (
        <View style={[styles.container]}>
            <StatusBar style={"dark"} backgroundColor={COLOR.backgroundColor} />
            <TitleBar title={"Products"} navigation={navigation}/>
            <View style={[FLEX_STYLE.row, PADDINGS.p10]}>
                <FlatList
                    data={serviceList}

                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: 100}}
                    renderItem={({item}) => {
                        return <PopularServicesCard
                            onPress={() => {
                                navigation.navigate("ServiceDetailScreen2", {
                                    service: item
                                })
                            }}
                            onPressImage={() => {
                                setShowModal(true);
                            }
                            }
                            onDelete={()=>handleDelete(item.id)}
                            onEdit={()=>handleEdit(item)}
                            style={styles.content}
                            serviceID={item.id}
                            isLikedByUser={item?.isServiceLiked}
                            source={getUrl(item?.media[0]?.file)}
                            discount={item.discount}
                            title={item.title} price={item.price} rating={item.rating}
                            setCardImage={setCardImage}
                            />
                    }}
                    keyExtractor={item => item.id}
                    ListEmptyComponent={
                        loading ? <AnimationLoader style={{marginTop: 10}}/> : <></>
                    }
                    numColumns={2}

                    />


            </View>

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
        flex: 1,
        backgroundColor: COLOR.backgroundColor,
    },
    content: {
        flex: 1,
        marginTop: 10,
    },
    rowContent: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
    }
});