import {createStackNavigator} from '@react-navigation/stack';
import SpSettings from "./screens/SpSettings";
import InviteFriends from "../../../User/dashboard/Account/Screens/InviteFriends";
import HelpAndSupport from "../../../User/dashboard/Account/Screens/HelpandSupport";
import SpUserProfile from "./screens/SpUserProfile";
import SpBusinessProfile from "./screens/SpBusinessProfile";
import FAQ from "../../../Common/FAQ";
import PrivacyPolicy from "../../../Common/PrivacyPolicy";
import TermsOfService from "../../../Common/TermsOfService";
import SpOrdersEntry from "../Orders";
import Feedback from '../../../Common/Feedback';
import AllPromotions from '../../../Common/AllPromotions';


const Stack = createStackNavigator();


export default function SpSettingsEntry(props) {

    return (
        <Stack.Navigator
            initialRouteName="SpSettings"
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen name="SpSettings" component={SpSettings}/>
            <Stack.Screen name="Account" component={SpUserProfile}/>
            <Stack.Screen name="Orders" component={SpOrdersEntry}/>
            <Stack.Screen name="SpBusinessProfile" component={SpBusinessProfile}/>
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy}/>
            <Stack.Screen name="TermsOfService" component={TermsOfService}/>
            <Stack.Screen name="InviteFriends" component={InviteFriends}/>
            <Stack.Screen name="HelpAndSupport" component={HelpAndSupport}/>
            <Stack.Screen name="FAQ" component={FAQ}/>
            <Stack.Screen name="Feedback" component={Feedback}/>
            <Stack.Screen name="AllPromotions" component={AllPromotions}/>

        </Stack.Navigator>
    )
}