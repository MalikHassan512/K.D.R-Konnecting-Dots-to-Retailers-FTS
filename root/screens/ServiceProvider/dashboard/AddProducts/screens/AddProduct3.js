import {Image, StyleSheet, View} from "react-native";
import COLOR from "../../../../../Styles/Color";
import TitleBar from "../../../../../components/TitleBar/TitleBar";
import React, {useContext, useEffect, useState} from "react";
import {ScrollView} from "react-native";
import SettingTextInputKdr from "../../../../../components/Input/Settings/SettingTextInputKdr";
import TextKdr from "../../../../../components/Text";
import HEADINGS from "../../../../../Styles/heading";
import ButtonKdr from "../../../../../components/Button/Buttonkdr";
import getCurrentLocation from "../../../../../other/raw";
import MapLocationComponent from "../../../../../components/Map/MapLocationComponent";
import Toast from "react-native-toast-message";
import Urls from "../../../../../other/Urls";
import SessionContext from "../../../../../context/Session/session";
import SettingLocationKdr from "../../../../../components/Input/Settings/SettingLocationKdr";
import UserLocation from "../../../../../components/Map/UserLocation";
import { LoadingContext } from "../../../../../context/modal/LoadingContext";

export default function AddProduct3({navigation, ...props}) {
    const loading = useContext(LoadingContext);
    function getLocation() {
        getCurrentLocation().then((res) => {
            let {latitude, longitude} = res.coords;
            setForm({
                ...form,
                service_address: {
                    ...form.service_address,
                    latitude: latitude,
                    longitude: longitude,

                }
            })
        }).catch((e) => {
            console.log(e)
        })
    }
    useEffect(() => {
        console.log(props.route.params?.form)
        getLocation();
    }, [])
    const showToast = (type,txt1,txt2) => {
        Toast.show({
            type: type,
            text1: txt1,
            text2: txt2,
        });

    }
    const [form, setForm] = useState({
        service_address: {
            streetAddress: "",
            city: "",
            state: "",
            country: "",
            latitude: 0.0022,
            longitude: 0.0022,
        }
    })
    const session = useContext(SessionContext);
    function handleContinue() {
        for (let key in form.address) {
            if (key!=="state"&&form.address[key] === "") {
                showToast("error","Error","Please fill all the fields")
                return;
            }
        }

        let temp = {
            ...form,
            ...props.route.params?.form,
            is_approved:true,
        }
        loading.show();
        fetch(Urls.AddService,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Token " + session.session.token
            },
            body:JSON.stringify(temp)

        }).then((res)=>res.json()).then((res)=>{
            console.log(res)
            if(res.id){
                 navigation.navigate("ServiceAdded")
            }
            else{
                if(res.service_address.latitude || res.service_address.longitude){
                    getLocation();
                    showToast("error","Error Occurred in fetching location","Please Try Again")
                }
                showToast("error","Error","Something went wrong")
            }

        }).finally(() => {
            loading.close();
        })

    }
    const [show,setShow]=useState(false)

    function updateAddress(data) {
     
        const {  
           address,
           city,
           state,
           country,
           post_code,
           latitude,longitude
        }=data
        setForm((form)=>({
            ...form,
                service_address: {
                    ...form.service_address,
                    streetAddress:address,
                       city,
                       state,
                       country,
                       latitude,longitude
                }
            }
        ));
    
       
       
       }
    return (
        <View style={[styles.container]}>
            <TitleBar navigation={navigation} title={"Add a Product / Service"}/>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.contentContainer]}>
                <TextKdr style={[HEADINGS.H3]}>Location</TextKdr>
                <SettingLocationKdr style={{marginTop: 10}}  placeholder={"Street name"}
                value={form.service_address.streetAddress}
                onPress={()=>setShow(true)}
                />
                         
                    <UserLocation show={show} setShow={setShow}
                     values={{show,setShow,location:form.service_address.streetAddress,setLocation:updateAddress}}/>
                <SettingTextInputKdr   placeholder={"City"}
                value={form.service_address.city}
                onChangeText={(e) => {
                    setForm({
                        ...form,
                        service_address: {
                            ...form.service_address,
                            city: e
                        }
                    })
                }}
                />
                <SettingTextInputKdr   placeholder={"State (Optional)"}
                value={form.service_address.state}
                onChangeText={(e) => {
                    setForm({
                        ...form,
                        service_address: {
                            ...form.service_address,
                            state: e
                        }
                    })
                }}
                />
                <SettingTextInputKdr   placeholder={"Country"}
                value={form.service_address.country}
                onChangeText={(e) => {
                    setForm({
                        ...form,
                        service_address: {
                            ...form.service_address,
                            country: e
                        }
                    })
                }}
                />
                {
                    form.service_address.latitude!==0.0022 && form.service_address.longitude!==0.0022 ?
                        <MapLocationComponent
                            Latitude={form.service_address.latitude}
                            Longitude={form.service_address.longitude}
                            style={[{width: "100%", borderRadius: 15}]}
                        />:
                        null
                }
            </ScrollView>
            <ButtonKdr style={{marginHorizontal:10,marginVertical:30}} text={"Add Service"} onPress={handleContinue}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.backgroundColor,
    },
    contentContainer: {
        padding: 20,
    },
});