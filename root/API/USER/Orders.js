import API_URLS from "./URLS";
import Toast from "react-native-toast-message";
import {JsonToQueryString} from "../../other/raw";


export function GetOrders(token, query) {

    return new Promise((resolve, reject) => {

        fetch(API_URLS.getOrders + JsonToQueryString(query), {
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


export function PlaceOrder(token, data) {

    return new Promise((resolve, reject) => {

        fetch(API_URLS.OrderCreateUpdate, {
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


export function CancelOrder(token, orderId, ServiceId) {

    return new Promise((resolve, reject) => {

        fetch(API_URLS.OrderCreateUpdate + `/${orderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'token ' + token
            },
            body: JSON.stringify({
                order_status: "CANCELLEDBYCLIENT",
                service: ServiceId
            })
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


export function markOrderAsComplete(token, orderId, ServiceId) {

    return new Promise((resolve, reject) => {

        fetch(API_URLS.OrderCreateUpdate + `/${orderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'token ' + token
            },
            body: JSON.stringify({
                isMarkedCompletedByClient: true,
                service: ServiceId
            })
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
