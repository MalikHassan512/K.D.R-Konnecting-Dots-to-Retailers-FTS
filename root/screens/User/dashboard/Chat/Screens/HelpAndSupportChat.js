import { ActivityIndicator, FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import TitleBar from "../../../../../components/TitleBar/TitleBar";
import ChatInput from "../../../../../components/chat/ChatInput";
import SessionContext from "../../../../../context/Session/session";
import { useContext, useEffect, useState } from "react";
import SenderMessage from "../../../../../components/chat/SenderMessage";
import ReceiverMessage from "../../../../../components/chat/ReceiverMessage";
import SupporAQsAPI from "../../../../../API/COMMON/Support";


export default function HelpAndSupportChat({ navigation, ...props }) {
    const combineQuestions = (FAQs) => {
        return FAQs.map((faq, index) => `${index + 1}. ${faq.question.trim()}\n`);
    }
    let initialMessasges = []
    const [messages, setMessages] = useState(initialMessasges)
    let { email, name } = { email: "info@konnectingretailers.com", name: "KDR Support" }
    const session = useContext(SessionContext);
    const [FAQs, setFAQs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userQuery, setUserQuery] = useState('');


    useEffect(() => {
        SupporAQsAPI(session.session.token).then((response) => {
            setFAQs(response);
            setMessages([
                {
                    id: 2,
                    text: "Hello, KDR Support Here. Press Question Number to know answer?",
                    type: "send"
                }, {
                    id: 1,
                    text: combineQuestions(response),
                    type: "receive"
                },])
            setLoading(false);
        }).catch((error) => {
            console.log("error in fetching Support in screen::>>", error);
            setLoading(false);
        }).finally(() => {
            setLoading(false);
        }
        );
    }, []);





    const replyAnswer = (FAQs) => {

        return FAQs.map((faq, index) => {
            if (userQuery === `${index + 1}`) {
                return `${index + 1}. ${faq.answer.trim()}\n`;
            }
        });
    }


    const OnPressSend = (message) => {
        let answer
        FAQs.map((faq, index) => {
            if (message === `${index + 1}`) {
                answer = `${index + 1}. ${faq.answer.trim()}\n`;
                      // Remove numbering from the start of the answer
                answer = answer.replace(/^\d+\./, '');
            }
            return
        });
        setMessages(prev => [{ id: 4, text: answer, type: "receive" }, { id: 4, text: message, type: "send" }, ...prev])
        setUserQuery(message);
    }

    const renderComponent = ({ item }) => {
        return (
            <View>

                {item.type === "receive" ? <ReceiverMessage
                    key={item.id}
                    name={'KDR Support'}
                    previousMine={'false'}
                    isNextMine={'false'}
                    nextMinr={'false'}
                    text={item.text}
                    dp={require('../../../../../../assets/adaptive-icon.jpeg')}
                    time={''}
                /> :

                    <SenderMessage
                        key={item.id}
                        name={''}
                        isPreviousMine={true}
                        isNextMine={false}
                        text={item.text}
                        dp={''}
                        time={''}
                    />}




            </View>
        )
    }


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <StatusBar backgroundColor='white' style={"dark"} />
            <TitleBar specificBack={"InBoxScreen"} navigation={navigation} title={name} />

            {loading ?
                (<View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size={"small"} color={"black"} />
                </View>)
                :
                <FlatList
                    data={messages}
                    key={FAQs.id}
                    showsVerticalScrollIndicator={false}
                    inverted={true}
                    renderItem={renderComponent}
                    onEndReachedThreshold={0.9}
                />}
            <ChatInput navigation={navigation} OnPressSend={OnPressSend} />
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});