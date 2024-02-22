import {createStackNavigator} from '@react-navigation/stack';
import Login from "./Login";
import SignUp from "./signUp/signUp";
import OtpScreen from "./ForgetPassword/OtpScreen";
import RecoverEmail from "./ForgetPassword/RecoverEmail";
import PasswordRecoveryDoneScreen from "./ForgetPassword/PasswordRecoveryDoneScreen";
import NewPassword from "./ForgetPassword/NewPassword";

const Stack = createStackNavigator();


export default function UserAuthEntry(props) {

    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="SignUp" component={SignUp}/>
            <Stack.Screen name="RecoverEmail" component={RecoverEmail}/>
            <Stack.Screen name="OtpScreen" component={OtpScreen}/>
            <Stack.Screen name="NewPassword" component={NewPassword}/>
            <Stack.Screen name="PasswordRecoveryDoneScreen" component={PasswordRecoveryDoneScreen}/>
        </Stack.Navigator>
    )
}