import {Octicons} from '@expo/vector-icons';
import {StyleSheet, Image, View, Pressable} from "react-native";
import SearchInput from "../../SearchInput/SearchInput";
import Constants from 'expo-constants';
import {StatusBar} from "expo-status-bar";

const Size = 24;

export default function UserHomeTitleBar({navigation, ...props}) {

    return (
        <Pressable style={[styles.container]}>
            <StatusBar translucent={true} backgroundColor={"black"} style="light"/>
            <Image style={styles.logo} source={require("../../../../assets/img/logo.png")}/>
            <SearchInput onPress={()=>{
                navigation.navigate("CategoryService")
            }}  editable={false} />
            {/*<Octicons name="three-bars" size={24} color="white"/>*/}
        </Pressable>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: Constants.statusBarHeight + 10,
        paddingVertical: 15,
        backgroundColor: "#000000",
        paddingHorizontal: 20,
    },
    logo: {
        width: 40,
        height: 25,
    }
});