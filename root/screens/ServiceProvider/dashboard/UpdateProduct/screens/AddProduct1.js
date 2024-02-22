import {StyleSheet, View, ScrollView, Pressable} from "react-native";
import TitleBar from "../../../../../components/TitleBar/TitleBar";
import COLOR from "../../../../../Styles/Color";
import SettingTextInputKdr from "../../../../../components/Input/Settings/SettingTextInputKdr";
import DropDownInputKdrMaterial from "../../../../../components/Input/Settings/DropDownInputKdrMaterial";
import ToggleSwitch from 'toggle-switch-react-native'
import React, {useCallback, useContext, useEffect, useState} from "react";
import MARGINS from "../../../../../Styles/MARGIN";
import HEADINGS from "../../../../../Styles/heading";
import ButtonKdr from "../../../../../components/Button/Buttonkdr";
import SessionContext from "../../../../../context/Session/session";
import Urls from "../../../../../other/Urls";
import Toast from "react-native-toast-message";
import {LoadingContext} from "../../../../../context/modal/LoadingContext";
import { useFocusEffect } from "@react-navigation/native";

export default function AddProduct1({navigation, ...props}) {
    const countries = ["Egypt", "Canada", "Australia", "Ireland"]
    const formData=props.route.params
    const [form, setForm] = React.useState({
        allowDiscount: formData.allowDiscount,
        isHomeService: formData.isHomeService,
        title: formData.title,
        details: formData.details,
        price: String(formData.price),
        discount: String(formData.discount)

    })
    const loading = useContext(LoadingContext);
    const session = useContext(SessionContext)
    const showToast = (type,txt1,txt2) => {
        Toast.show({
            type: type,
            text1: txt1,
            text2: txt2,
        });

    }






    let handleContinue = () => {
        let flag = true
        loading.show()
        for(let item in form){
            if(form[item] === ""){
                if(item==="discount" && form.allowDiscount === false){
                    console.log("discount Not allowed")


                }
                else{
                    flag = false
                }
            }
        }
        setTimeout(() => {
            if(!flag){
                showToast("error","Error","Please fill all fields")
                loading.close()
            }
            else{
                loading.close()
                form.categoryID=form?.categoryID|| profile?.category?.id
                form.sub_categoryID= form.sub_categoryID|| profile?.sub_category?.id
                navigation.navigate("UpdateProduct2", {form: form,params:formData})
            }

        }, 500)


    }

    const [profile, setProfile] = useState({});
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
        }).finally(() => {
            loading.close();
        })

    }, [])
    return (
        <View style={[styles.container]}>
            <TitleBar navigation={navigation} title={"Update a Product / Service"}/>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.contentContainer]}>
                <SettingTextInputKdr style={{marginTop: 40}}
                                     placeholder={"Service Name"}
                                        value={form.title}
                                     onChangeText={(text) => {
                                         let temp = {...form}
                                            temp.title = text
                                            setForm(temp)
                                     }}
                />
          
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

                <SettingTextInputKdr
                    textStyle={[{minHeight: 120, maxHeight: 180, textAlignVertical: "top", marginTop: 5}]}
                    multiline={true}
                    placeholder={"Service Details"}
                    value={form.details}
                    onChangeText={(text) => {
                        let temp = {...form}
                        temp.details = text
                        setForm(temp)
                    }}
                />
                <SettingTextInputKdr
                    style={{marginTop: 5}}
                    placeholder={"Price (£)"}
                    value={form.price}
                    keyboardType="numeric"
                    onChangeText={(text) => {
                        let temp = {...form}
                        temp.price =  text.replace(/[^0-9.]/g, "")
                        setForm(temp)

                    }}
                />
                <ToggleSwitch
                    isOn={form.allowDiscount}
                    onColor={COLOR.black}
                    offColor={COLOR.gray_800}
                    label="Allow discount"
                    labelStyle={[{color: "black", fontWeight: "900", flex: 1}, MARGINS.v16, HEADINGS.p]}
                    size="medium"
                    onToggle={isOn => setForm({
                        ...form,
                        allowDiscount: isOn
                    })}
                />
                <SettingTextInputKdr
                    placeholder={"mention percentage (%)"}
                    editable={form.allowDiscount}
                    value={form.discount}
                    keyboardType="numeric"
                    onChangeText={(text) => {
                        let temp = {...form}
                        temp.discount =  text.replace(/[^0-9.]/g, "")
                        setForm(temp)
                    }}
                />
                <ToggleSwitch
                    isOn={form.isHomeService}
                    onColor={COLOR.black}
                    offColor={COLOR.gray_800}
                    label="Provide home service"
                    labelStyle={[{color: "black", fontWeight: "900", flex: 1}, MARGINS.v16, HEADINGS.p]}
                    size="medium"
                    onToggle={isOn => setForm({
                        ...form,
                        isHomeService: isOn
                    })}
                />

                <ButtonKdr text={"Continue"} style={[MARGINS.v16]} onPress={()=>{
                    handleContinue()
                }} />
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.backgroundColor
    },
    contentContainer: {
        padding: 20,
    }
});