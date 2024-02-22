import {createStackNavigator} from '@react-navigation/stack';
import Home from "./Screens/Home";
import CategoryDetail from "./Screens/CategoryDetail";
import ServiceDetailScreen from "./Screens/ServiceDetail";
import PaymentMethodScreen from "./Screens/PaymentMethodScreen";
import AddNewCard from "./Screens/AddNewCard";
import PasswordRecoveryDoneScreen from "./Screens/PaymentDoneScreen";
import CategoryService from "./Screens/CategoryService";
import Chat from "../Chat/Screens/Chat";

const Stack = createStackNavigator();

const forFade = ({ current }) => ({
    cardStyle: {
        opacity: current.progress,
    },
});

export default function HomeEntry({navigation,route,...props}) {

    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                cardStyleInterpolator: forFade,
            }}
        >
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="CategoryDetail" component={CategoryDetail}/>
            <Stack.Screen name="CategoryService" component={CategoryService}/>
            <Stack.Screen name="ServiceDetailScreen" component={ServiceDetailScreen}/>
            <Stack.Screen name="PaymentMethodScreen" component={PaymentMethodScreen}/>
            <Stack.Screen name="AddNewCard" component={AddNewCard}/>
            <Stack.Screen name="DirectChat" component={Chat}/>
            <Stack.Screen name="PasswordRecoveryDoneScreen" component={PasswordRecoveryDoneScreen}/>

        </Stack.Navigator>
    )
}