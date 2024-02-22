import {createStackNavigator} from '@react-navigation/stack';
import AccountSettings from "./Screens/AccountSettings";
import UserProfile from "./Screens/UserProfile";
import InviteFriends from "./Screens/InviteFriends";
import HelpAndSupport from "./Screens/HelpandSupport";
import Orders from "./Screens/Orders";
import OrderDetailScreen from "./Screens/OrderDetailScreen";
import PrivacyPolicy from "../../../Common/PrivacyPolicy";
import TermsOfService from "../../../Common/TermsOfService";
import FAQ from "../../../Common/FAQ";
import Feedback from '../../../Common/Feedback';
// import AllPromotions from './Screens/AllPromotions';
import AllPromotions from '../../../Common/AllPromotions';


const Stack = createStackNavigator();


export default function AccountEntry(props) {

    return (
        <Stack.Navigator
            initialRouteName="settings"
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen name="settings" component={AccountSettings}/>
            <Stack.Screen name="Account" component={UserProfile}/>
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy}/>
            <Stack.Screen name="TermsOfService" component={TermsOfService}/>
            <Stack.Screen name="Orders" component={Orders}/>
            <Stack.Screen name="OrderDetail" component={OrderDetailScreen}/>

            <Stack.Screen name="InviteFriends" component={InviteFriends}/>
            <Stack.Screen name="HelpAndSupport" component={HelpAndSupport}/>
            <Stack.Screen name="FAQ" component={FAQ}/>
            <Stack.Screen name="Feedback" component={Feedback}/>
            <Stack.Screen name="AllPromotions" component={AllPromotions}/>

        </Stack.Navigator>
    )
}