import {createStackNavigator} from '@react-navigation/stack';
import UserAuthEntry from "./screens/User/auth";
import UserDashboardEntry from "./screens/User/dashboard";
import ServiceProviderAuthEntry from "./screens/ServiceProvider/auth";
import SpDashboardEntry from "./screens/ServiceProvider/dashboard";
import SessionContext from "./context/Session/session";
import {useCallback, useContext, useEffect, useState} from "react";
import * as SplashScreen from "expo-splash-screen";
import FLEX_STYLE from "./Styles/FLEXSTYLE";
import {View} from "react-native";
import VideoSigningUp from "./screens/Common/VideoSigningUp";
import WelcomeScreen from "./screens/Common/WelcomeScreen";
import Splash from './screens/Common/Splash';

const Stack = createStackNavigator();
SplashScreen.preventAutoHideAsync();

export default function Root() {
    const [appIsReady, setAppIsReady] = useState(false);
    const [screenToShow, setScreenToShow] = useState("UserAuthEntry");
    const [showSplash, setShowSplash] = useState(true);
    const session = useContext(SessionContext);


    useEffect(() => {

        async function prepare() {
            try {
                await session.loadSession().then(session => {

                    if (session.token !== null) {
                        if (session.profile.roles === "CLIENT") {
                            setScreenToShow("UserDashboardEntry");
                        } else if (session.profile.roles === "SERVICE_PROVIDER") {
                            setScreenToShow("SpDashboardEntry");
                        }
                        setAppIsReady(true);
                    } else {
                        setScreenToShow("WelcomeScreen");
                        setAppIsReady(true);
                    }
                }).catch(e => {
                    setScreenToShow("WelcomeScreen")
                });
            } catch (e) {
                setAppIsReady(true);
                console.warn("splash error===>", e);
            } finally {
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
            setTimeout(async () => {
                setShowSplash(false);
            }
                , 3000)
        }
    }
    , [appIsReady]);


    if (!appIsReady) {
        return null;
    }
    return (
        <View style={[FLEX_STYLE.one]}
        onLayout={onLayoutRootView}
        >
            {
                showSplash ? <Splash/> :   <Stack.Navigator
                initialRouteName={screenToShow}
                screenOptions={{headerShown: false}}
            >
                <Stack.Screen name="UserAuthEntry" component={UserAuthEntry}/>
                <Stack.Screen name="UserDashboardEntry" component={UserDashboardEntry}/>
                <Stack.Screen name="WelcomeScreen" component={WelcomeScreen}/>
                <Stack.Screen name="SignUpComplete" component={VideoSigningUp}/>
                <Stack.Screen name="ServiceProviderAuthEntry" component={ServiceProviderAuthEntry}/>
                <Stack.Screen name="SpDashboardEntry" component={SpDashboardEntry}/>
            </Stack.Navigator>
            }
        </View>

    )
}

