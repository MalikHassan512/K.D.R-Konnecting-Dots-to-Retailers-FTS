import API_URLS from "../USER/URLS";


export default function SupporAQsAPI(token) {

    console.log("token in support::>>", token)

    return new Promise((resolve, reject) => {
        fetch(API_URLS.SupportQA, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'token ' + token
            }
        })
            .then(async(response) => {
                if (response.ok) {
                    return await response.json();
                } else {
                    return response.json().then((error) => {
                        throw new Error(error.message || 'Fetch failed');
                    });
                }
            })
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                console.error('Error in Fetching Support request::>:', error);
                reject(error);
            });
    });
}
