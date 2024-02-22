import {StyleSheet, View, ScrollView, Image, Dimensions, Linking} from "react-native";
import CategoryTitleBar from "../../../../../components/TitleBar/User/CategoryTitleBar";
import {StatusBar} from "expo-status-bar";
import {useState} from "react";
import TextKdr from "../../../../../components/Text";
import HEADINGS from "../../../../../Styles/heading";
import FLEX_STYLE from "../../../../../Styles/FLEXSTYLE";
import {Entypo, FontAwesome, Ionicons} from "@expo/vector-icons";
import BORDER_STYLE from "../../../../../Styles/Border";
import RoundButtonKdr from "../../../../../components/Button/roundButton";
import ButtonKdr from "../../../../../components/Button/Buttonkdr";
import ContactFooter from "../../../../../components/Footer/ContactFooter";

import COLOR from "../../../../../Styles/Color";
import {getUrl} from "../../../../../other/raw";
import RelatedServices from "../../../../User/dashboard/Home/Component/RelatedServices";
import TitleBar from "../../../../../components/TitleBar/TitleBar";
import {CURRENCY} from "../../../../../settings/settings";


function Points({description, style}) {

    return (
        <View style={[FLEX_STYLE.rowCenter, {marginTop: 10}, style]}>
            <FontAwesome name="check-circle" size={18} color="#00A66C"/>
            <View style={{flex: 1}}>
                <TextKdr style={[HEADINGS.p, {marginStart: 5, fontSize: 16, color: "#333333"}]}>{description}</TextKdr>
                <View style={{borderWidth: 0.2, borderColor: "#CCCCCC", marginTop: 2}}/>
            </View>
        </View>
    )
}


function ProfileLinks({facebook, twitter, instagram,tiktok, pinterest, style}) {
    const SIZE = 20;
    const styles = {
        backgroundColor: "#DDDDDD",
        borderWidth: 0,
        marginStart: 20,
        width: 50,
        height: 50,
        borderRadius: 100,
        justifyContent: "space-between",
    }
    return (
        <View style={[FLEX_STYLE.column, {marginTop: 20}]}>
            <TextKdr style={[HEADINGS.H3, {color: "#333333"}]}>Social media profiles</TextKdr>
            <View style={[FLEX_STYLE.rowCenter, {marginTop: 10}, style]}>
                {facebook && facebook.length > 0 ? <RoundButtonKdr
                    onPress={() => {

                        Linking.openURL(facebook)
                    }}

                    style={[styles, {marginStart: 0}]}>
                    <Image source={require("../../../../../../assets/img/facebook.png")}
                           style={{width: SIZE, height: SIZE}}/>
                </RoundButtonKdr> : null}
                {twitter && twitter.length > 0 ? <RoundButtonKdr
                    onPress={() => {

                        Linking.openURL(twitter)
                    }}
                    style={styles}>
                    <Image source={require("../../../../../../assets/img/twitter.png")}
                           style={{width: SIZE, height: SIZE}}/>
                </RoundButtonKdr> : null}
                {instagram && instagram?.length > 0 ? <RoundButtonKdr
                    onPress={() => {

                        Linking.openURL(instagram)
                    }}
                    style={styles}>
                    <Image source={require("../../../../../../assets/img/insta.png")}
                           style={{width: SIZE, height: SIZE}}/>
                </RoundButtonKdr> : null}
                {pinterest && pinterest.length > 0 ? <RoundButtonKdr
                    onPress={() => {
                        Linking.openURL(pinterest)
                    }}
                    style={styles}>
                    <Image source={require("../../../../../../assets/img/pentrest.png")}
                           style={{width: SIZE, height: SIZE}}/>
                </RoundButtonKdr> : null}
                {tiktok && tiktok.length > 0 ? <RoundButtonKdr
                    onPress={() => {
                        Linking.openURL(tiktok)
                    }}
                    style={styles}>
                    <Image source={require("../../../../../../assets/img/tiktok.png")}
                           style={{width: SIZE, height: SIZE}}/>
                </RoundButtonKdr> : null}
            </View>
        </View>
    )
}


function addressObjectToString(address) {
    return `${address?.streetAddress}, ${address?.city}, ${address?.state}, ${address?.country}`
}

function getImagesArray(images) {
    return images?.map((image, index) => {
        return {
            id: index,
            image: getUrl(image?.file)
        }
    })
}


export default function ServiceDetailScreenSP({navigation, ...props}) {
    const {service} = props.route.params;
    console.log(getImagesArray(service?.media));
    const [data, setData] = useState({
        name: service?.sub_category?.title,
        title: service?.title,
        description: service?.details,
        location: addressObjectToString(service?.service_address),
        price: service?.price,
        rating: service?.rating,
        reviews: service?.reviewCount,
        portfolioImages: getImagesArray(service?.media),
        points: service?.points,
        socialMediaLinks: service?.social_media_accounts,
        phoneNumber: service?.phone,

    })


    return (<View style={[styles.container, {marginBottom: 20}]}>
        <TitleBar title={"Service Details"} navigation={navigation}/>
        <ScrollView showsVerticalScrollIndicator={false} style={[styles.mainContainer]}>
            <View style={[styles.contentContainer]}>
                <TextKdr style={[HEADINGS.H3]}>{data.title}</TextKdr>
                <View style={[FLEX_STYLE.rowCenter, {marginTop: 4,}]}>
                    <Entypo name="location-pin" size={16} color="#777777"/>
                    <TextKdr style={[HEADINGS.p]}> {data.location}</TextKdr>
                </View>
                <View style={[FLEX_STYLE.rowCenter, {marginTop: 4,}]}>
                    <Entypo name="star" size={16} color="#FFB217"/>
                    <TextKdr style={[HEADINGS.p]}> ({data.rating}) </TextKdr>
                    <TextKdr style={[HEADINGS.p, {
                        textDecorationLine: "underline",
                        fontWeight: "600"
                    }]}>{data.reviews} reviews</TextKdr>
                </View>
                <TextKdr style={[HEADINGS.p, {marginTop: 10}]}>
                    {data.description}
                </TextKdr>
                <View style={[FLEX_STYLE.row, FLEX_STYLE.rap, FLEX_STYLE.spaceBetween, {marginTop: 10}]}>
                    {data.portfolioImages.map((item, index) => {
                            return (
                                <Image key={index} source={item.image}
                                       style={[BORDER_STYLE.bdRsm, {
                                           marginTop: 10,
                                           width: "49%",
                                           height: Dimensions.get('window').width / 3
                                       }]}/>
                            )
                        }
                    )}
                </View>
                <View style={{marginTop: 20}}>
                    {
                        data.points.map((item, index) => {
                            return (
                                <Points key={index} description={item}/>
                            )
                        })
                    }
                </View>
                <ProfileLinks {...data?.socialMediaLinks}/>
                <View>
                <TextKdr style={[HEADINGS.H1, {marginTop: 30}]}>{CURRENCY}{data.price}</TextKdr>
                <TextKdr style={[HEADINGS.p, {color: "#777777"}]}>(inclusive of all vat and tax)</TextKdr>
                </View>
                {/*<ButtonKdr style={{marginTop: 30, height: 60}} text={'Edit Service'}*/}
                {/*           onPress={() => alert("No Screen")}/>*/}


            </View>


        </ScrollView>

    </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    }, mainContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F2F2F2',
        padding: 8,

    }, Contact: {
        justifyContent: "center",
        flexDirection: "row"
    }, content: {
        width: "auto",
        flex: 1,
        marginTop: 10,
    },
    contentContainer: {
        padding: 10,
    }

});