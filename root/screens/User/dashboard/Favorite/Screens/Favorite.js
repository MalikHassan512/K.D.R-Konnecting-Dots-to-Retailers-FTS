import {StyleSheet, View, ScrollView} from "react-native";
import TitleBar from "../../../../../components/TitleBar/TitleBar";
import TopReviewedProduct from "../../Home/Component/TopReviewedProduct";
import FavoriteMain from "./component/FavoriteMain";


export default function Favorite({navigation, ...props}) {

    return (
        <View style={[styles.container]}>
            <TitleBar navigation={navigation} title={"Favorites"}/>
            <View nestedScrollEnabled={true} style={[styles.mainContainer]}
                        contentContainerStyle={{paddingBottom: 30}}>
                <FavoriteMain navigation={navigation}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, flexDirection: 'column',
    }, mainContainer: {
        flex: 1, flexDirection: 'column', backgroundColor: '#f5f4f4',


    }, Contact: {
        justifyContent: "center", flexDirection: "row"
    }
});