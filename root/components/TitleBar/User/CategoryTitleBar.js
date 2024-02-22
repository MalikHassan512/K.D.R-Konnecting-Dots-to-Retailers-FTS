import {Ionicons, MaterialCommunityIcons, Octicons} from '@expo/vector-icons';
import {StyleSheet, ImageBackground, View, Modal, TouchableOpacity, FlatList, TextInput} from "react-native";
import SearchInput from "../../SearchInput/SearchInput";
import Constants from 'expo-constants';
import TextKdr from "../../Text";
import HEADINGS from "../../../Styles/heading";
import FLEX_STYLE from '../../../Styles/FLEXSTYLE';
import { useEffect, useState } from 'react';
import COLOR from '../../../Styles/Color';
import { fetchAddressData, getCitiesLocation, getRelatedAddresses } from '../../../API/USER/Location';
import TextInputKdr from '../../Input';
import ButtonKdr from '../../Button/Buttonkdr';
import ListItem from '../../list/ListItem';
import ListItemSeparator from '../../list/ListItemSeparator';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../../../config/colors';
import getCurrentLocation from '../../../other/raw';
                                                                                    
export default function CategoryTitleBar({navigation, title, description, source, ...props}) {
const [show,setShow]=useState(false)
    return (
        <ImageBackground source={source} style={styles.main}>
            <View style={[styles.container]}>
                <Ionicons name="chevron-back" onPress={() => navigation.goBack()} size={24} color="white"/>
                <SearchInput handleLocationSearch={()=>setShow(true)} style={{marginHorizontal: 15}}  {...props}/>
                {/*<Octicons name="three-bars" size={24} color="white"/>*/}
            </View>
            <TextKdr style={[HEADINGS.H1, {
                marginTop: 20,
                color: "white",
                marginBottom: description ? 5 : 30
            }]}>{title}</TextKdr>
            {description ?
                <TextKdr style={[HEADINGS.p, {color: "white", marginBottom: 30}]}>{description}</TextKdr> : null}
<LocationModal show={show} setShow={setShow} {...props}/>
        </ImageBackground>

    )
}


const LocationModal = ({show,setShow,location,setLocation}) => {


    const [search, setSearch] = useState("");
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        getCitiesLocation(search).then((data) => {
        setAddresses(data);
      });
    }, [search]);
    const handleLocationClick=(item)=>{
        setShow(false)
        setLocation(item.structured_formatting.main_text);
    }
    const handleCurrentLocation=()=>{
        getCurrentLocation().then(async(res) => {
            let {latitude, longitude} = res.coords;
            const responseAddress=await fetchAddressData(latitude,longitude)
            console.log(responseAddress);
            setLocation(responseAddress.city)
            setShow(false)

        })
    }
    return (
        <Modal visible={show}>

        <View style={styles.modalContainer}>
            <View style={{...FLEX_STYLE.row,...FLEX_STYLE.rowCenter,...FLEX_STYLE.spaceBetween,paddingHorizontal:10,paddingRight:"10%"}}>

            <TouchableOpacity onPress={()=>setShow(false)} style={{...FLEX_STYLE.row,...FLEX_STYLE.rowCenter,width:"20%"}}>
                <MaterialCommunityIcons name='close' size={40}/>
                
            </TouchableOpacity>
            <View style={{...FLEX_STYLE.row,...FLEX_STYLE.center,flex:1,paddingRight:"15%"}}>

                <TextKdr style={{...HEADINGS.H1}}>Location</TextKdr>
            </View>
            </View>
            <View style={{borderTopWidth:1,borderTopColor:COLOR.black,marginVertical:5}}/>
            <View >
            <View style={{...FLEX_STYLE.row,...FLEX_STYLE.rowCenter,paddingHorizontal:10,marginVertical:10}}>
 <View style={{justifyContent:"center",width:"70%"}}>

            <TextInputKdr
            // outlineStyle={{height:50}} 
                                  placeholder={"Search a Location"}
                                  value={search}
                                  onChangeText={value=>setSearch(value)}
                              
                    />
 </View>
                    <ButtonKdr
                    style={{width:"30%",paddingVertical:5}}
                    text={"Search"}
                    />
                    </View>
                  <View style={{borderTopLeftRadius:15,borderTopRightRadius:15, overflow: "hidden",backgroundColor:COLOR.gray_500,height:"100%"}}>
<CurrentLocation onPress={handleCurrentLocation}/>
<ListItemSeparator/>
{location&&<>
<ListItem
titleStyle={{color:colors.lightBlue,...HEADINGS.H3}}
            title={location}
            />
            <ListItemSeparator/>
</>}

            <FlatList
        data={addresses}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ListItemSeparator}
        renderItem={({ item }) => (
           <ListItem
            title={item.description}
            onPress={()=>handleLocationClick(item)}
            />
        )}
      />
   
                  </View>
            </View>
        </View>
        </Modal>
    );
};

const CurrentLocation = ({onPress}) => {
    return (
        <TouchableOpacity style={{...FLEX_STYLE.row,...FLEX_STYLE.rowCenter,gap:10,padding:10}} onPress={onPress}>
            <MaterialIcons name="gps-fixed" size={24} color="black" />
            <TextKdr>Use current location</TextKdr>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    main: {
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 15,
        paddingTop: Constants.statusBarHeight + 30,
        paddingHorizontal: 20,
    },
    logo: {
        width: 40,
        height: 25,
    },
    modalContainer:{
        backgroundColor:COLOR.gray_800,
        flex:1
    }
});