import {StyleSheet, View, Image, ScrollView} from "react-native";
import TitleBar from "../../../../components/TitleBar/TitleBar";
import PADDINGS from "../../../../Styles/PADDINGS";
import {useContext, useEffect, useState} from "react";
import {LoadingContext} from "../../../../context/modal/LoadingContext";
import TextInputKdr, { LocationInputKdr } from "../../../../components/Input";
import SHADOWS from "../../../../Styles/shadows";
import {AntDesign, Entypo, EvilIcons, FontAwesome5} from "@expo/vector-icons";
import ButtonKdr from "../../../../components/Button/Buttonkdr";
import MARGINS from "../../../../Styles/MARGIN";
import MapLocationComponent from "../../../../components/Map/MapLocationComponent";
import getCurrentLocation from "../../../../other/raw";
import Toast from "react-native-toast-message";
import { fetchAddressData } from "../../../../API/USER/Location";
import COLOR from "../../../../Styles/Color";
import UserLocation from "../../../../components/Map/UserLocation";
import SettingLocationKdr from "../../../../components/Input/Settings/SettingLocationKdr";

export default function SignUpPage2({navigation, ...props}) {


    const loading = useContext(LoadingContext);
    const [form, setForm] = useState({
        address: {
            address: "",
            city: "",
            state: "",
            country: "",
            post_code: "",
            latitude: "",
            longitude: "",
        },

        social_media_accounts: {
            facebook: "",
            twitter: "",
            instagram: "",
            tiktok: "",
        }

    })
    function getLocation() {
        getCurrentLocation().then(async(res) => {
            let {latitude, longitude} = res.coords;
            const responseAddress=await fetchAddressData(latitude,longitude)
            console.log(responseAddress,"add..............");
            setForm({
                ...form,
                address: {
                    ...form.address,
                    ...responseAddress,
                    latitude: latitude,
                    longitude: longitude,

                }
            })
        }).catch((e) => {
            console.log(e)
        })
    }
    let defaultError = {
        address: "",
        city: "",
        state: "",
        country: "",
        post_code: "",

    }
    const [error, setError] = useState(defaultError)

    let validate = () => {
        let {address, city, state, country, post_code} = form.address;
        setError(defaultError)
        let isValid = true;
        let errors = defaultError;
        if(address==="")
        {
            errors = {
                ...errors,
                address:"Address is required"
            }
            isValid = false;
        }
        // if(city==="")
        // {
        //     errors = {
        //         ...errors,
        //         city:"City is required"
        //     }
        //     isValid = false;

        // }
        if(state==="")
        {
            errors = {
                ...errors,
                state:"State is required"
            }
            isValid = false;

        }
        if(country==="")
        {
            errors = {
                ...errors,
                country:"Country is required"
            }
            isValid = false;

        }
        // if(post_code==="")
        // {
        //     errors = {
        //         ...errors,
        //         post_code:"Postal code is required"
        //     }
        //     isValid = false;


        // }
        //check if post_code is number
        // if(post_code&&isNaN(post_code))
        // {
        //     errors = {
        //         ...errors,
        //         post_code:"Postal code must be a number"
        //     }
        //     isValid = false;
        // }
        setError(errors)
        return isValid;
    }

    const showToast = (type,txt1,txt2) => {
        Toast.show({
            type: type,
            text1: txt1,
            text2: txt2,
        });

    }
    let handleContinue = () => {
        let prevForm = props.route.params?.form;
        if(!validate()){
            showToast("error","Error","Please provide all the required fields")
        }
        else{
            let data = {
                ...prevForm,
                ...form,
            }
            navigation.navigate("ServiceProviderAuthEntry", {
                screen: "SpPage3",
                params: {
                    form: data
                }
            })
        }


    }
    useEffect(() => {
        getLocation();
    }, [])

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
            address: {
                ...form.address,
                address,
                city,
                state,
                country,
                post_code,
                latitude,longitude
            }
        }));

}
    return (
        <View style={[styles.container]}>
            <TitleBar title={"Register"} navigation={navigation}/>
            <ScrollView showVerticalIndecator={false} style={[PADDINGS.H20]}>

                <View style={[styles.address]}>
                    <LocationInputKdr containerStyle={{marginTop: 40}} error={error.address} label={"Address"}
                                  placeholder={"Street name"}
                                  value={form.address.address}
                                //   underlineColorAndroid='transparent'
                                  onPress={()=>setShow(true)}
                    />
         
                         
                    <UserLocation show={show} setShow={setShow}
                     values={{show,setShow,location:form.address.address,setLocation:updateAddress}}/>
                    <TextInputKdr containerStyle={{marginTop: 3}} error={error.city} label={""}
                                  placeholder={"City (Optional)"}
                                  underlineColorAndroid='transparent'
                                  value={form.address.city}
                                  onChangeText={(e) => {
                                      setForm({
                                          ...form,
                                          address: {
                                              ...form.address,
                                              city: e,
                                          }
                                      })
                                  }}
                    />
                    <TextInputKdr containerStyle={{marginTop: 3}} error={error.state} label={""}
                                  placeholder={"State"}
                                  underlineColorAndroid='transparent'
                                  value={form.address.state}
                                  onChangeText={(e) => {
                                      setForm({
                                          ...form,
                                          address: {
                                              ...form.address,
                                              state: e,
                                          }
                                      })
                                  }}
                    />
                    <TextInputKdr containerStyle={{marginTop: 3}} error={error.country} label={""}
                                  placeholder={"Country"}
                                  value={form.address.country}
                                  underlineColorAndroid='transparent'
                                  onChangeText={(e) => {
                                      setForm({
                                          ...form,
                                          address: {
                                              ...form.address,
                                              country: e,
                                          }
                                      })
                                  }}
                    />
                    <TextInputKdr containerStyle={{marginTop: 3}} error={error.post_code} label={""}
                                  placeholder={"Postal Code (Optional)"}
                                  underlineColorAndroid='transparent'
                                  value={form.address.post_code}
                                  onChangeText={(e) => {
                                      setForm({
                                          ...form,
                                          address: {
                                              ...form.address,
                                              post_code: e,
                                          },
                                      })
                                  }}
                    />
                </View>

                {
                    form.address.latitude!=="" && form.address.longitude!=="" ?
                        <MapLocationComponent
                            Latitude={form.address.latitude}
                            Longitude={form.address.longitude}
                            style={[{width: "100%", borderRadius: 15}]}
                        />:
                        null
                }

                <View style={[styles.socialMedia]}>
                    <TextInputKdr outlineStyle={{borderStyle:"dotted"}} containerStyle={{marginTop: 40}} error={""} label={"Social media accounts"}
                                  placeholder={"Facebook"}
                                  value={form.social_media_accounts.facebook}
                                  onChangeText={(e) => {
                                      setForm({
                                          ...form,
                                          social_media_accounts: {
                                              ...form.social_media_accounts,
                                              facebook: e,
                                          }
                                      })
                                  }}
                                  icon={<EvilIcons name="sc-facebook" size={24} color={COLOR.primary}/>}
                    />
                    <TextInputKdr outlineStyle={{borderStyle:"dotted"}}  containerStyle={{marginTop: 3}} error={""} label={""}
                                  placeholder={"Twitter"}
                                  value={form.social_media_accounts.twitter}
                                  onChangeText={(e) => {
                                      setForm({
                                          ...form,
                                          social_media_accounts: {
                                              ...form.social_media_accounts,
                                              twitter: e,
                                          }
                                      })
                                  }}
                                  icon={<AntDesign name="twitter" size={20} color={COLOR.primary} />}
                    />
                    <TextInputKdr outlineStyle={{borderStyle:"dotted"}}  containerStyle={{marginTop: 3}} error={""} label={""}
                                  placeholder={"tiktok"}
                                  value={form.social_media_accounts.tiktok}
                                  onChangeText={(e) => {
                                      setForm({
                                          ...form,
                                          social_media_accounts: {
                                              ...form.social_media_accounts,
                                              tiktok: e,
                                          }
                                      })
                                  }}
                                  icon={<FontAwesome5 name="tiktok" size={20} color={COLOR.primary} />}
                    />
                    <TextInputKdr outlineStyle={{borderStyle:"dotted"}}  containerStyle={{marginTop: 3}} error={""} label={""}
                                  placeholder={"Instagram"}
                                  value={form.social_media_accounts.instagram}
                                  onChangeText={(e) => {
                                      setForm({
                                          ...form,
                                          social_media_accounts: {
                                              ...form.social_media_accounts,
                                              instagram: e,
                                          }
                                      })
                                  }}
                                  icon={<AntDesign name="instagram" size={20} color={COLOR.primary} />}
                    />
                    <ButtonKdr onPress={handleContinue} text={"Continue"} style={[MARGINS.v28]}/>

                </View>



            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    address: {},
    socialMedia: {}
});