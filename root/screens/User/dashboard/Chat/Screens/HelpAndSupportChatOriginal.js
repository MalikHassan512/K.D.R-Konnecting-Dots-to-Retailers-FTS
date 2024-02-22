import {ActivityIndicator, FlatList, KeyboardAvoidingView, Platform, StyleSheet, View} from "react-native";
import SenderMessage from "../../../../../components/chat/SenderMessage";
import {StatusBar} from "expo-status-bar";
import TitleBar from "../../../../../components/TitleBar/TitleBar";
import ReceiverMessage from "../../../../../components/chat/ReceiverMessage";
import DummyData from "../other/DummyData";
import ChatInput from "../../../../../components/chat/ChatInput";
import ChattingURLs from "../../../../../API/COMMON/ChattingURLs";
import {useContext, useEffect, useRef, useState} from "react";
import SessionContext from "../../../../../context/Session/session";
import {getUrl, JsonToQueryString} from "../../../../../other/raw";
import ChattingContext from "../../../../../context/Chatting/chatting";
import MainMenuMessage, {ServiceMenuMessage, ServiceReplyMessage} from "../other/helpSupportMessages";
import Urls from "../../../../../other/Urls";


export default function HelpAndSupportChat({navigation, ...props}) {
    let {email, name} = {email: "info@konnectingretailers.com", name: "K.D.R. Support"}

    const session = useContext(SessionContext);
    const [categories, setCategories] = useState([])

    let fetchCategories = async () => {
        await fetch(Urls.getCategories, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Token " + session.session.token
            }
        }).then(
            response => response.json()
        ).then(data => {
            setCategories(data)

        })
    }
    useEffect(() => {
        fetchCategories()
    }, [])
    const InboxContext = useContext(ChattingContext);
    const messages = InboxContext?.inbox[email]?.messages ? InboxContext?.inbox[email].messages : [];


    // console.log("messages in help and support::>>",messages )
    const [isFetchingOldMessages, setIsFetchingOldMessages] = useState(false)
    const [notMoreOldMessages, setNotMoreOldMessages] = useState(false)

    let fetchOldMessages = async (email, pageURL) => {
        if (isFetchingOldMessages) return;
        if (notMoreOldMessages) return;
        setIsFetchingOldMessages(true)
        let lastMessageId = messages.length > 0 ? messages[messages.length - 1].id : null;
        let params = {
            email: email,
            last_messaage_id: lastMessageId
        }
        let url = ChattingURLs.getOldMessages + JsonToQueryString(params)
        if (pageURL) {
            url = pageURL
        }
        await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Token " + session.session.token
            }
        }).then(response => response.json()
        ).then(data => {
            if (data.results) {
                InboxContext.addOldMessagesToInboxWith(email, data.results, name)
                if (data.results.length === 0) {
                    setNotMoreOldMessages(true)
                }
            }
            setIsFetchingOldMessages(false)
            // if (data.next) {
            //     fetchOldMessages(data.next)
            // }
        }).catch(err => {
            console.log(err.message)
            setIsFetchingOldMessages(false)
        })
    }
    const helpSupportMenu = async () => {
        if (messages.length === 0) {
            let mainMenuMessage = MainMenuMessage
            mainMenuMessage.recipientInfo = {
                id: session.session.profile.id,
                Name: session.session.profile.name,
                image: session.session.profile.image
            }
            mainMenuMessage.recipient = session.session.profile.email
            InboxContext.addNewMessageToInboxWith(email, mainMenuMessage)
        }
    }

    useEffect(() => {

        fetchOldMessages(email).then(r => {
            helpSupportMenu()

        })


    }, [])
    let addMyMessage = (text) => {
        let myMessage = {
            content: text,
            id: -12,
            senderInfo: {
                id: session.session.profile.id,
                Name: session.session.profile.Name,
                image: session.session.profile.image

            },
            sender: session.session.profile.email,
            recipientInfo: {
                id: session.session.profile.id,
                Name: session.session.profile.Name,
                image: session.session.profile.image

            },
            recipient: "info@konnectingretailers.com",

        }
        InboxContext.addNewMessageToInboxWith(email, myMessage)
    }
    let addServiceMessage = (text, id) => {
        let myMessage = {
            content: text,
            id: id,
            recipientInfo: {
                id: session.session.profile.id,
                Name: session.session.profile.Name,
                image: session.session.profile.image

            },
            recipient: session.session.profile.email,
            senderInfo: {
                id: 0,
                Name: "KDR",
                image: null

            },
            sender: "info@konnectingretailers.com",

        }
        InboxContext.addNewMessageToInboxWith(email, myMessage)

    }

    function handleChatBot(text) {
        let lastMessage = messages.length > 0 ? messages[0] : null;
        if (lastMessage.id !== -355) {
            addMyMessage(text)
        }
        if (lastMessage.id === -2) {
            if (!isNaN(text)) {
                let number = parseInt(text)
                switch (number) {
                    case 1:
                        let message = ServiceMenuMessage(categories)
                        InboxContext.addNewMessageToInboxWith(email, message)
                        break;
                    case 2:
                        addServiceMessage("Can you tell us about your problem in 3 short sentences?", -355)
                        break
                    case 3:
                        addServiceMessage("Can you tell us about your problem in 3 short sentences?", -355)
                        break
                    case 4:
                        addServiceMessage("Can you tell us about your problem in 3 short sentences?", -355)
                        break
                    case 5:
                        addServiceMessage("Would you like to speak to our customer support team?(Y/N)", -5)
                        break
                    default:
                        addServiceMessage("Wrong option selected.\nPlease choose a valid option", -2)
                        break


                }
            }
        }
        if (lastMessage.id === -3) {
            if (!isNaN(text)) {
                addServiceMessage("Reply with Category Name", lastMessage.id)

            } else {
                let message = ServiceReplyMessage(categories, text)
                InboxContext.addNewMessageToInboxWith(email, message)


            }

        }
        if (lastMessage.id === -35) {
            if (!isNaN(text)) {
                addServiceMessage("Reply with Sub-Category Name", lastMessage.id)

            } else {
                addServiceMessage("Can you tell us about your problem in 3 short sentences?", -355)

            }

        }
        if (lastMessage.id === -5) {

            if (text === "N" || text === "n" || text === "No" || "NO") {
                addServiceMessage("Okay. Choose any other option from the menu?", -2)


            } else {
                addServiceMessage("Tell us about the issue and the KDR representative will help you out", -355)
            }


        }

    }

    function OnPressSend(text) {
        InboxContext.sendMessageTo(email, {
            content: text,
        })

        return;

        let lastMessage = messages.length > 0 ? messages[0] : null;
        if (lastMessage?.id < 0 && lastMessage?.id > -355) {
            console.log("===============================", text)

            handleChatBot(text)
        } else {
            console.log("===============================", text)
            InboxContext.sendMessageTo(email, {
                content: text,
            })
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <StatusBar backgroundColor='white' style={"dark"}/>
            <TitleBar specificBack={"InBoxScreen"} navigation={navigation} title={name}/>


            <FlatList
                data={messages}
                showsVerticalScrollIndicator={false}
                inverted={true}
                renderItem={({item, index}) => {
                    let nextItem = messages.length > index + 1 ? messages[index + 1] : null;
                    let previousItem = index > 0 ? messages[index - 1] : null;
                    let nextMine = nextItem !== null && messages[index]?.senderInfo?.id === nextItem?.senderInfo?.id
                    let previousMine = previousItem !== null && messages[index]?.senderInfo?.id === previousItem?.senderInfo?.id
                    if (item.senderInfo.id === session.session.profile.id) {
                        return <SenderMessage key={index} text={item.content} time={item.time}
                                              isNextMine={item?.wasNextMessageMine}
                                              isPreviousMine={item?.wasLastMessageMine} name={item?.senderInfo.Name}/>
                    } else {
                        return <ReceiverMessage key={index} name={item.senderInfo.Name}
                                                isPreviousMine={item?.wasLastMessageMine}
                                                isNextMine={item?.wasNextMessageMine}
                                                nextMine={nextMine}
                                                text={item.content}
                                                dp={getUrl(item.senderInfo.image)}
                                                time={item.time}/>
                    }

                }}
                onEndReachedThreshold={0.9}
                onEndReached={() => {
                    // fetchOldMessages(email);
                }}
                ListFooterComponent={() => {
                    if (isFetchingOldMessages) {
                        return <ActivityIndicator size={"small"} color={"black"}/>
                    }
                }}

            />
            <ChatInput navigation={navigation} OnPressSend={OnPressSend}/>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});