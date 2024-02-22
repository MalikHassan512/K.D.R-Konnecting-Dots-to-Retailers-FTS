import VersionCheck from "react-native-version-check";
import { Alert,Linking } from "react-native";


export const checkAppVersion = async () => {
    try {
let currentVersion = await VersionCheck.getCurrentVersion()
let latestVersion = await VersionCheck.getLatestVersion()

console.log('currentVersion',currentVersion, 'latestVersion',latestVersion);

   if(currentVersion !== latestVersion){
          Alert.alert(
            "New Version Available",
            "Please update the app to the latest version for better experience",
            [
                 {
                      text: "Update",
                      onPress: () => {
                        if(Platform.OS === 'ios'){
                             Linking.openURL('https://apps.apple.com/pk/app/kdr/id6459108320')
                        }else{
                             Linking.openURL('https://play.google.com/store/apps/details?id=com.lunatech1.kdr&hl=en&gl=US')
                        }
                      }
                 }
            ]
          )
     }


      
    } catch (error) {
        console.log('error', error);
    }
};