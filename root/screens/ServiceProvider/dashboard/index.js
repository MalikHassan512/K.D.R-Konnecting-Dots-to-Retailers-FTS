import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabBarConfig from "../../../components/TabBar/TabBarConfig";
import SpHomeEntry from "./Home";
import SpOrders from "./Orders/screens/SpOrders";
import SpOrdersEntry from "./Orders";
import SpProductsEntry from "./Products";
import SpSettingsEntry from "./Settings";
import AddProductsEntry from "./AddProducts";
import SpTabBar from "../../../components/TabBar/SpTabBar";
import {ChattingProvider} from "../../../context/Chatting/chatting";
import ChatEntry from "../../User/dashboard/Chat";
import {useNavigation} from "@react-navigation/native";
import {useContext, useEffect, useLayoutEffect, useState} from "react";


const Tab = createBottomTabNavigator();
import { useRoute } from '@react-navigation/native';
import SessionContext from "../../../context/Session/session";
import Urls from "../../../other/Urls";
import Trial from './AddProducts/Components/Trial';
import UpdateProductsEntry from './UpdateProduct';


export default function SpDashboardEntry({navigation}) {
    //hide tab bar on chat screen
    const route = useRoute();
    let state = navigation.getState();
    let actualRoute = state.routes[state.index];
    const [displayTabBar, setDisplayTabBar] = useState(true)
    function isSixMonthsPassed(dateJoined) {
        const dateParts = dateJoined.split(" @ ")[0].split(" ");
        const monthAbbreviation = dateParts[0];
        const day = parseInt(dateParts[1], 10);
        const year = parseInt(dateParts[2], 10);
        const timeParts = dateJoined.split(" @ ")[1].split(":");
        let hours = parseInt(timeParts[0], 10);
        const minutes = parseInt(timeParts[1], 10);
        const ampm = dateJoined.split(" ")[3];
    
        if (ampm === "PM" && hours !== 12) {
            hours += 12;
        } else if (ampm === "AM" && hours === 12) {
            hours = 0;
        }
        const monthMap = {
            Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
            Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
        };
        const joinedDate = new Date(year, monthMap[monthAbbreviation] - 1, day, hours, minutes);
        const today = new Date();
    
        // Calculate the difference in months
        const diffMonths = (today.getFullYear() - joinedDate.getFullYear()) * 12 + (today.getMonth() - joinedDate.getMonth());
    
        return diffMonths >= 6;
    }
    

    

 
    
    const [isUser6MonthsOld, setIsUser6MonthsOld] = useState(false)
    let checkIfUserIs6MonthsOld = () => {
        if (isSixMonthsPassed(session.session.profile.date_joined)) {
            setIsUser6MonthsOld(true);
        } else {
            setIsUser6MonthsOld(false);
        }
    };
    const [subscription, setSubscription] = useState({
        count: 1
    })
    let getCurrentSubscription = () => {

        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Token "+session.session.token

            }
        }
        fetch(Urls.CurrentSubscription, options).then(res => res.json()).then(res => {
            setSubscription(res)
        }).catch(err => {
            console.log(err)
        })
    }
    const session = useContext(SessionContext)

    useEffect(() => {
        if(session.session.profile.id !==null)
        {
            getCurrentSubscription()
            checkIfUserIs6MonthsOld()
        }
    }, [session.session.profile])
    useLayoutEffect(() => {


        while (actualRoute?.state) {
            actualRoute = actualRoute.state.routes[actualRoute.state.index];
            if (actualRoute?.name === "chat" || actualRoute?.name === "HelpAndSupportChat") {
                console.log(actualRoute.name)

                setDisplayTabBar(false);
            }
            else {
                setDisplayTabBar(true)
            }
        }

    })

    return (
        <ChattingProvider>
            {/*current route name*/}


            <Tab.Navigator
                initialRouteName="SpHomeEntry"
                tabBar={props => <SpTabBar isUser6MonthsOld={isUser6MonthsOld} subscription={subscription} isVisible={displayTabBar} {...props} />}
                screenOptions={({route}) => ({
                    headerShown: false,
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                    tabBarHideOnKeyboard: true,


                })}

            >
                <Tab.Screen name="SpHomeEntry" component={SpHomeEntry} options={{title: "Home"}}/>
                <Tab.Screen name="SpProductsEntry" component={SpProductsEntry} options={{title: "Products"}}/>
                <Tab.Screen name="AddProductsEntry" component={AddProductsEntry} options={{title: "Add Product"}}/>
                <Tab.Screen name="UpdateProductsEntry" component={UpdateProductsEntry} options={{title: "Update Product"}}/>
                <Tab.Screen name="EntryChat" component={ChatEntry} options={{title: "Chat"}}/>
                <Tab.Screen name="SpSettingsEntry" component={SpSettingsEntry} options={{title: "Account"}}/>
            </Tab.Navigator>
        </ChattingProvider>
    );
}