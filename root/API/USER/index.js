import API_URLS from "./URLS";
import Toast from "react-native-toast-message";

export default function fetchCategories(token) {


    return new Promise((resolve, reject) => {

        fetch(API_URLS.getCategories, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'token ' + token
            }
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


export function fetchServices(token, query) {
    console.log('token in fetch services::>>', token);
console.log(API_URLS.allservices + query);
    return new Promise((resolve, reject) => {

        fetch(API_URLS.allservices + query, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'token ' + token
            }
        }).then((response) => {
            if (response.status <= 201) {
                return response.json()
            } else {
                reject(response)
            }
        }).then((responseJson) => {
            resolve(responseJson)
        }).catch((e) => {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: "Something went wrong"
            });
            reject(e)
        })

    })

}

export function FetchOffers(token) {
    return new Promise((resolve, reject) => {

        fetch(API_URLS.promotions , {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'token ' + token
            }
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
