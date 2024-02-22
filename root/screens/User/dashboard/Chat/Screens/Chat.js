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
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import Toast from "react-native-toast-message";
import Urls from "../../../../../other/Urls";
import mime, {load} from "mime";
import {LoadingContext} from "../../../../../context/modal/LoadingContext";
import database from "@react-native-firebase/database";

export default function Chat({navigation, ...props}) {
    let {email, name} = props.route.params
    console.log(props)

    const session = useContext(SessionContext);
    const InboxContext = useContext(ChattingContext);
    const loading = useContext(LoadingContext);
    const messages = InboxContext?.inbox[email]?.messages ? InboxContext?.inbox[email].messages : [];
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
    // const isFirstMessageCall = useRef(true);
    useEffect(() => {
        fetchOldMessages(email)


    }, [])


    async function OnPressSend(text) {
        InboxContext.sendMessageTo(email, {
            content: text,
        })

        await notificationSenderToServiceProvider()


    }

    const showToast = (type, txt1, txt2) => {
        Toast.show({
            type: type,
            text1: txt1,
            text2: txt2,
        });

    }
    let uploadFile = async (file) => {
        console.log(file);
        let data = new FormData();
        let uploadingFile = {
            name: file.name,
            type: file.mimeType,
            uri: file.uri
        }
        console.log(uploadingFile, "file")
        data.append("file", uploadingFile);
        console.log(Urls.uploadFile, ".....................................");
        await fetch(Urls.uploadFile,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Token ' + session.session.token

                },
                body: data
            })
            .then((response) => response.json())
            .then((response) => {
                if (response.id) {
                    showToast("success", "Media uploaded", "")
                    InboxContext.sendMessageTo(email, {
                        media: response.id
                    })

                } else {
                    showToast("error", "Error while uploading media", "")
                    return null
                }
            })
            .catch((error) => {
                console.log(error.message)
                showToast("error", "Error while uploading media", "")
            })


    }
    const onFileUpload = async () => {
        console.log("send");
        // InboxContext.sendMessageTo(email, {
        //     media:131
        // })
        // return
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: '*/*',
                copyToCacheDirectory: false,
            });

            if (!result.canceled) {
                console.log(result);
                uploadFile(result)
            }
        } catch (err) {
            console.error('Error picking document', err);
        }
    };


    const notificationSenderToServiceProvider = async () => {

        let providerEmail = email.split('@')

        await database().ref('kdrUsers').child(providerEmail[0])
            .once('value', async (snapshot) => {
                if (snapshot.exists()) {

                    const notification = {
                        body: "sent you message",
                        title: session.session.profile.Name
                    }


                    await fetch("https://fcm.googleapis.com/fcm/send", {
                            headers: {
                                'Content-Type': 'application/json',
                                "Authorization": "key=AAAAN5O5EIk:APA91bFdT5O421KSp_97APGXcWktdeFVmZJm9R_PysaSgeNeE6mqP5zFfbaKfvvTXQHLla4OHg-z4_q_FNu5MO1HyS0Zftu_a1D1r3__sdibg95KwKEqNo_snLkxltY8E-O0cwEuyGke"
                            },
                            method: "POST",
                            body: JSON.stringify({notification: notification, to: snapshot.child("deviceToken").val()})
                        }
                    ).then(response => response.json())
                        .then((data) => {
                            console.log("token sent response", data)
                        })
                } else {
                    alert("Please login again to send notification")
                }
            })
    }


    // console.log(messages)
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
                keyExtractor={(item, index) => index}
                renderItem={({item, index}) => {
                    let nextItem = messages.length > index + 1 ? messages[index + 1] : null;
                    let previousItem = index > 0 ? messages[index - 1] : null;
                    let nextMine = nextItem !== null && messages[index].senderInfo.id === nextItem.senderInfo.id
                    let previousMine = previousItem !== null && messages[index].senderInfo.id === previousItem.senderInfo.id
                    if (item.senderInfo.id === session.session.profile.id) {
                        return <SenderMessage text={item.content} time={item.time} isNextMine={item?.wasNextMessageMine}
                                              file={item?.media?.file || ""}
                                              isPreviousMine={item?.wasLastMessageMine} name={item?.senderInfo.Name}/>
                    } else {
                        return <ReceiverMessage name={item.senderInfo.Name} isPreviousMine={item?.wasLastMessageMine}
                                                isNextMine={item?.wasNextMessageMine}
                                                nextMine={nextMine}
                                                file={item?.media?.file || ""}
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
            <ChatInput navigation={navigation} OnPressSend={OnPressSend} onFileUpload={onFileUpload}/>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
