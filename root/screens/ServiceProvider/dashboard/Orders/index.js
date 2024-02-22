import {createStackNavigator} from '@react-navigation/stack';
import SpOrders from "./screens/SpOrders";
import OrderDetailScreenSp from "./screens/OrderDetailScreenSp";

const Stack = createStackNavigator();


export default function SpOrdersEntry(props) {

    return (
        <Stack.Navigator
            initialRouteName="SpOrders"
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen name="SpOrders" component={SpOrders}/>
            <Stack.Screen name="SpOrderDetail" component={OrderDetailScreenSp}/>

        </Stack.Navigator>
    )
}