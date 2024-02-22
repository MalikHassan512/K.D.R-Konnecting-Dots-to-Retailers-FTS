import "react-native-gesture-handler"
import Root from "./root";
import Toast from 'react-native-toast-message';
import LoadingProvider from "./root/context/modal/LoadingContext";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { SessionProvider } from "./root/context/Session/session";
import { MenuProvider } from 'react-native-popup-menu';
import { StripeProvider } from "@stripe/stripe-react-native";
import { useCallback, useEffect, useState,  } from "react";
import messaging from "@react-native-firebase/messaging";
import * as Notifications from "expo-notifications";
import * as Permissions from 'expo-permissions';
import * as Updates from 'expo-updates';
import { Alert, Platform, Linking, AppState } from "react-native";
import { PermissionsAndroid } from 'react-native';
import { checkAppVersion } from "./root/other/helperFunctions";

export default function App() {
    const [publishableKey, setPublishableKey] = useState("");

    useEffect(() => {

        async function getPublishableKey() {
            let data = {
                "type": "card"
            }
            await fetch(Urls.getStripePublicKey, {

                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json()
                ).then(Data => {
                    if (Data.status <= 200) {
                        setPublishableKey(Data.data)
                    }


                }).catch(err => {
                    console.log("publishble key errorrrr===>", err.message)
                })
        }

        // getPublishableKey().then(r => console.log("publishabe key error",r))
    }, []);

    useEffect(() => {
        registerForFCMPushNotifications()
    }, []);

    const registerForFCMPushNotifications = async () => {
        try {
            const authorizationStatus = await messaging().requestPermission();
            if (authorizationStatus) {
                const token = await messaging().getToken();
                console.log("token", token)
            }
        } catch {
            console.log("error in getting token")
            Alert.alert("Error", "User has denied the permission for push notifications. Please enable it from settings.")
        }
    }




    //listen for notifications
    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
        });

        return unsubscribe;
    }, []);





    async function registerForPushNotifications() {
        try {
            const { status } = await Notifications.getPermissionsAsync();
            if (status !== 'granted') {
                const { status: newStatus } = await Notifications.requestPermissionsAsync();
                if (newStatus === 'granted') {
                    // Permission granted
                    const token = (await Notifications.getExpoPushTokenAsync()).data;
                    console.log('Expo Push Token:', token);

                } else {
                    // Permission denied
                    console.log('Permission to send notifications denied');
                }
            } else {
                // Permission already granted
                const token = (await Notifications.getExpoPushTokenAsync()).data;
                console.log('Expo Push Token:', token);
            }
        } catch (error) {
            console.error('Error requesting notification permission:', error);
        }
    }



    // Set up the notification handler for the app
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
        }),
    });

    // Handle user clicking on a notification and open the screen
    const handleNotificationClick = async (response) => {
        console.log("handleNotificationClick", response);
        const screen = response?.notification?.request?.content?.data?.screen;
        if (screen !== null) {
            // navigation.navigate(screen);
        }
    };

    // Listen for user clicking on a notification
    const notificationClickSubscription =
        Notifications.addNotificationResponseReceivedListener(
            handleNotificationClick
        );

    // Handle user opening the app from a notification (when the app is in the background)
    messaging().onNotificationOpenedApp((remoteMessage) => {
        console.log(
            "Notification caused app to open from background state:",
            remoteMessage.data.screen,
            // navigation
        );
        if (remoteMessage?.data?.screen) {
            // navigation.navigate(`${remoteMessage.data.screen}`);
        }
    });


    // Check if the app was opened from a notification (when the app was completely quit)
    messaging()
        .getInitialNotification()
        .then((remoteMessage) => {
            if (remoteMessage) {
                console.log(
                    "Notification caused app to open from quit state:",
                    remoteMessage.notification
                );
                if (remoteMessage?.data?.screen) {
                    // navigation.navigate(`${remoteMessage.data.screen}`);
                }
            }
        });

    // Handle push notifications when the app is in the background
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        console.log("Message handled in the background!", remoteMessage);
        const notification = {
            title: remoteMessage.notification.title,
            body: remoteMessage.notification.body,
            data: remoteMessage.data, // optional data payload
        };

        // Schedule the notification with a null trigger to show immediately
        await Notifications.scheduleNotificationAsync({
            content: notification,
            trigger: null,
        });
    });


    useEffect(() => {
        return messaging().onMessage(async remoteMessage => {
            console.log("remoteMessage", remoteMessage)

            const notification = {
                title: remoteMessage.notification.title,
                body: remoteMessage.notification.body,
                data: remoteMessage.data, // optional data payload
            };

            await Notifications.scheduleNotificationAsync({
                content: notification,
                trigger: null,
            });


        });
    }, []);


    return (
        <>
            <MenuProvider>
                <LoadingProvider>
                    <SessionProvider>

                        <StripeProvider publishableKey={publishableKey}>
                            <NavigationContainer>
                                <Root />
                            </NavigationContainer>
                        </StripeProvider>
                    </SessionProvider>
                </LoadingProvider>
            </MenuProvider>
            <Toast />
        </>
    );
}

