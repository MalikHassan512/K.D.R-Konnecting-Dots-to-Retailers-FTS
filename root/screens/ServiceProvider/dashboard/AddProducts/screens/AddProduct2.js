import {StyleSheet, View, ScrollView, Pressable, Image, Dimensions} from "react-native";
import COLOR from "../../../../../Styles/Color";
import TitleBar from "../../../../../components/TitleBar/TitleBar";
import React, {useContext, useEffect} from "react";
import {Card} from "../../../../../Styles/ComponentStyling/KDRMaterial";
import FLEX_STYLE from "../../../../../Styles/FLEXSTYLE";
import {MaterialIcons} from "@expo/vector-icons";
import TextKdr from "../../../../../components/Text";
import HEADINGS from "../../../../../Styles/heading";
import MARGINS from "../../../../../Styles/MARGIN";
import RoundButtonKdr from "../../../../../components/Button/roundButton";
import ButtonKdr from "../../../../../components/Button/Buttonkdr";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import Urls from "../../../../../other/Urls";
import SessionContext from "../../../../../context/Session/session";
import mime from "mime";


function MediaButton({children, title, ...props}) {
    return (
        <Pressable style={[Card(), styles.button, FLEX_STYLE.center, props.style]} {...props}>
            {children}
            <TextKdr style={[HEADINGS.H3, MARGINS.v16, {color: COLOR.gray_800}]}>{title}</TextKdr>
        </Pressable>
    )
}



export default function AddProduct2({navigation, ...props}) {
    const[buttonText,setButtonText] = React.useState("Continue")

    function UploadFile({source, ...props}) {
        const width = Dimensions.get("window").width;
        const size = width / 4;
        const [hidden, setHidden] = React.useState(false)
        let show = () => {
            setHidden(true)
            setTimeout(() => {
                setHidden(false)
            }, 1500)
        };
        return (
            <Pressable onPress={show} style={[Card(), MARGINS.v10, {
                width: size,
                height: size,
                borderRadius: size / 2
            }, FLEX_STYLE.center]}>
                <Image source={source} style={[{width: size, height: size, borderRadius: size / 2}, props.style]}/>
                {hidden ? <View style={[FLEX_STYLE.rowCenter, FLEX_STYLE.center]}>
                    <RoundButtonKdr ButtonSize={30} onPress={() => {
                    //    remove media from array
                        let index = mediaID.indexOf(props.id);
                        if (index > -1) {
                            mediaID.splice(index, 1);
                            setMediaID([...mediaID])
                        }
                        let newMedia = media.filter((item) => {
                            return item.id !== props.id
                        })
                        setMedia(newMedia)
                    }}
                                    style={{borderWidth: 0, marginTop: 35, backgroundColor: COLOR.gray_500}}>
                        <MaterialIcons name="delete" size={15} color={COLOR.primary}/>
                    </RoundButtonKdr>
                </View> : null}
            </Pressable>
        )
    }

    const showToast = (type,txt1,txt2) => {
        Toast.show({
            type: type,
            text1: txt1,
            text2: txt2,
        });

    }
    const [media, setMedia] = React.useState([]);
    const session = useContext(SessionContext)
    const [mediaID, setMediaID] = React.useState([]);
    let uploadFile = async (file) => {
        //check if file is already uploaded
        // media array has object {file,id} check if file object is in media array
        if(media.includes(file)) {
            showToast("error","This media is already added","")
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
                    'Authorization': 'Token ' + session.session.token

                },
                body: data
            })
            .then((response) => response.json())
            .then((response) => {
                console.log(response)
                if (response.id) {
                    setMediaID([...mediaID, response.id])
                    showToast("success", "Media uploaded", "")
                    // setMedia([...media, file])
                    setButtonText("Continue")
                    setMedia([...media,{file:file,id:response.id}])
                } else {
                    showToast("error", "Error while uploading media", "")
                    setButtonText("Continue")
                    return null
                }
            })
            .catch((error) => {
                console.log(error.message)
                showToast("error", "Error while uploading media", "")
                setButtonText("Continue")
            })


    }
    useEffect(() => {
        console.log(mediaID)
    },[mediaID])
    useEffect(() => {
        console.log(media)
    },[media])
    const useCamera = async () => {

        // No permissions request is necessary for launching the image library
        let permission = await ImagePicker.requestCameraPermissionsAsync();
        console.log("-------------------------" + permission)
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.6,
        });

        console.log(result);

        if (!result.canceled) {
            console.log(result.assets[0].uri)
            //    check if uri is in media array
            if (media.includes(result.assets[0])) {
                showToast("error", "This media is already added", "")
            } else {

                uploadFile(result.assets[0])

            }

        }
    };
    const pickMedia = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.6,
        });

        console.log(result);

        if (!result.canceled) {
            console.log(result.assets[0].uri)
            //    check if uri is in media array
            if (media.includes(result.assets[0])) {
                showToast("error", "This media is already added", "")
            } else {
                uploadFile(result.assets[0])

            }
        }
    }
    let validate=()=>{
        if(media.length===0){
            showToast("error","Please add at least one picture","")
            return false
        }
        return true
    }
    let handleContinue = ()=>{
        if(buttonText==="Continue"){
            if(validate()){
                let data = props.route.params.form
                data.mediaID = mediaID
                navigation.navigate("AddProduct3",{form:data})
            }
        }else{
            showToast("error","Please wait while media is being uploaded","")
        }
    }

    return (
        <View style={[styles.container]}>
            <TitleBar navigation={navigation} title={"Add a Product / Service"}/>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.contentContainer]}>
                <TextKdr style={[HEADINGS.H2, MARGINS.v22]}>Add Media (photos / videos)</TextKdr>
                <View style={[FLEX_STYLE.row]}>
                    <MediaButton onPress={useCamera} title={"Use Camera"}>
                        <MaterialIcons name="camera-alt" size={30} color={COLOR.gray_800}/>
                    </MediaButton>
                    <MediaButton onPress={pickMedia} title={"Add Media"}>
                        <MaterialIcons name="perm-media" size={30} color={COLOR.gray_800}/>
                    </MediaButton>
                </View>
                <TextKdr style={[HEADINGS.p, MARGINS.v22]}>Uploaded Files</TextKdr>
                <View style={[MARGINS.v22, FLEX_STYLE.row, FLEX_STYLE.spaceBetween, FLEX_STYLE.rap]}>
                    {media ? media.map((item, index) => {
                        console.log("ITEM",item)
                        return <UploadFile key={index} id={item.id} source={{uri: item.file.uri}}/>
                    }) : null}
                </View>
                <ButtonKdr style={{
                    marginTop: 30,
                }} text={buttonText} onPress={handleContinue}/>
            </ScrollView>
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
    button: {
        flex: 1,
        borderWidth: 1,
        margin: 10,
        borderColor: COLOR.primary,
        borderStyle: "dashed",
        paddingTop: 20,
    }
});