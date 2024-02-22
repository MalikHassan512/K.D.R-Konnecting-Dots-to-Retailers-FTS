import API_URLS from "./URLS";
import Toast from "react-native-toast-message";
import {JsonToQueryString} from "../../other/raw";

export default function LikeServiceApi(token, data) {

    return new Promise((resolve, reject) => {

        fetch(API_URLS.likeUnlikeService, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'token ' + token
            },
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.status <= 201) {
                return response.json()
            } else {
                reject(response)
            }
        }).then((responseJson) => {
            resolve(responseJson)
        }).catch((e) => reject(e))

    })

}

export function getFavServices(token,data) {

    return new Promise((resolve, reject) => {
        fetch(API_URLS.likedServices+JsonToQueryString(data), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'token ' + token
            },
        }).then((response) => {
            if (response.status <= 201) {
                return response.json()
            } else {
                reject(response)
            }
        }).then((responseJson) => {
            resolve(responseJson)
        }).catch((e) => reject(e))

    })

}