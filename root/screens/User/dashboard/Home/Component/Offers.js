import {StyleSheet, View, FlatList} from "react-native";
import OfferCard from "../../../../../components/ServicesCards/OfferCard";
import {useContext, useEffect, useState} from "react";
import {getRandColor, getUrl} from "../../../../../other/raw";
import {FetchOffers} from "../../../../../API/USER";
import SessionContext from "../../../../../context/Session/session";


// <OfferCard source={require("../../../../../../assets/img/giftbox.png")}
//            color={getRandColor()}
//            title={"25% off for New Users!"}
//            discription={"Exclusive deals & much more"}
//            onPress={() => {
//            }}
//
// />


export default function Offers({navigation,refresh, ...props}) {
    const [offers, setOffers] = useState([]);
    const session= useContext(SessionContext);

    const getOffers = async () => {
        FetchOffers(session.session.token).then((res) => {
            setOffers(res.results);

        }).catch((e) => {
        })
    }

    useEffect(() => {
        getOffers();
    }, [refresh])

    return (<View style={[styles.container]}>
            <FlatList horizontal={true} showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.contentContainer} data={offers}
                      renderItem={({item}) => {
                          return (
                              <OfferCard source={getUrl(item?.image)}
                                         color={getRandColor()}
                                         title={item?.title}
                                         discription={item?.description}
                                         onPress={() => {
                                         }}
                              />
                          )
                      }}
                      keyExtractor={(item, index) => index.toString()}


            />


        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    }, heading: {
        fontSize: 20, fontWeight: 'bold', marginBottom: 15,
    }, contentContainer: {
        flexGrow: 1,
    }
});