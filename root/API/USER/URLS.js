import PRODUCTION from "../../settings/settings";

let domain = null
var WsUrl = null

if (PRODUCTION) {
    domain = "http://kdrb.eu-north-1.elasticbeanstalk.com/"

    WsUrl = `ws://kdrb.eu-north-1.elasticbeanstalk.com/`




} else {

    // http://167.99.134.209:8000/
    let IpAddress = "192.168.100.24";
    domain = "http://" + IpAddress + ":8000/"
    WsUrl = `ws://${IpAddress}:8000/`

}

const API_URLS = {
    images: domain,
    signUp: domain+"clients",
    login: domain + "login",
    logout: domain + "logout/",
    getCategories: domain + "getCategories",
    likeUnlikeService: domain + "likeUnlikeService",
    likedServices: domain + "likedServices",
    allservices: domain + "allservices",
    clientsUpdate: domain + "clientsUpdate",
    uploadFile: domain + "uploadFile",
    promotions: domain + "promotions/",
    getOrders: domain + "getOrders",
    OrderCreateUpdate: domain + "OrderCreateUpdate",
    password_reset:domain+"password_reset",
    confirm_reset:domain+"confirm_reset",
    VerifyOtp:domain+"VerifyOtp",
    client_delete:domain+"clientsDelete",
    service_provider_delete:domain+"serviceProvidersDelete",
    FAQ:domain+"FAQ/",
    SupportQA:domain+"SupportQA/",
    // FAQ:"http://" + "192.168.100.24" + ":8000/FAQ/",
}




export const WsUrls = {
    Chatting: WsUrl + "ws/socket-server/Chatting",
}

export default API_URLS;