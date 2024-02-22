import {createContext, useContext, useEffect, useRef, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChattingURLs from "../../API/COMMON/ChattingURLs";
import SessionContext from "../Session/session";
import {WsUrls} from "../../API/USER/URLS";
import ChattingStatusCode from "./ChattingStatusCode";
import Toast from "react-native-toast-message";


const SESSION_KEY = "SESSION"

const DEFAULT_INBOX = []


const OTHER_DATA = {
    cartCount: 0,
    FavCount: 0,
}
const ChattingContext = createContext({
        inbox: DEFAULT_INBOX,
        setInbox: (data) => {
        },
        addOldMessagesToInboxWith(email, messages) {
        },
        addNewMessageToInboxWith(email, message) {


        },
        sendMessageTo(email, message) {

        }
    }
);


function ChattingProvider({ children }) {
    const [inbox, setInbox] = useState(DEFAULT_INBOX);
    const [connected, setConnected] = useState(false);
    const webSocket = useRef(null);
    const sessionData = useContext(SessionContext);
    const [lastMessage, setLastMessage] = useState(null);
    const [isConnecting,setIsConnecting]=useState(false)
  
    function getUserInbox(message) {
      const myEmail = sessionData.session.profile.email;
      const inbox = message.recipient === myEmail ? message.sender : message.recipient;
      return inbox;
    }

  
    function Connect() {
      if (webSocket.current !== null&&isConnecting) {
        // WebSocket is already connected; no need to reconnect.
        return;
      }
      setIsConnecting(true)
  
      console.log("connecting to websocket");
      webSocket.current = new WebSocket(WsUrls.Chatting + "/" + sessionData.session.token);
  
      webSocket.current.onopen = () => {
        console.log("connected to websocket");

        setConnected(true);
        setIsConnecting(false)
      };
  
      webSocket.current.onmessage = (e) => {
        console.log("message received", e.data);
        const response = JSON.parse(e.data);
        if (response.status === ChattingStatusCode.IN_COMING_MSG) {
          setLastMessage(response.body);
        }
      };
  
      webSocket.current.onclose = () => {
        console.log("connection closed");
        webSocket.current = null;
        setConnected(false);
        setIsConnecting(false)
  
      };
  
      webSocket.current.onerror = (e) => {
        webSocket.current = null;
        setConnected(false);
        setIsConnecting(false)
        console.log("websocket error", e);

      };
    }
  
    useEffect(() => {
       if(connected===false)
        Connect();
      
    }, [connected]);

    useEffect(() => {
        if (lastMessage === null) return;
        addNewMessageToInboxWith(getUserInbox(lastMessage), lastMessage);

    }, [lastMessage])


    let addOldMessagesToInboxWith = (email, messages,name=null) => {
        if (inbox[email] === undefined) {
            inbox[email] = {
                name: name?name:email,
                conversation_id: -1,
                notSeenCount: 0,
                messages: messages,
            }
        } else {
            inbox[email].messages = [...inbox[email].messages, ...messages]
        }
        setInbox({...inbox})
    }
    function addNewMessageToInboxWith(email, message) {
        // search if the message with same id is already present in the inbox
        // replace it with the new message
        // else add the new message to the inbox
        if (inbox[email] === undefined) {
            let name = email === message.sender ? message.senderInfo.Name : message.recipientInfo.Name;
            console.log("name",name)
            inbox[email] = {
                Name: name,
                conversation_id: -1,
                notSeenCount: 0,
                messages: [message],
            }
        }
        inbox[email].messages = [ message,...inbox[email].messages]
        let hardCopy = Object.assign({}, inbox)
        setInbox(hardCopy)

    }

    function sendMessageTo(email, message) {
        if (webSocket.current === null) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Error',
                text2: "Something went wrong, please check your internet connection and try again",
            });
            Connect();
            return;
        }
        console.log(message,JSON.stringify({
            status: ChattingStatusCode.OUT_GOING_MSG,
            body: {
                recipient: email,
                ...message
            }
        }),"sending.................");
        webSocket.current.send(JSON.stringify({
            status: ChattingStatusCode.OUT_GOING_MSG,
            body: {
                recipient: email,
                ...message
            }
        }))
    }


    let value = {
        inbox: inbox,
        setInbox: setInbox,
        addOldMessagesToInboxWith: addOldMessagesToInboxWith,
        addNewMessageToInboxWith: addNewMessageToInboxWith,
        sendMessageTo: sendMessageTo
    }

    return (
        <ChattingContext.Provider value={value}>
            {children}
        </ChattingContext.Provider>
    )
}


export default ChattingContext

export {
    ChattingProvider
}