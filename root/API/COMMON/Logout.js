import API_URLS from "../USER/URLS";

export default function LogoutAPI(token, formData) {

    console.log("token", token, "data", formData)

    return new Promise((resolve, reject) => {

        fetch(API_URLS.logout, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'token ' +token       
               },
            body: formData
        }).then(async(response) => {
            if (response.status <= 201) {
                return await response.json()
            } else {
                return await response.json()
            }
        }).then((responseJson) => {
            resolve(responseJson)
        }).catch((e) => reject("error in logout api", e))

    })

}