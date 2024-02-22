import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeEntry from "./Home";
import AccountEntry from "./Account";
import FavoriteEntry from "./Favorite";
import ChatEntry from "./Chat";
import TabBarConfig from "../../../components/TabBar/TabBarConfig";
import {ChattingProvider} from "../../../context/Chatting/chatting";
import {LogBox} from "react-native";


const Tab = createBottomTabNavigator();

export default function UserDashboardEntry() {
    LogBox.ignoreLogs(['Warning:']);


    return (
        <ChattingProvider>
            <Tab.Navigator
                initialRouteName="EntryHome"
                
                screenOptions={({route}) => ({
                    headerShown: false,
                    tabBarIcon: ({focused, color, size}) => TabBarConfig({route, focused, color, size}),
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                    tabBarHideOnKeyboard: true,

                })}

            >
                <Tab.Screen name="EntryHome" component={HomeEntry} options={{title: "Home"}}/>
                <Tab.Screen name="EntryChat" component={ChatEntry} options={{title: "Chat"}}/>
                <Tab.Screen name="EntryFavorite" component={FavoriteEntry} options={{title: "Favorite"}}/>
                <Tab.Screen name="EntrySettings" component={AccountEntry} options={{title: "Account"}}/>
            </Tab.Navigator>
        </ChattingProvider>
    );
}