import {Entypo, FontAwesome, Ionicons, MaterialIcons} from "@expo/vector-icons";
import { Alert, Linking } from "react-native";
import API_URLS from "../../../../../API/USER/URLS";
import Urls from "../../../../../other/Urls";
import axios from "axios";
import Toast from "react-native-toast-message";
import LogoutAPI from "../../../../../API/COMMON/Logout";
import { useEffect, useState } from "react";
import messaging from '@react-native-firebase/messaging';


export default function settingNavigationData(navigation,session) {
    const [deviceToken, setDeviceToken] = useState(null)
    const handleDeleteAccount = () => {
        // Display a confirmation alert
        Alert.alert(
            'Confirm Deletion',
            'Are you sure you want to delete your account?',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Delete',
                onPress: async() => {
                    return new Promise((resolve, reject) => {
                        fetch(API_URLS.service_provider_delete,
                            {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': 'token ' + session.session.token
                                }
                            }).then((response) => {
                                console.log(response.status);
                            if (response.status = 204) {
                                session.clearSession();
                                navigation.reset({
                                    index: 0,
                                    routes: [{name: "WelcomeScreen"}],
                                });
                                response.json().then((data) => {
                                    console.log(data)
                                    // setProfile(data);
                                    Toast.show({
                                        type: 'success',
                                        text1: 'account deleted successfully'
                                    });
                                })
                            } else {
                                response.json().then((data) => {
                                    console.log(data)
                                })
                                Toast.show({
                                    type: 'error',
                                    text1: 'Error while deleting account',
                                    text2: 'Please Try Again',
                                });
                            }
                        }).catch((e) => {
                            Toast.show({
                                type: 'error',
                                text1: 'Network Error',
                                text2: 'Please Try Again',
                            });
                        })
                
                    })
                },
                style: 'destructive',
                // Add a custom style to change the text color to red
                textStyle: { color: 'red' },
              },
            ],
            { cancelable: true }
          );
        
      };
      const handlerRate = () => {
        let appStoreUrl = '';
        if (Platform.OS === 'android') {
            appStoreUrl = 'https://play.google.com/store/apps/details?id=com.lunatech1.kdr&hl=en&gl=US'
          } else if (Platform.OS === 'ios') {
            // Replace 'your-ios-app-id' with the actual iOS app ID
            console.log('rate this app ios')
            appStoreUrl = 'https://apps.apple.com/pk/app/kdr/id6459108320'
            
          }
      
        Linking.openURL(appStoreUrl)
          .then(() => {
            // Handle success (the app store page opened successfully)
          })
          .catch((error) => {
            console.error('Could not open app store:', error);
          });
      };

      const getDeviceToken = async () => {
        const token = await messaging().getToken();
        console.log("device token", token);
        setDeviceToken(token);
        return token;
        };

        useEffect(() => {
            getDeviceToken();
        }, []);


        const callLogOutAPI = () => {

            if(deviceToken !== null && deviceToken !== undefined){
                const formData = new FormData();
                formData.append('deviceToken', deviceToken);
                LogoutAPI(session?.session?.token, formData).then((res) => {
                    console.log("logout response", res);
                }
                ).catch((e) => {
                    console.log("logout error", e);
                })
            }

        }


    return {
        "Account": {
            screens: [
                {
                    title: "Business Settings",
                    description: "Personal info",
                    icon: <Ionicons name="md-person-outline" size={24} color="black"/>,
                    screenName: "SpBusinessProfile",
                    metaDescription: ""
                },
                {
                    title: "Plans",
                    description: "Check your plan",
                    icon: <FontAwesome name="opencart" size={18} color={"black"}/>,
                    screenName: "Plans",
                    metaDescription: ""
                },
            ]
        },
        // "General settings": {
        //     screens: [
        //         {
        //             title: "Language",
        //             description: "",
        //             icon: <Entypo name="language" size={24} color="black"/>,
        //             metaDescription: "english",
        //         },
        //         {
        //             title: "Notifications",
        //             description: "",
        //             icon: <Ionicons name="notifications-outline" size={24} color="black"/>,
        //             metaDescription: "on",
        //         }
        //
        //     ]
        // },
        "Privacy & Terms": {
            screens: [
                {
                    title: "Terms Of Service",
                    description: "",
                    icon: <Ionicons name="document-text-outline" size={24} color="black"/>,
                    metaDescription: "",
                    screenName: "TermsOfService"

                },
                {
                    title: "Privacy Policy",
                    description: "",
                    icon: <Ionicons name="document-text-outline" size={24} color="black"/>,
                    metaDescription: "",
                    screenName: "PrivacyPolicy"
                }
            ]
        },
        "Support and Info": {
            screens: [
                {
                    title: "Help & Support",
                    description: "",
                    icon: <Ionicons name="information-circle-outline" size={24} color="black"/>,
                    metaDescription: "",
                    screenName: "HelpAndSupport"

                }, {
                    title: "FAQ",
                    description: "",
                    icon: <Ionicons name="help-circle-outline" size={24} color="black"/>,
                    metaDescription: "",
                    screenName: "FAQ"
                },
                {
                    title: "Promotions",
                    description: "",
                    icon: <MaterialIcons name="local-offer" size={24} color="black"/>,
                    metaDescription: "",
                    screenName: "AllPromotions"
                    
                },
                {
                    title: "Feedback",
                    description: "",
                    icon: <Ionicons name="help-circle-outline" size={24} color="black"/>,
                    metaDescription: "",
                    screenName: "Feedback"
                },
                {
                    title: "Rate the app",
                    description: "",
                    icon: <Ionicons name="help-circle-outline" size={24} color="black"/>,
                    metaDescription: "",
                    onPress:handlerRate
                }
            ]

        },
        "Service Settings": {
            screens: [
                {
                    title: "My Orders",
                    description: "",
                    icon: <FontAwesome name="opencart" size={18} color={"black"}/>,
                    metaDescription: "",
                    screenName: "Orders"
                },

            ]
        },
        "Other Settings": {
            screens: [
                {
                    title: "Invite Friends",
                    description: "",
                    icon: <Ionicons name="person-add-outline" size={24} color="black"/>,
                    metaDescription: "",
                    screenName: "InviteFriends"
                },
                {
                    title: "Delete Account",
                    description: "",
                    icon: <Ionicons name="trash" size={24} color="black"/>,
                    metaDescription: "",
                    onPress:handleDeleteAccount

                },
                {
                    title: "Logout",
                    description: "",
                    icon: <Ionicons name="log-out-outline" size={24} color="black"/>,
                    metaDescription: "",
                    onPress:() => {
                        callLogOutAPI();
                        session.clearSession();
                        navigation.reset({
                            index: 0,
                            routes: [{name: "WelcomeScreen"}],
                        });

                    }

                }
            ]
        }
    }
}

function SettingToArray(data) {
    console.log("data in setting array::>>",data);
    let array = [];
    for (let key in data) {
        console.log(key);
        array.push({
            title: key,
            isTitle: true,
        })
        for (let i = 0; i < data[key].screens.length; i++) {
            array.push({
                ...data[key].screens[i],
                isTitle: false,
            });
        }

    }
    return array;
}

export {SettingToArray};