import {useContext, useState} from "react";
import SessionContext from "../../../../../context/Session/session";
import {LoadingContext} from "../../../../../context/modal/LoadingContext";
import {StyleSheet, View} from "react-native";
import TitleBar from "../../../../../components/TitleBar/TitleBar";
import {ScrollView} from "react-native-gesture-handler";
import ChangeDpComponent from "../../../../../components/dp/ChangeDpComponent";
import MARGINS from "../../../../../Styles/MARGIN";
import {getUrl} from "../../../../../other/raw";
import SettingTextInputKdr from "../../../../../components/Input/Settings/SettingTextInputKdr";
import COLOR from "../../../../../Styles/Color";
import ButtonKdr from "../../../../../components/Button/Buttonkdr";
import PADDINGS from "../../../../../Styles/PADDINGS";
import {PicImage, UploadImage} from "../../../../../API/USER/ProfileSetting";
import Toast from "react-native-toast-message";
import Urls from "../../../../../other/Urls";

export default function SpUserProfile({navigation, ...props}) {
    const session = useContext(SessionContext);
    const loading = useContext(LoadingContext);
    const [profile, setProfile] = useState(session.session.profile);
    console.log(profile)

    let updateUserProfile = () => {
        loading.show()
        //pop email and username from profile
        let temp = {...profile};
        delete temp.email;
        delete temp.username;
        let data = {
            user:{...temp}
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
                })
                Toast.show({
                    type: 'error',
                    text1: 'Error while updating profile',
                    text2: 'Please check your input and try again',
                });
            }
            loading.close();
        }).catch((e) => {
            loading.close();
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Something went wrong',
            })
        })
    }
    let SelectProfileImage = () => {
        PicImage().then((response) => {
            let uri = response.assets[0].uri;
            loading.show();
            UploadImage(session.session.token, uri).then((response) => {
                loading.close();
                setProfile({...profile, dp: response.id, DP: response});
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
    return (
        <View style={[styles.container]}>
            <TitleBar title="Service Provder Profile" navigation={navigation}/>
            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 20,
                    marginTop: 20,
                    paddingBottom: 30,
                }}
            >
                <ChangeDpComponent onPress={SelectProfileImage} navigation={navigation} style={[MARGINS.v14]}
                                   source={profile.dp ? getUrl(profile?.DP?.file) : require("../../../../../../assets/img/DefaultPerson.png")}/>
                <SettingTextInputKdr placeholder={"Name"}
                                     onChangeText={(text) => {
                                         setProfile({...profile, Name: text});
                                     }}
                                     value={profile.Name}
                />
                <SettingTextInputKdr placeholder={"username"}
                                     value={profile.username}
                                     editable={false}
                                     textStyle={{color: COLOR.gray_1000}}
                />
                <SettingTextInputKdr placeholder={"email"}
                                     value={profile.email}
                                     editable={false}
                                     textStyle={{color: COLOR.gray_1000}}
                />
                <SettingTextInputKdr placeholder={"phone"}
                                     onChangeText={(text) => {
                                         setProfile({...profile, phone: text});
                                     }}
                                     value={profile.phone}

                />
                <SettingTextInputKdr placeholder={"address"}
                                     onChangeText={(text) => {
                                         setProfile({
                                             ...profile,
                                             address: {
                                                 address: text
                                             }
                                         });
                                     }}
                                     value={profile.address.address}

                />

                <ButtonKdr text={"Update Info"} onPress={updateUserProfile} style={[MARGINS.v14, PADDINGS.v6]}/>
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});