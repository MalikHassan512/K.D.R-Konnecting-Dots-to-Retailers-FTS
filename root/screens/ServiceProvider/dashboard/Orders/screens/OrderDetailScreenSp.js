import {StyleSheet, View, ScrollView, Image, Dimensions, Linking} from "react-native";
import CategoryTitleBar from "../../../../../components/TitleBar/User/CategoryTitleBar";
import {StatusBar} from "expo-status-bar";
import {useContext, useRef, useState} from "react";
import TextKdr from "../../../../../components/Text";
import HEADINGS from "../../../../../Styles/heading";
import FLEX_STYLE from "../../../../../Styles/FLEXSTYLE";
import {Entypo, FontAwesome, Ionicons} from "@expo/vector-icons";
import BORDER_STYLE from "../../../../../Styles/Border";
import RoundButtonKdr from "../../../../../components/Button/roundButton";
import ButtonKdr from "../../../../../components/Button/Buttonkdr";
import ContactFooter from "../../../../../components/Footer/ContactFooter";
import COLOR from "../../../../../Styles/Color";
import TitleBar from "../../../../../components/TitleBar/TitleBar";
import {getUrl} from "../../../../../other/raw";
import ConformationModel from "../../../../../modal/ConformationModel";
import {LoadingContext} from "../../../../../context/modal/LoadingContext";
import {markOrderAsComplete} from "../../../../../API/USER/Orders";
import SessionContext from "../../../../../context/Session/session";
import Toast from "react-native-toast-message";
import {Points, ProfileLinks} from "../../../../User/dashboard/Home/Screens/ServiceDetail";
import {CURRENCY} from "../../../../../settings/settings";

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


export default function OrderDetailScreenSp({navigation, ...props}) {
    const {orderData} = props.route.params;
    console.log(orderData)
    const service = orderData?.serviceData;
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
    const conformationModel = useRef(null);
    const loading = useContext(LoadingContext);
    const session = useContext(SessionContext);


    let markComplete = () => {
        loading.show();
        markOrderAsComplete(session.session.token, orderData.id, service.id).then((res) => {
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Order marked as complete',
            });
            loading.close();
            navigation.goBack();
        }).catch((e) => {
            loading.close();
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Something went wrong',
            });
        });
    };
    return (<View style={[styles.container, {marginBottom: 20}]}>
        <ConformationModel title={"Order Completed"} message={"Are you sure you want to mark this order as Completed ?"}
                           onPressYes={markComplete} ref={conformationModel}/>

        <StatusBar translucent backgroundColor='transparent' style={"light"}/>
        <TitleBar title={"Order Detail"} isBack={true} navigation={navigation}/>
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
                <TextKdr style={[HEADINGS.H1, {marginTop: 30}]}>{CURRENCY}{data.price}</TextKdr>
                <TextKdr style={[HEADINGS.p, {color: "#777777"}]}>(inclusive of all vat and tax)</TextKdr>
                <ButtonKdr style={{marginTop: 30, height: 55}} text={'Mark as completed'}
                           onPress={() => conformationModel.current.open()}/>

                <View style={[FLEX_STYLE.row, {marginVertical: 15}]}>
                    <ButtonKdr style={{
                        flex: 1,
                        backgroundColor: "white",
                        borderColor: COLOR.primary,
                        padding: 0,
                        marginHorizontal: 3,
                        borderWidth: 1,
                    }}
                               onPress={() => {
                                   Linking.openURL(`tel:${data.phoneNumber}`)
                               }}
                               innerStyle={[FLEX_STYLE.row]}
                               textStyle={[{color: "black", marginLeft: 10}, HEADINGS.H3]}
                               text={"Call For Order"}>
                        <Ionicons name="call" size={20} color="black"/>
                    </ButtonKdr>
                    <ButtonKdr style={{
                        flex: 1,
                        padding: 0,
                        backgroundColor: COLOR.black,
                        marginHorizontal: 3,
                    }}
                               onPress={() => {
                               //    nested navigation chatEntry -> Chat
                               //     alert(orderData.name+" "+orderData.email)
                                      navigation.navigate("EntryChat", {
                                          screen: "chat",
                                            params: {

                                                name: orderData.name,
                                                email: orderData.email,
                                                direct: true,

                                            }
                                      })

                               }}
                               innerStyle={[FLEX_STYLE.row]}
                               textStyle={[{color: COLOR.white, marginLeft: 10}, HEADINGS.H3]}

                               text={"Start Chatting"}>
                        <Ionicons name="chatbox-ellipses-sharp" size={20} color={COLOR.white}/>
                    </ButtonKdr>

                </View>
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