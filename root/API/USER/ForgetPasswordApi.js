import API_URLS from "./URLS";

export default function SendPasswordResetEmail(body) {


    return new Promise((resolve, reject) => {

        fetch(API_URLS.password_reset, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }).then((response) => {
            if (response.status <= 201 || response.status === 404) {
                return response.json()
            } else {
                reject(response)
            }
        }).then((responseJson) => {
            resolve(responseJson)
        }).catch((e) => reject(e))

    })

}

export function VerifyOtp(body) {
    return new Promise((resolve, reject) => {
        fetch(API_URLS.VerifyOtp, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }).then((response) => {
            if (response.status <= 201 || response.status === 404) {
                return response.json()
            } else {
                reject(response)
            }
        }).then((responseJson) => {
            resolve(responseJson)
        }).catch((e) => reject(e))

    })

}

export function ResetPassword(body) {
    return new Promise((resolve, reject) => {
        fetch(API_URLS.confirm_reset, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }).then((response) => {
            if (response.status <= 201 || response.status === 404) {
                return response.json()
            } else {
                reject(response)
            }
        }).then((responseJson) => {
            resolve(responseJson)
        }).catch((e) => reject(e))

    })

}

