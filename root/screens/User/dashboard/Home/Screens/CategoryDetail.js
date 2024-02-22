import {StyleSheet, View, ScrollView, FlatList} from "react-native";
import ContactFooter from "../../../../../components/Footer/ContactFooter";
import CategoryTitleBar from "../../../../../components/TitleBar/User/CategoryTitleBar";
import {StatusBar} from "expo-status-bar";
import Items from "../other/itemsData";
import PopularServicesCard from "../../../../../components/ServicesCards/PopularServicesCard";
import ServiceCard from "../../../../../components/ServicesCards/ServiceCard";
import TextKdr from "../../../../../components/Text";
import {useState} from "react";
import API_URLS from "../../../../../API/USER/URLS";
import { getUrl } from "../../../../../other/raw";
import BORDER_STYLE from "../../../../../Styles/Border";


export default function CategoryDetail({navigation, ...props}) {
    const {subCategories, title,image} = props.route.params;
    console.log(subCategories,"sub");
    const [data, setData] = useState(subCategories);
    const [search, setSearch] = useState("");
    return (<View style={[styles.container,]}>
        <StatusBar translucent backgroundColor='transparent' style={"light"}/>
        <CategoryTitleBar title={title} description={""}
                          search={search}
                          navigation={navigation}
                             hideRightIcon={true}
                          setSearch={(value) => {
                              setSearch(value);
                              setData(subCategories.filter((item) => {
                                  return item.title.toLowerCase().includes(value.toLowerCase())
                              }))
                          }}
                          
                          source={image}/>


        <View style={[styles.mainContainer,]}>
            <FlatList
                data={data}
                style={[{flex: 1,}]}
                
                contentContainerStyle={{paddingRight: 5}}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => {
                    return <ServiceCard
                        style={[styles.content,]}
                        source={getUrl(item?.media?.file)}
                        onPress={() => navigation.navigate("CategoryService", {
                            category: title,
                            subCategories: item?.title,
                            image: {uri:API_URLS.images + item?.media?.file},

                        })}
                        userName={item?.user_data?.Name}
                        userProfile={getUrl(item?.user_data?.DP?.file)}
                        title={item?.title} totalService={item?.no_of_services}/>
                }}
                keyExtractor={item => item.id}
                numColumns={2}
                key={item => item.id}
                ListFooterComponent={<ContactFooter/>}
            />
        </View>

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
    }
});