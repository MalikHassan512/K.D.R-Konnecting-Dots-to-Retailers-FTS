import API_URLS from "./URLS";


export default function fetchFAQs(token) {

    return new Promise((resolve, reject) => {
        fetch(API_URLS.FAQ, {
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
                console.error('Error fetching FAQs:', error);
                reject(error);
            });
    });
}
