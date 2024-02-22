import API_URLS from "./URLS";
import {getImageUrl} from "../../other/raw";
import * as ImagePicker from 'expo-image-picker';
import Toast from "react-native-toast-message";


export default function UpdateProfile(token, body) {
    console.log(body);

    return new Promise((resolve, reject) => {
        fetch(API_URLS.clientsUpdate, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + token

            },
            body: JSON.stringify(body)
        }).then((response) => {
            if (response.status <= 201 || response.status === 400) {
                response.json().then((responseJson) => {
                    resolve({
                        status: response.status,
                        data: responseJson
                    })
                })
                return;
            }
            reject(response)
        }).catch((e) => {
            reject(e)

        })

    })

}


export function PicImage() {
    return new Promise((resolve, reject) => {
        //     getting permission to access camera roll
        ImagePicker.requestCameraPermissionsAsync().then((permission) => {
            if (permission.granted === false) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: "Permission to access camera roll is required!"
                });
                reject("Permission to access camera roll is required!")
            } else {
                ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1,1],
                    quality: 0.65,
                }).then((result) => {
                    if (result.canceled === true) {
                        reject("Image picker was cancelled")
                    } else {
                        resolve(result)
                    }
                }).catch((e) => {
                    reject(e)
                })
            }
        }).catch((e) => {
            reject(e)
        })
    })

}


export function UploadImage(token, uri) {
    let formdata = new FormData();
    formdata.append('file', getImageUrl(uri));
    return new Promise((resolve, reject) => {
        fetch(API_URLS.uploadFile, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Token ' + token
            },
            body: formdata
        }).then((response) => {
            if (response.status <= 201) {
                return response.json()
            } else {
                reject(response)
            }
        }).then((responseJson) => {
            resolve(responseJson)
        }).catch((e) => {

            reject(e)

        })

    })

}