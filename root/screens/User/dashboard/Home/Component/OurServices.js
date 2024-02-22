import { StyleSheet, View, ScrollView, Pressable } from "react-native";
import CategoryServiceCard from "../../../../../components/ServicesCards/CategoryServiceCard";
import TextKdr from "../../../../../components/Text";
import HEADINGS from "../../../../../Styles/heading";
import SkeletonCategoryAnimation from "../../../../../animation/SkeletonCategoryAnimation";
import React, { useEffect } from "react";
import SessionContext from "../../../../../context/Session/session";
import fetchCategories from "../../../../../API/USER";
import Toast from "react-native-toast-message";
import API_URLS from "../../../../../API/USER/URLS";
import { getUrl } from "../../../../../other/raw";
import BORDER_STYLE from "../../../../../Styles/Border";

export default function OurServices({ navigation, refresh, ...props }) {
    const [loading, setLoading] = React.useState(true);
    const session = React.useContext(SessionContext);
    const [categories, setCategories] = React.useState([]);

    function fetchCategoriesF() {
        if (session.session.token === null) {
            return;
        }
        fetchCategories(session.session.token).then((res) => {
            setCategories(res.results);
            setLoading(false);
        }).catch((e) => {
            Toast.show({
                type: 'error', text1: 'Error', text2: 'Something went wrong'
            });
            setLoading(false);

        })
    }

    useEffect(() => {
        if (refresh === true) {
            setLoading(true)
            setCategories([])
            fetchCategoriesF();
        }
    }, [session.session.token, refresh])


    if (loading) {
        return <SkeletonCategoryAnimation />
    }

    return (<View style={[styles.container]}>
        <TextKdr style={[styles.heading, HEADINGS.H3, BORDER_STYLE]}>Our Services</TextKdr>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
            contentContainerStyle={[styles.contentContainer,]}>
            {
                categories.map((item, index) => {
                    return <CategoryServiceCard onPress={() => {
                        navigation.navigate("CategoryDetail", {
                            subCategories: item?.sub_categories,
                            title: item?.title,
                            image: { uri: API_URLS.images + item?.media?.file }
                        })
                    }}
                        key={index}
                        source={getUrl(item?.media?.file)}
                        title={item?.title} />

                })}

        </ScrollView>

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
        paddingVertical: 10
    }
});