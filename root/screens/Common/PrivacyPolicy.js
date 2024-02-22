import {StyleSheet, View} from "react-native";
import TitleBar from "../../components/TitleBar/TitleBar";;
import WebView from "react-native-webview";
import PrivacyPolicyHtmlMain from "../../../assets/settings/PrivacyPolicyHtml";

export default function PrivacyPolicy({navigation, ...props}) {

    return (
        <View style={[styles.container]}>
            <TitleBar title="Privacy Policy" navigation={navigation}/>
            <View style={{
                padding: 10,
                flex: 1,
                backgroundColor: '#fff',
            }}>
                <WebView
                    style={styles.WebViewStyle}
                    //Loading html file from project folder
                    source={{html:  PrivacyPolicyHtmlMain}}
                    //Enable Javascript support
                    javaScriptEnabled={true}
                    //For the Cache
                    domStorageEnabled={true}
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    WebViewStyle: {

        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
});