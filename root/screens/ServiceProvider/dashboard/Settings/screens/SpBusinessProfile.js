import {StyleSheet, ScrollView, View, Pressable, TouchableHighlight, TouchableOpacity} from "react-native";
import TitleBar from "../../../../../components/TitleBar/TitleBar";
import ChangeDpComponent from "../../../../../components/dp/ChangeDpComponent";
import MARGINS from "../../../../../Styles/MARGIN";
import SettingTextInputKdr from "../../../../../components/Input/Settings/SettingTextInputKdr";
import COLOR from "../../../../../Styles/Color";
import ButtonKdr from "../../../../../components/Button/Buttonkdr";
import PADDINGS from "../../../../../Styles/PADDINGS";
import TextKdr from "../../../../../components/Text";
import HEADINGS from "../../../../../Styles/heading";
import SettingPasswordTextInputKdr from "../../../../../components/Input/Settings/SettingPasswordTextInputKdr";
import {AntDesign, FontAwesome, Ionicons} from "@expo/vector-icons";
import {PicImage, UploadImage} from "../../../../../API/USER/ProfileSetting";
import Toast from "react-native-toast-message";
import React, {useContext, useEffect, useState} from "react";
import SessionContext from "../../../../../context/Session/session";
import {LoadingContext} from "../../../../../context/modal/LoadingContext";
import getCurrentLocation, {getUrl} from "../../../../../other/raw";
import Urls from "../../../../../other/Urls";
import RoundedInputBase from "../../../../../components/Input/RoundedInputBase";
import PADDING from "../../../../../Styles/PADDINGS";
import FLEX_STYLE from "../../../../../Styles/FLEXSTYLE";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";
import MapLocationComponent from "../../../../../components/Map/MapLocationComponent";
import { fetchAddressData } from "../../../../../API/USER/Location";
import UserLocation from "../../../../../components/Map/UserLocation";
import SettingLocationKdr from "../../../../../components/Input/Settings/SettingLocationKdr";


function DocumentButton({onPress, placeholder, ...props}) {

    return (
        <Pressable onPress={onPress}>
            <RoundedInputBase {...props} outlineStyle={{
                borderRadius: 10,
                borderStyle: "dashed",
            }}>
                <TextKdr style={[PADDING.v10, {color: COLOR.gray_1000, flex: 1, textAlign: "center"}]}>
                    {placeholder}
                </TextKdr>
            </RoundedInputBase>
        </Pressable>
    )
}


function UploadDocument({title,onPressDelete}) {


    return (
        <View style={[FLEX_STYLE.row,FLEX_STYLE.center,MARGINS.v14]}>
            <AntDesign name="checkcircle" size={28} color="#47B76E" />
            <TextKdr style={[MARGINS.H10,{
                fontSize: 16,
            }]}>
                {title}
            </TextKdr>
            <Pressable onPress={onPressDelete} style={{
                borderWidth: 1,
                width: 28,
                height: 28,
                borderRadius: 15,
                borderColor: COLOR.gray_1000,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 10

            }}>
                <AntDesign name="delete" size={18} color="black" />
            </Pressable>
            <View style={[FLEX_STYLE.one]} />
        </View>
    )
}

export default function SpBusinessProfile({navigation, ...props}) {
    const session = useContext(SessionContext);
    const loading = useContext(LoadingContext);
    const [buttonText, setButtonText] = useState("Update Info");
    const [errors, setErrors] = useState({});
    const [profile, setProfile] = useState({});
    const [show,setShow]=useState(false)
    function deleteDocument(obj1) {
        let newLicenses = profile.licenses.filter((item) => {
            return item.id !== obj1.id
        })
        setProfile({
            ...profile,
            licenses: newLicenses
        })
    }
    let uploadDocument = async () => {
        // let result = await DocumentPicker.pick({
        //     presentationStyle:"pageSheet"
        // });
        // console.log(result)
        // return result;
        // let result = await ImagePicker.launchImageLibraryAsync({
        //     mediaTypes: ImagePicker.MediaTypeOptions.All,
        //     allowsMultipleSelection: true,
        //     quality: 0.5,
        // });
        //
        // if (!result.canceled) {
        //     console.log(result);
        // }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.6,
        });


        if (!result.canceled) {
            uploadFile(result.assets[0])

            return result.assets[0];
        }

    }
    const showToast = (type,txt1,txt2) => {
        Toast.show({
            type: type,
            text1: txt1,
            text2: txt2,
        });

    }
    let uploadFile = async (file) => {
        //check if file is already uploaded
        // media array has object {file,id} check if file object is in media array

        setButtonText("Uploading...")
        let data = new FormData();
        let uploadingFile = {
            name: file.uri.split("/").pop(),
            type: mime.getType(file.uri),
            uri: file.uri
        }
        data.append("file",uploadingFile );
        await fetch(Urls.uploadFile,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',

                },
                body: data
            })
            .then((response) => response.json())
            .then((response) => {
                console.log(response)
                setButtonText("Update Info")
                if (response.id) {
                    setProfile({
                        ...profile,
                        licenses: [...profile?.licenses, response],
                    })
                    showToast("success", "Media uploaded", "")
                    // setMedia([...media, file])
                } else {
                    showToast("error", "Error while uploading media", "")
                    return null
                }
            })
            .catch((error) => {
                console.log(error.message)
                showToast("error", "Error while uploading media", "")
                setButtonText("Update Info")
            })

    }
    let updateUserProfile = () => {
        if(buttonText!== "Update Info") {
            showToast("error","Please wait while document is being uploaded","")
            return null
        }
        loading.show()
        //pop email and username from profile
        let temp = {...profile};
        delete temp.category
        delete temp.sub_category
        let tempUser = {...temp.user};
        delete tempUser.email;
        delete tempUser.username;
        temp.user = tempUser;
        let licenses = temp.licenses
        delete temp.licenses;
        temp.licensesID = licenses.map((item) => {
            return item.id
        })

        let data = {
            ...temp,
        }

        fetch(Urls.serviceProvidersUpdate, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + session.session.token
            },
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.status <= 200) {
                response.json().then((data) => {
                    setErrors({})
                    session.setSession({...session.session, profile: data.user});
                    Toast.show({
                        type: 'success',
                        text1: 'Success',
                        text2: 'Profile Updated',
                    })
                })

            } else {
                response.json().then((data) => {
                    console.log(data)
                    setErrors(data)
                })
                Toast.show({
                    type: 'error',
                    text1: 'Error while updating profile',
                    text2: 'Please check your input and try again',
                });
            }
        }).catch((e) => {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Something went wrong',
            })
        }).finally(() => {
            loading.close();
        })
    }
    useEffect(() => {
        loading.show()
        fetch(Urls.serviceProviderProfile,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + session.session.token
                }
            }).then((response) => {
            if (response.status <= 200) {
                response.json().then((data) => {
                    console.log(data)
                    setProfile(data);
                })
            } else {
                response.json().then((data) => {
                    console.log(data)
                })
                Toast.show({
                    type: 'error',
                    text1: 'Error while fetching profile data',
                    text2: 'Please Try Again',
                });
            }
        }).catch((e) => {
            Toast.show({
                type: 'error',
                text1: 'Network Error',
                text2: 'Please Try Again',
            });
        }).finally(()=>{
            loading.close()
        })

    }, [])
    let SelectProfileImage = () => {
        PicImage().then((response) => {
            let uri = response.assets[0].uri;
            loading.show();
            UploadImage(session.session.token, uri).then((response) => {
                loading.close();
                setProfile({
                    ...profile, user: {
                        ...profile.user,
                        dp: response.id, DP: response
                    }
                });
            }).catch((e) => {
                loading.close();
                Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: 'Something while Uploading Image',
                    }
                )
            });
        }).catch((e) => {
            Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Something went wrong',
                }
            )
        })
    };
 

function updateAddress(data) {
     console.log(data);
    const {  
       address,
       city,
       state,
       country,
       post_code,
       latitude,longitude
    }=data

       setProfile((profile)=>({
        ...profile, user: {
            ...profile.user,
            address: {
                ...profile.user.address,
                address,
                   city,
                   state,
                   country,
                   post_code,
                   latitude,longitude
            }
        }
    }));
   
   
   }

    return (
        <View style={[styles.container]}>
            <TitleBar title="Business profile " navigation={navigation}/>
            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 20,
                    marginTop: 20,
                    paddingBottom: 30,
                }}
            >
                <ChangeDpComponent onPress={SelectProfileImage} navigation={navigation} style={[MARGINS.v14]}
                                   source={profile.user?.dp ? getUrl(profile?.user?.DP?.file) : require("../../../../../../assets/img/DefaultPerson.png")}/>
                <SettingTextInputKdr value={profile?.user?.Name} error={errors?.user?.Name} onChangeText={(text) => {
                    setProfile({
                        ...profile, user: {
                            ...profile.user,
                            Name: text
                        }
                    });
                }} placeholder={"Name"}/>
                <SettingTextInputKdr value={profile?.user?.username} editable={false} placeholder={"username"}/>
                <SettingTextInputKdr value={profile?.user?.email} placeholder={"email"} editable={false}
                                     textStyle={{color: COLOR.gray_1000}}/>
                <SettingTextInputKdr value={profile?.user?.phone} error={errors?.user?.phone} onChangeText={(text) => {
                    setProfile({
                        ...profile, user: {
                            ...profile.user,
                            phone: text
                        }
                    });
                }} placeholder={"phone"}/>

                <SettingTextInputKdr value={profile?.business_name}
                                     error={errors?.business_name}
                                     onChangeText={(text) => {
                    setProfile({
                        ...profile, business_name: text
                    });
                }} placeholder={"business name"}/>
                <SettingTextInputKdr
                style={{backgroundColor:COLOR.gray_500}}
                value={profile?.category?.title}

underlineColorAndroid='transparent'
editable={false}
selectTextOnFocus={false}
                 placeholder={"Business category"}/>
                <SettingTextInputKdr
                style={{backgroundColor:COLOR.gray_500}}
                value={profile?.sub_category?.title}

underlineColorAndroid='transparent'
editable={false}
selectTextOnFocus={false}
                 placeholder={"Sub category"}/>
                    <View style={[styles.address]}>
                  
                    <SettingLocationKdr containerStyle={{marginTop: 40}} error={errors.address} label={"Address"}
                                  placeholder={"Street name"}
                                  value={profile?.user?.address.address}
                                  multiline={true}
                                  underlineColorAndroid='transparent'
onPress={()=>setShow(true)}
                            
                    />
                    <UserLocation show={show} setShow={setShow}
                     values={{show,setShow,location:profile?.user?.address.address,setLocation:updateAddress}}/>

                    <SettingTextInputKdr containerStyle={{marginTop: 3}} error={errors.city} label={""}
                                  placeholder={"City (Optional)"}
                                  underlineColorAndroid='transparent'
                                  value={profile?.user?.address.city}
                                  onChangeText={(text) => {
                                    setProfile({
                                        ...profile, user: {
                                            ...profile.user,
                                            address: {
                                                ...profile.user.address,
                                                city:text
                                            }
                                        }
                                    });
                                }}
                           
                    />
                    <SettingTextInputKdr containerStyle={{marginTop: 3}} error={errors.state} label={""}
                                  placeholder={"State"}
                                  underlineColorAndroid='transparent'
                                  value={profile?.user?.address.state}
                                  onChangeText={(text) => {
                                    setProfile({
                                        ...profile, user: {
                                            ...profile.user,
                                            address: {
                                                ...profile.user.address,
                                                state:text
                                            }
                                        }
                                    });
                                }}
                           
                    />
                    <SettingTextInputKdr containerStyle={{marginTop: 3}} error={errors.country} label={""}
                                  placeholder={"Country"}
                                  value={profile?.user?.address.country}
                                  underlineColorAndroid='transparent'
                                  onChangeText={(text) => {
                                    setProfile({
                                        ...profile, user: {
                                            ...profile.user,
                                            address: {
                                                ...profile.user.address,
                                                country:text
                                            }
                                        }
                                    });
                                }}
                           
                    />
                    <SettingTextInputKdr containerStyle={{marginTop: 3}} error={errors.post_code} label={""}
                                  placeholder={"Postal Code (Optional)"}
                                  underlineColorAndroid='transparent'
                                  value={profile?.user?.address.post_code}
                                  onChangeText={(text) => {
                                    setProfile({
                                        ...profile, user: {
                                            ...profile.user,
                                            address: {
                                                ...profile.user.address,
                                                post_code:text
                                            }
                                        }
                                    });
                                }}
                              
                    />
                </View>
                     {
                    profile.user?.address?.latitude && profile.user?.address?.longitude ?
                        <MapLocationComponent
                            Latitude={profile.user.address.latitude}
                            Longitude={profile.user.address.longitude}
                            style={[{width: "100%", borderRadius: 15}]}
                        />:
                        null
                }
                  <TextKdr style={[HEADINGS.H3, MARGINS.v14]}>
                    Social media profiles
                </TextKdr>
                <SettingTextInputKdr value={profile?.social_media_accounts?.facebook} onChangeText={(text) => {
                    setProfile({
                        ...profile, social_media_accounts: {
                            ...profile.social_media_accounts,
                            facebook: text
                        }
                    });
                }} placeholder={"facebook"} rightIcon={<FontAwesome name="pencil-square" size={27} color="gray"/>}/>
                <SettingTextInputKdr value={profile?.social_media_accounts?.instagram} onChangeText={(text) => {
                    setProfile({
                        ...profile, social_media_accounts: {
                            ...profile.social_media_accounts,
                            instagram: text
                        }
                    });
                }} placeholder={"instagram"} rightIcon={<FontAwesome name="pencil-square" size={27} color="gray"/>}/>
                <SettingTextInputKdr value={profile?.social_media_accounts?.twitter} onChangeText={(text) => {
                    setProfile({
                        ...profile, social_media_accounts: {
                            ...profile.social_media_accounts,
                            twitter: text
                        }
                    });
                }} placeholder={"twitter"} rightIcon={<FontAwesome name="pencil-square" size={27} color="gray"/>}/>
                <SettingTextInputKdr value={profile?.social_media_accounts?.tiktok} onChangeText={(text) => {
                    setProfile({
                        ...profile, social_media_accounts: {
                            ...profile.social_media_accounts,
                            tiktok: text
                        }
                    });
                }} placeholder={"tiktok"} rightIcon={<FontAwesome name="pencil-square" size={27} color="gray"/>}/>


                <TextKdr style={[MARGINS.v14]}>
                    Licence / Registration
                </TextKdr>
                {
                    profile?.licenses?.length > 0 ? profile?.licenses?.map((item, index) => {
                        return(
                            <UploadDocument key={item.id} title={`business-licence ${index+1}`} onPressDelete={()=>{
                                deleteDocument(item)
                            }}/>
                        )
                    }) : <></>
                }
                <DocumentButton placeholder={"Upload another"} style={{}} onPress={uploadDocument}/>
                <ButtonKdr text={buttonText} onPress={updateUserProfile} style={[MARGINS.v14, PADDINGS.v6]}/>
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});