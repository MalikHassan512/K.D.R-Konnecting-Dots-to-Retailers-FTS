import {StyleSheet, View, FlatList, Pressable} from "react-native";
import ContactFooter from "../../../../../components/Footer/ContactFooter";
import CategoryTitleBar, {DropDownTitleBar} from "../../../../../components/TitleBar/User/CategoryTitleBar";
import {StatusBar} from "expo-status-bar";
import ServiceCard from "../../../../../components/ServicesCards/ServiceCard";
import TextKdr from "../../../../../components/Text";
import FLEX_STYLE from "../../../../../Styles/FLEXSTYLE";
import PADDING from "../../../../../Styles/PADDINGS";
import {Entypo} from "@expo/vector-icons";
import SHADOWS from "../../../../../Styles/shadows";
import {Menu, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";
import COLOR from "../../../../../Styles/Color";
import Checkbox from "expo-checkbox";
import {useContext, useEffect, useRef, useState} from "react";
import ButtonKdr from "../../../../../components/Button/Buttonkdr";
import {EmptyListAnimation} from "../../../../../animation/SkeletonServicesAnimation";
import SessionContext from "../../../../../context/Session/session";
import getCurrentLocation, {getUrl, JsonToQueryString} from "../../../../../other/raw";
import {fetchServices} from "../../../../../API/USER";
import NoData from "../../../../../components/other/NoData";
import PopularServicesCard from "../../../../../components/ServicesCards/PopularServicesCard";


function MyMenu({applyFilter}) {
    const DEFAULT_FILTER = {
        distance: false, lowToHigh: false, highToLow: false, rating: false,

    }
    const [form, setForm] = useState(DEFAULT_FILTER)
    const ref = useRef();
    return (<Menu style={{}} ref={ref}>
        <MenuTrigger
            customStyles={{}}
        >
            <View style={[FLEX_STYLE.rowCenter, FLEX_STYLE.center, SHADOWS.shadowSm, {
                backgroundColor: "#fff", borderRadius: 50, padding: 7,
            }]}>
                <TextKdr style={{marginEnd: 4, fontSize: 12}}>Filter By</TextKdr>
                <Entypo name="chevron-thin-down" size={12} color="black"/>
            </View>
        </MenuTrigger>
        <MenuOptions customStyles={{
            optionsContainer: MenuStyle.menuOptions,

        }}>
            <TextKdr style={{marginEnd: 4, fontSize: 12, fontWeight: "bold"}}>Filter By</TextKdr>
            <View style={MenuStyle.option}>
                <TextKdr style={{marginEnd: 4, fontSize: 12, flex: 1}}>Distance</TextKdr>
                <Checkbox
                    value={form.distance}
                    color={COLOR.black}
                    style={MenuStyle.checkBoxStyle}
                    size={20}
                    onValueChange={(newValue) => setForm({...form, distance: newValue})}
                />
            </View>
            <View style={MenuStyle.option}>
                <TextKdr style={{marginEnd: 4, fontSize: 12, flex: 1}}>Price: Low to high</TextKdr>
                <Checkbox
                    value={form.lowToHigh}
                    color={COLOR.black}
                    style={MenuStyle.checkBoxStyle}
                    size={20}
                    onValueChange={(newValue) => setForm({...form, lowToHigh: newValue, highToLow: false})}
                />
            </View>
            <View style={MenuStyle.option}>
                <TextKdr style={{marginEnd: 4, fontSize: 12, flex: 1}}>Price: High to low</TextKdr>
                <Checkbox
                    value={form.highToLow}
                    color={COLOR.black}
                    style={MenuStyle.checkBoxStyle}
                    size={20}
                    onValueChange={(newValue) => setForm({...form, lowToHigh: false, highToLow: newValue})}
                />
            </View>
            <View style={[MenuStyle.option, {borderBottomWidth: 0}]}>
                <TextKdr style={{marginEnd: 4, fontSize: 12, flex: 1}}>Rating</TextKdr>
                <Checkbox
                    value={form.rating}
                    color={COLOR.black}
                    style={MenuStyle.checkBoxStyle}
                    size={20}
                    onValueChange={(newValue) => setForm({...form, rating: newValue})}
                />
            </View>

            <View style={[FLEX_STYLE.center]}>
                <MenuOption>
                    <ButtonKdr onPress={() => {
                        applyFilter(form)
                        ref.current.close()
                    }} text={"Apply"} innerStyle={{marginVertical: 7}}
                               textStyle={{fontSize: 10}}
                               style={MenuStyle.ButtonStyle}/>
                </MenuOption>
                <Pressable
                    onPress={() => {
                        setForm(DEFAULT_FILTER)
                        applyFilter(DEFAULT_FILTER)
                        ref.current.close()
                    }}

                    style={{
                        borderBottomWidth: 1, borderColor: COLOR.gray_800, marginTop: 7,
                    }}>
                    <TextKdr style={{fontSize: 10}}>Clear All</TextKdr>
                </Pressable>
            </View>
        </MenuOptions>
    </Menu>)
}

const MenuStyle = StyleSheet.create({
    menuOptions: {
        padding: 10, borderRadius: 10, width: 200, marginEnd: 10,


    }, option: {
        borderBottomWidth: 1, borderColor: COLOR.gray_800, marginTop: 7, flexDirection: "row", paddingBottom: 5,


    }, checkBoxStyle: {
        borderWidth: 1, width: 15, height: 15,

    }, ButtonStyle: {
        padding: 0, flex: null, width: "50%", marginTop: 10,
    }
});


export default function CategoryService({navigation, ...props}) {
    const params = props.route?.params;
    const category = params?.category;
    const subCategories = params?.subCategories;
    const image = params?.image;

    const [search, setSearch] = useState("");
    const [data, setData] = useState(null)
    const [query, setQuery] = useState({
        lat: null, lng: null, name: null, ascendingPriceOrder: null, rating: null,
        page_size: 10, category: category, sub_category: subCategories,location:""

    });//{lat: 0, lng: 0}
    const [page, setPage] = useState(1);
    const session = useContext(SessionContext);

    async function ApplyFilter(data) {
        let temp = {
            page_size: 10, page: 1,
        }
        if (data.distance) {
            await getCurrentLocation().then((res) => {
                temp["lat"] = res.coords.latitude
                temp["lng"] = res.coords.longitude
            })
        }
        if (data.lowToHigh) {
            temp["ascendingPriceOrder"] = true
        } else if (data.highToLow) {
            temp["ascendingPriceOrder"] = false
        }
        if (data.rating) {
            temp["rating"] = true
        }
        if (category) temp["category"] = category
        if (subCategories) temp["sub_category"] = subCategories
        if (search?.length > 0) temp["name"] = search
        setQuery(temp)
    }


    useEffect(() => {
        FetchNearbyServices();
    }, [query])


    function FetchNearbyServices() {
        setData(null)
        setPage(1)
        query.city=query.location
        fetchServices(session.session.token, JsonToQueryString({...query,location:null, page: 1})).then((res) => {
            console.log(res,"res")
            setData(res)
        }).catch((e) => {
            console.log(e)
        })
    }

    function NextPage() {
        if (data?.next === null) return;
        setPage(page + 1)
        fetchServices(session.session.token, JsonToQueryString({...query, page: page})).then((res) => {
            setData({...data, results: [...data.results, ...res.results]})
        }).catch((e) => {
            console.log(e)
        })
    }
const handleLocationChange=(value)=>{
setQuery({...query,location:value})
}
    let description = category && subCategories ? `${category} > ${subCategories}` : "";
    return (<View style={[styles.container]}>
        <StatusBar translucent backgroundColor='transparent' style={"light"}/>
        <CategoryTitleBar setLocation={handleLocationChange} location={query.location} navigation={navigation} title={subCategories ? subCategories : null}
                          search={search} setSearch={setSearch}
                          returnKeyType={'done'}
                          onSubmitEditing={(event) => {
                              setQuery({...query, name: event.nativeEvent.text})
                          }}
                          description={description}
                          source={image ? image : require("../../../../../../assets/img/catDetail.png")}/>

        <View style={[FLEX_STYLE.row, PADDING.H10, PADDING.v10, FLEX_STYLE.center]}>
            <TextKdr style={{flex: 1}}>{data?.results.length} Services found</TextKdr>
            <MyMenu applyFilter={ApplyFilter}/>

        </View>
        <View style={[styles.mainContainer]}>
            <FlatList
                data={data?.results}
                style={{flex: 1}}
                ListEmptyComponent={data?.results.length === 0 ? <NoData/> : <EmptyListAnimation/>}
                contentContainerStyle={{paddingRight: 5}}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => {
                    return <PopularServicesCard
                        serviceID={item?.id}
                        style={styles.content}
                        onPress={() => {
                            navigation.navigate("ServiceDetailScreen", {
                                service: item
                            })
                        }}
                        userName={item?.user_data?.Name}
                        userProfile={getUrl(item?.user_data?.DP.file)}
                        isLikedByUser={item?.isServiceLiked}
                        source={getUrl(item?.media[0]?.file)}
                        discount={item?.discount}
                        title={item?.title}
                        price={item?.price}
                        rating={item?.rating}

                    />
                }}
                keyExtractor={item => item.id}
                numColumns={2}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                    NextPage();
                }}
                key={item => item.id}
                ListFooterComponent={<ContactFooter/>}
            />
        </View>

    </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1, flexDirection: 'column',
    }, mainContainer: {
        flex: 1, flexDirection: 'column', backgroundColor: '#F2F2F2', padding: 8,

    }, Contact: {
        justifyContent: "center", flexDirection: "row"
    }, content: {
        width: "auto", flex: 1, marginTop: 10,
    }
});