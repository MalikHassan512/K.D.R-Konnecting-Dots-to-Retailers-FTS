import {StyleSheet, View} from "react-native";
import TitleBar from "../../components/TitleBar/TitleBar";
import {ScrollView} from "react-native";
import TextKdr from "../../components/Text";
import WebView from "react-native-webview";
import TermsofServiceHTML from "../../../assets/settings/TermsofServiceHTML";

export default function TermsOfService({navigation, ...props}) {

    return (
        <View style={[styles.container]}>
            <TitleBar title="Terms of Service" navigation={navigation}/>
            <View style={{
                padding: 10,
                flex: 1,
                backgroundColor: '#fff',
            }}>
                <WebView
                    style={styles.WebViewStyle}
                    //Loading html file from project folder
                    source={{html:TermsofServiceHTML}}
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