import {StyleSheet, View} from "react-native";
import TitleBar from "../../../../../components/TitleBar/TitleBar";
import ChangeDpComponent from "../../../../../components/dp/ChangeDpComponent";
import MARGINS from "../../../../../Styles/MARGIN";
import SettingTextInputKdr from "../../../../../components/Input/Settings/SettingTextInputKdr";
import {ScrollView} from "react-native-gesture-handler";
import ButtonKdr from "../../../../../components/Button/Buttonkdr";
import PADDINGS from "../../../../../Styles/PADDINGS";
import SessionContext from "../../../../../context/Session/session";
import {useContext, useState} from "react";
import COLOR from "../../../../../Styles/Color";
import {getUrl} from "../../../../../other/raw";
import {LoadingContext} from "../../../../../context/modal/LoadingContext";
import UpdateProfile, {PicImage, UploadImage} from "../../../../../API/USER/ProfileSetting";
import Toast from "react-native-toast-message";

const IMAGE_SIZE = 100;

export default function UserProfile({navigation, ...props}) {
    const session = useContext(SessionContext);
    const loading = useContext(LoadingContext);
    const [profile, setProfile] = useState(session.session.profile);
    const [error, setError] = useState(null);


    const Submit = () => {
        loading.show();
        setError(null);
        UpdateProfile(session.session.token, {
            ...profile,
        }).then((response) => {
            if (response.status <= 200) {
                console.log(response.data,"resp");
                session.setSession({...session.session, profile: response.data});
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Profile Updated',
                })
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Invalid',
                    text2: 'Please check your input',
                });
                setError(response.data)
            }
            loading.close();

        }).catch((e) => {
            loading.close();
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Something went wrong',
            })
        });
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
            <TitleBar title="User Profile" navigation={navigation}/>
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
                                     error={error?.Name}
                                     value={profile.Name}
                />
                <SettingTextInputKdr placeholder={"username"}
                                     value={profile.username}
                                     editable={false}
                                     error={error?.username}
                                     textStyle={{color: COLOR.gray_1000}}
                />
                <SettingTextInputKdr placeholder={"email"}
                                     value={profile.email}
                                     editable={false}
                                     error={error?.email}
                                     textStyle={{color: COLOR.gray_1000}}
                />
                <SettingTextInputKdr placeholder={"phone"}
                                     onChangeText={(text) => {
                                         setProfile({...profile, phone: text});
                                     }}
                                     keyboardType={"phone-pad"}
                                     error={error?.phone}
                                     value={profile.phone}

                />
                <SettingTextInputKdr placeholder={"address"}
                                     error={error?.address?.address}
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

                <ButtonKdr text={"Update Info"} onPress={Submit} style={[MARGINS.v14, PADDINGS.v6]}/>
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});