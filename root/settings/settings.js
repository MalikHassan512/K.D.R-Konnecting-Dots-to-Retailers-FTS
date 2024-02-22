import {Platform} from "react-native";
import Urls from "../other/Urls";

const PRODUCTION = true;
let APP_LINK = "";
let shareLinks = {}
async function fetchShareLinks() {
    fetch(Urls.getShareLinks,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((e) => {
        if (e.status === 200) {
            e.json().then((e) => {
                shareLinks = e;
                if (Platform.OS === "android") {
                    APP_LINK = shareLinks?.android;
                } else {
                    APP_LINK = shareLinks?.ios;
                }
            })
        }
    })
}
fetchShareLinks().then((e) => {


})



const  CURRENCY = "£";

export default PRODUCTION;

export {
    APP_LINK,
    CURRENCY
}