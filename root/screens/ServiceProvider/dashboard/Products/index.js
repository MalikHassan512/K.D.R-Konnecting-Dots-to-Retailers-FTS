import {createStackNavigator} from '@react-navigation/stack';
import SpProducts from "./screens/SpProducts";
import ServiceDetailScreenSP from "../Home/screens/ServiceDetailSP";

const Stack = createStackNavigator();


export default function  SpProductsEntry(props) {

    return (
        <Stack.Navigator
            initialRouteName="SpProducts"
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen name="SpProducts" component={SpProducts}/>
            <Stack.Screen name="ServiceDetailScreen2" component={ServiceDetailScreenSP}/>


        </Stack.Navigator>
    )
}