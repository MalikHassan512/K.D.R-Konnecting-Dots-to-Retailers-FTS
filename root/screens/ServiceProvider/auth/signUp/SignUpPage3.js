import {StyleSheet, View, ScrollView, Pressable} from "react-native";
import TitleBar from "../../../../components/TitleBar/TitleBar";
import React, {useContext, useEffect, useState} from "react";
import TextInputKdr from "../../../../components/Input";
import PADDING from "../../../../Styles/PADDINGS";
import RoundedInputBase from "../../../../components/Input/RoundedInputBase";
import COLOR from "../../../../Styles/Color";
import TextKdr from "../../../../components/Text";
import {TermAndCondition} from "../../../User/auth/signUp/signUp";
import ButtonKdr from "../../../../components/Button/Buttonkdr";
import MARGINS from "../../../../Styles/MARGIN";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from 'expo-document-picker';
import mime, { load } from "mime";
import Toast from "react-native-toast-message";
import Urls from "../../../../other/Urls";
import DropDownInputKdrMaterial from "../../../../components/Input/Settings/DropDownInputKdrMaterial";
import { LoadingContext } from "../../../../context/modal/LoadingContext";


function DocumentButton({onPress, placeholder, ...props}) {

    return (
        <Pressable onPress={onPress}>
            <RoundedInputBase {...props} >
                <TextKdr style={[PADDING.v10, {color: COLOR.gray_700, flex: 1, textAlign: "center"}]}>
                    {placeholder}
                </TextKdr>
            </RoundedInputBase>
        </Pressable>
    )
}
function UploadedDocumentButton({onPress, placeholder, ...props}) {

    return (
        <Pressable onPress={onPress}>
            <RoundedInputBase {...props} >
                <TextKdr style={[PADDING.v10, {color: COLOR.gray_700, flex: 1, textAlign: "center"}]}>
                    {placeholder}
                </TextKdr>
            </RoundedInputBase>
        </Pressable>
    )
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
        return result.assets[0];
    }

}

export default function SignUpPage3({navigation, ...props}) {
    const[buttonText,setButtonText] = React.useState("Register as Service Provider")
    const [form, setForm] = useState({
        businessName: "",
        categoryID:"",
        sub_categoryID:"",
        licensesID: [],
        agreeForNewsUpdate: false,
    })

    
      
    const showToast = (type,txt1,txt2) => {
        Toast.show({
            type: type,
            text1: txt1,
            text2: txt2,
        });

    }
    const [licenses, setLicenses] = useState([])
    let uploadFile = async (file) => {
        //check if file is already uploaded
        // media array has object {file,id} check if file object is in media array
        if(licenses.includes(file)) {
            showToast("error","This document is already added","")
            return null
        }
        setButtonText("Uploading...")
        let data = new FormData();
        let uploadingFile = {
            name: file.uri.split("/").pop(),
            type: mime.getType(file.uri),
            uri: file.uri
        }
        console.log(uploadingFile)
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
                if (response.id) {
                    setForm({
                        ...form,
                        licensesID: [...form.licensesID, response.id],
                    })
                    showToast("success", "Media uploaded", "")
                    // setMedia([...media, file])
                    setButtonText("Register as Service Provider")
                    setLicenses([...licenses, {file: file, id: response.id}])
                } else {
                    showToast("error", "Error while uploading media", "")
                    setButtonText("Register as Service Provider")
                    return null
                }
            })
            .catch((error) => {
                console.log(error.message)
                showToast("error", "Error while uploading media", "")
                setButtonText("Register as Service Provider")
            })

    }
    let prevForm = props.route.params.form;
    console.log(prevForm)
    let defaultError = {
        businessName: "",
        businessCategory: "",
    }
    const[error,setError] = useState(defaultError)
    useEffect(
        () => {
            console.log(form)
        },[form]
    )
    
    let handleSubmission = () => {
        if(buttonText === "Uploading...") {
            showToast("error","Please wait while we upload your documents","")
            return null
        }
        setError(defaultError)

        if(form.licensesID.length === 0) {
            showToast("error","Please upload at least one document","")
            return null
        }
        let errors = defaultError;
        if(form.businessName === "") {
            errors.businessName = "Business Name is required"
            
        }
   
        if(errors.businessName !== "") {
            setError(errors)
            return null
        }
        if(form?.categoryID=== "") {
           return showToast("error","Category is required","") 
        }
        if(form?.sub_categoryID === "") {
         return   showToast("error","Sub Category is required","")
        }

        if(!form.agreeForNewsUpdate){
            showToast("error","Please agree to the terms and conditions","")
            return null
        }
        let data = {
            user:{
                Name:prevForm.Name,
                email:prevForm.email,
                password:prevForm.password,
                username:prevForm.username,
                phone:prevForm.phone,
                address:prevForm.address,
                roles:"SERVICE_PROVIDER",
                dob:prevForm.dob,
            },
            business_name:form.businessName,
            category:form.categoryID,
            sub_category:form.sub_categoryID,
            licensesID:form.licensesID,
            social_media_accounts:prevForm.social_media_accounts,
            is_verified:true,
        }
        console.log(data,"data....")
        loading.show()
        fetch(Urls.serviceProvidersCreate,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then((response) => response.json())
            .then((response) => {
                if(response.id) {
                    showToast("success","Account created successfully","")
                    navigation.reset(
                        {
                            index: 0,
                            routes: [{name: "SignUpComplete"}]
                        }
                    );
                } else {
                    console.log(response)
                    showToast("error","Error while creating account","")
                }
            }

        ).catch((err)=>{
            showToast("error","Error while creating account","")
        }).finally(() => {
            loading.close();
        })


    }

    const [data, setData] = React.useState([])
    const [categories, setCategories] = React.useState([])
    const [selectedCategory, setSelectedCategory] = React.useState("")
    const [subCategories, setSubCategories] = React.useState([])
    const [selectedSubCategory, setSelectedSubCategory] = React.useState("")
    const loading = useContext(LoadingContext);
    
    useEffect(() => {
        let cats = data.map((item) => {
             return item.title
         })
         setCategories(cats)
     },[data])
     useEffect(() => {
     //    get sub categories for selected category
         setSelectedSubCategory("")
 
         let cat = data.filter((item) => {
             return item.title === selectedCategory
         })
         if (cat.length > 0) {
             let subs = cat[0].sub_categories.map((item) => {
                 return item.title
             })
             setSubCategories(subs)
         }
     },[selectedCategory])
     useEffect(() => {
         for(let item in data){
             if(data[item].title === selectedCategory){
                 for(let sub in data[item].sub_categories){
                     if(data[item].sub_categories[sub].title === selectedSubCategory){
                         setForm({
                             ...form,
                             categoryID: data[item].id,
                             sub_categoryID: data[item].sub_categories[sub].id
                         })
 
 
                     }
                 }
             }
 
         }
     },[selectedSubCategory])
     let getCats = async () => {
         let options = {
             method: 'GET',
             headers: {
                 'Content-Type': 'application/json'
             }
 
         }
         loading.show()
         fetch(Urls.getCategories, options).then(res => res.json()).then(res => {
             setData(res.results)
         }
         ).catch(err => {
             console.log(err)
         }).finally(() => {
            loading.close();
        })
     }
     useEffect(() => {
         // Return the function to unsubscribe from the event so it gets removed on unmount
         return navigation.addListener('focus', () => {
             getCats()
         });
     }, [navigation]);
    return (
        <View style={[styles.container]}>
            <TitleBar title={"Business Information"} navigation={navigation}/>
            <ScrollView style={[styles.contentContainer, PADDING.H20]}>
                <TextInputKdr containerStyle={{marginTop: 40}} error={""} label={"Business Name"}
                              placeholder={"Enter business name here"}
                              value={form.businessName}
                              onChangeText={(e) => {
                                  setForm({
                                      ...form,
                                      businessName: e,
                                  })
                              }}
                />
             
     <Pressable onPress={()=>{
                    if(categories.length === 0)
                    {
                        getCats()
                    }

                }}>
                    <DropDownInputKdrMaterial style={{marginTop: 5}}
                                              label={"Category"} data={categories}
                                              setValue={setSelectedCategory}
                                              value={selectedCategory}

                    />
                </Pressable>
                <DropDownInputKdrMaterial style={{marginTop: 5}}
                                          label={"Sub category"} data={subCategories}
                                            setValue={setSelectedSubCategory}
                                            value={selectedSubCategory}

                />
                {
                    form.licensesID.map((e, i) => {
                        return (
                            <UploadedDocumentButton
                                                    placeholder={"Document " + parseInt(i+1)}
                                                    outlineStyle={{borderStyle: "dotted"}}
                                                    containerStyle={{marginTop: 0}}
                            />
                        )
                    })
                }

                <DocumentButton onPress={() => {
                    uploadDocument().then((e) => {
                        if (e) {
                            uploadFile(e)
                        }
                    })
                }}
                                placeholder={"Upload License Document"}
                                outlineStyle={{borderStyle: "dotted"}}
                                containerStyle={{marginTop: 0}}
                />

                <TermAndCondition form={form} setForm={setForm}/>
                <ButtonKdr onPress={() => {
                    handleSubmission()
                }}
                           style={[MARGINS.v28]}
                           text={buttonText}
                />
                <View style={[styles.forget, {marginTop: 15}]}>
                    <Pressable onPress={()=>{
                        navigation.navigate("ServiceProviderAuthEntry", {
                            screen: "ServiceProviderLogin",
                            index: 0,
                        })
                    }} style={[styles.TermAndConditions]}>
                        <TextKdr>
                            Already have an account?
                        </TextKdr>
                        <TextKdr style={{fontWeight: "bold", marginStart: 5,color:COLOR.primary}}>
                            Login Now
                        </TextKdr>
                    </Pressable>
                </View>
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {},
    forget: {
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 15,
    },
    TermAndConditions: {
        flex: 1,
        flexDirection: "row",
        textAlign: "left",
        fontSize: 12,
        marginStart: 10,
        justifyContent: "center",
        alignItems: "center"
    },
});