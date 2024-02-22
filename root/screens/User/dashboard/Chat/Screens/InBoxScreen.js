import {FlatList, StyleSheet, View} from "react-native";
import TitleBar from "../../../../../components/TitleBar/TitleBar";
import InBoxSearchInput from "../../../../../components/chat/InBoxSearchInput";
import ChatsDummyData from "../other/ChatsDummyData";
import InBoxComponent from "../../../../../components/chat/InboxComponent";
import ChattingURLs from "../../../../../API/COMMON/ChattingURLs";
import {useContext, useEffect, useState} from "react";
import SessionContext from "../../../../../context/Session/session";
import ChattingContext from "../../../../../context/Chatting/chatting";
import { LoadingContext } from "../../../../../context/modal/LoadingContext";


export default function InBoxScreen({navigation, ...props}) {
    const session = useContext(SessionContext);
    const chattingContext = useContext(ChattingContext);
    const loading = useContext(LoadingContext);
    let fetchInbox = async (page,query,emptyPrevious=false) => {
        let requestData = {}
        if(page && page > 0){
            requestData.page = page
        }
        if(query && query.length > 0){
            requestData.query = query
        }
        if(emptyPrevious){
            chattingContext.setInbox({})
        }
        console.log( JSON.stringify(requestData),"req");
        loading.show()
        await fetch(ChattingURLs.getInbox, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Token " + session.session.token
            },
            body: JSON.stringify(requestData)
        }).then(response => response.json()
        ).then(data => {
            if(data.inbox){
                let inbox = chattingContext.inbox
                for(let key in data.inbox){
                    console.log(inbox[key],"key");
                    if(inbox[key]){
                        delete data.inbox[key]
                    }
                }
                inbox = {...inbox,...data.inbox}
                chattingContext.setInbox(inbox)
            }
            if(data.hasNext){
                fetchInbox(page+1,query)
            }

        }).catch(err => {
            console.log(err.message)

        }).finally(()=>{
            loading.close()
        })
    }
    const [query, setQuery] = useState("")
    useEffect(() => {
        if (session.session.token) {
            fetchInbox(1,query,true)
        }
    }, [query])

    useEffect(() => {
        // onFocusFetchInbox()
        navigation.addListener('focus', () => {
            if (session.session.token) {
                fetchInbox(1,"",true)
            }
        })


    }, [session.session.token])

    return (<View style={[styles.container]}>
        <TitleBar title={"Inbox"} navigation={navigation}/>
        <InBoxSearchInput value={query} onChangeText={(text) => {
            setQuery(text);
        }} navigation={navigation}/>

        <FlatList
            data={Object.keys(chattingContext.inbox)}
            renderItem={({item}) =>
            {
                let uri = chattingContext.inbox[item]?.messages[0]?.senderInfo?.image
                if(chattingContext.inbox[item]?.messages[0]?.sender === session.session.profile.email)
                {
                    uri = chattingContext.inbox[item]?.messages[0]?.recipientInfo?.image
                }
                if(chattingContext.inbox[item]?.Name==="KDR") {
                    return null
                }
                return (
                    <InBoxComponent
                        key={item}
                        navigation={navigation}
                        email={item}
                        name={chattingContext.inbox[item].Name}
                        message={chattingContext.inbox[item]?.messages[0]?.content}
                        time={chattingContext.inbox[item]?.messages[0]?.time}
                        uri = {uri}
                        noOfNotSeen={chattingContext.inbox[item]?.notSeenCount}

                    handleClick={() => {
                        navigation.navigate("chat", {
                            conversation_id: chattingContext.inbox[item].conversation_id,
                            name: chattingContext.inbox[item].Name,
                            email: item,
                        })


                    }}

                />)}
        }
            keyExtractor={item => item}
        />




    </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});