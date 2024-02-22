import {Dimensions, Image, ScrollView, StyleSheet, View} from "react-native";
import TitleBar from "../../../../../components/TitleBar/TitleBar";
import FLEX_STYLE from "../../../../../Styles/FLEXSTYLE";
import PADDINGS from "../../../../../Styles/PADDINGS";
import COLOR from "../../../../../Styles/Color";
import Items from "../../../../User/dashboard/Home/other/itemsData";
import PopularServicesCard from "../../../../../components/ServicesCards/PopularServicesCard";
import {Entypo, FontAwesome} from "@expo/vector-icons";
import TextKdr from "../../../../../components/Text";
import HEADINGS from "../../../../../Styles/heading";
import RoundButtonKdr from "../../../../../components/Button/roundButton";
import {useState} from "react";
import {StatusBar} from "expo-status-bar";
import BORDER_STYLE from "../../../../../Styles/Border";
import ButtonKdr from "../../../../../components/Button/Buttonkdr";
import ContactFooter from "../../../../../components/Footer/ContactFooter";


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


function ProfileLinks({facebook, twitter, instagram, pinterest, style}) {
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
                <RoundButtonKdr style={[styles, {marginStart: 0}]}>
                    <Image source={require("../../../../../../assets/img/facebook.png")}
                           style={{width: SIZE, height: SIZE}}/>
                </RoundButtonKdr>
                <RoundButtonKdr style={styles}>
                    <Image source={require("../../../../../../assets/img/twitter.png")}
                           style={{width: SIZE, height: SIZE}}/>
                </RoundButtonKdr>
                <RoundButtonKdr style={styles}>
                    <Image source={require("../../../../../../assets/img/insta.png")}
                           style={{width: SIZE, height: SIZE}}/>
                </RoundButtonKdr>
                <RoundButtonKdr style={styles}>
                    <Image source={require("../../../../../../assets/img/pentrest.png")}
                           style={{width: SIZE, height: SIZE}}/>
                </RoundButtonKdr>
            </View>
        </View>
    )
}

export default function SpProductDetailScreen({navigation, ...props}) {
    const [data, setData] = useState({
        name: "Service name",
        title: "Service Title Goes Here",
        description: "Nisl erat laoreet consectetur diam molestie curabitur mi posuere. Cum imperdiet dignissim aliquet nullam commodo pellentesque et tempus faucibus. Senectus dictum proin vulputate tincidunt. Eu ut sit tempor aliquet quis dolor. Mi lectus amet elementum malesuada bibendum viverra. ",
        location: "Service location",
        price: 10,
        rating: 4.5,
        reviews: 10,
        portfolioImages: [
            {
                id: 1,
                image: {uri: "https://images.unsplash.com/photo-1605497787865-e6d4762b386f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGJhcmJlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"}
            },
            {
                id: 2,
                image: {uri: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YmFyYmVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"}
            },
            {
                id: 3,
                image: {uri: "https://images.unsplash.com/photo-1635273051839-003bf06a8751?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGJhcmJlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"}
            },
            {id: 4, image: require("../../../../../../assets/img/barber.png")},
        ],
        points: [
            {id: 1, point: "Nisl erat laoreet consectetur"},
            {id: 2, point: "Nisl erat laoreet consectetur"},
            {id: 3, point: "Nisl erat laoreet consectetur"},
            {id: 4, point: "Nisl erat laoreet consectetur"},
        ],
        socialMediaLinks: {
            facebook: "https://www.facebook.com/",
            instagram: "https://www.instagram.com/",
            twitter: "https://www.twitter.com/",
            pinterest: "https://www.pinterest.com/",
        },
        phoneNumbers: "+1 123 456 7890",

    })


    return (<View style={[styles.container, {marginBottom: 20}]}>
        <StatusBar translucent backgroundColor='transparent' style={"light"}/>
        <TitleBar title={"Service details"} isBack={true} navigation={navigation}/>
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
                                <Points key={index} description={item.point}/>
                            )
                        })
                    }
                </View>
                <ProfileLinks/>
                <TextKdr style={[HEADINGS.H1, {marginTop: 30}]}>${data.price}</TextKdr>
                <TextKdr style={[HEADINGS.p, {color: "#777777"}]}>(inclusive of all vat and tax)</TextKdr>
                <ButtonKdr style={{marginTop: 30, height: 55}} text={'Edit Service'}
                           onPress={() => navigation.goBack()}/>


                <ContactFooter/>


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
