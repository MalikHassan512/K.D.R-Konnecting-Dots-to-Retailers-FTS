import {createStackNavigator} from '@react-navigation/stack';
import Chat from "./Screens/Chat";
import {useEffect} from "react";
import {useRoute} from "@react-navigation/native";
import HelpAndSupportChat from "./Screens/HelpAndSupportChat";
import InBoxScreen from "./Screens/InBoxScreen";

const Stack = createStackNavigator();


export default function ChatEntry({navigation, ...props}) {
    const route = useRoute();

    useEffect(() => {
        navigation.addListener('focus', () => {
            if (route.name === 'EntryChat') {
                navigation.setOptions({
                    tabBarStyle: {
                        display: 'none'
                    }
                })
            }
        })
    }, [])
    return (
        <Stack.Navigator
            initialRouteName="InBoxScreen"
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen name="chat" component={Chat}/>
            <Stack.Screen name="InBoxScreen" component={InBoxScreen}/>
            <Stack.Screen name="HelpAndSupportChat" component={HelpAndSupportChat}/>

        </Stack.Navigator>
    )
}