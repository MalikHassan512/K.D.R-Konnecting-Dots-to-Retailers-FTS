import {createStackNavigator} from '@react-navigation/stack';
import Login from "./Login";
import SignUpPage1 from "./signUp/SignUpPage1";
import SignUpPage2 from "./signUp/SignUpPage2";
import SignUpPage3 from "./signUp/SignUpPage3";
import PrivacyPolicy from '../../Common/PrivacyPolicy';
import TermsOfService from '../../Common/TermsOfService';


const Stack = createStackNavigator();


export default function ServiceProviderAuthEntry(props) {

    return (
        <Stack.Navigator
            initialRouteName="ServiceProviderLogin"
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen name="ServiceProviderLogin" component={Login}/>
            <Stack.Screen name="SpPage1" component={SignUpPage1}/>
            <Stack.Screen name="SpPage2" component={SignUpPage2}/>
            <Stack.Screen name="SpPage3" component={SignUpPage3}/>
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy}/>
            <Stack.Screen name="TermsOfService" component={TermsOfService}/>

        </Stack.Navigator>
    )
}