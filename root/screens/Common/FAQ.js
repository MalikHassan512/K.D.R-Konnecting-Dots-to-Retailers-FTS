import { ActivityIndicator, FlatList, Pressable, StyleSheet, View } from "react-native";
import COLOR from "../../Styles/Color";
import FAQTitleBar from "../../components/TitleBar/FAQTitleBar";
import { MaterialStyles } from "../../Styles/ComponentStyling/KDRMaterial";
import MARGINS from "../../Styles/MARGIN";
import TextKdr from "../../components/Text";
import HEADINGS from "../../Styles/heading";
import FLEX_STYLE from "../../Styles/FLEXSTYLE";
import PADDINGS from "../../Styles/PADDINGS";
import { useContext, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import dummyFaqs from "../User/dashboard/Account/other/DummyData";
import BORDER_STYLE from "../../Styles/Border";
import fetchFAQs from "../../API/USER/FAQApi";
import SessionContext from "../../context/Session/session";
import NoData from "../../components/other/NoData";
import { PromotionSkeletonAnimation } from "../../animation/PromotionSkeletonAnimation";


function FAQComponent({ question, answer }) {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <Pressable onPress={() => setIsExpanded(!isExpanded)} style={[PADDINGS.H20]}>
            <View style={[MARGINS.v10, styles.line]} />
            <View style={[FLEX_STYLE.row, FLEX_STYLE.center]}>
                <TextKdr style={[HEADINGS.H3, MARGINS.v10, FLEX_STYLE.one]}>{question}</TextKdr>

                {isExpanded ?
                    <Ionicons name="chevron-up" size={24} color={COLOR.gray_700} />
                    :
                    <Ionicons name="chevron-down" size={24} color={COLOR.gray_700} />
                }


            </View>
            {
                isExpanded ?
                    <>
                        <View style={[MARGINS.v6, styles.line]} />
                        <TextKdr style={[HEADINGS.p, MARGINS.v10, PADDINGS.H10,]}>{answer}</TextKdr>
                    </>
                    :
                    null
            }

        </Pressable>
    );
}

export default function FAQ({ navigation, ...props }) {
    const [search, setSearch] = useState("");
    const [FAQs, setFAQs] = useState("");
    const [filteredFAQs, setFilteredFAQs] = useState("");
    const session = useContext(SessionContext);
    const [loading, setLoading] = useState(true);

    const getFAQs = () => {
        fetchFAQs(session.session.token).then((res) => {
            setFAQs(res);
            setLoading(false);
        }
        ).catch((e) => {
            console.log("Error in fetching FAQs", e);
            setLoading(false);
        }).finally(() => {
            setLoading(false);
        }
        )
    }
    useEffect(() => {
        getFAQs();
    }, []);

    console.log(FAQs, "FAQs");

    const emptyComponent = () => {
        return (
            <View style={{ marginTop: '50%' }}>
                <NoData text={"No FAQ Found"} />
            </View>

        )

    }




    return loading ? <ActivityIndicator size="large" color={COLOR.black} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} /> 
    : (
        <View style={[styles.container]}>
            <FAQTitleBar navigation={navigation} search={search} setSearch={setSearch} title={"FAQ"} />
            <FlatList

                data={FAQs}
                style={{
                    paddingVertical: 20,
                }}
                contentContainerStyle={{
                    paddingBottom: 30,
                }}
                renderItem={
                    ({ item }) => <FAQComponent question={item.question} answer={item.answer} />
                }
                keyExtractor={(item, index) => index.toString()}

                ListEmptyComponent={emptyComponent}
            />

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.backgroundColor,
    },
    line: {
        borderBottomColor: COLOR.gray_600,
        borderBottomWidth: 2,
    }
});