import PRODUCTION from "../../settings/settings";

let domain = null
if (PRODUCTION) {
    domain = "http://kdrb.eu-north-1.elasticbeanstalk.com/"
} else {

    // http://167.99.134.209:8000/
    let IpAddress = "167.99.134.209";
    domain = "http://" + IpAddress + ":8000/"
}

const ChattingURLs = {
    getInbox: domain + "get-inbox",
    getOldMessages: domain + "get-old-chats",

}

export default ChattingURLs;