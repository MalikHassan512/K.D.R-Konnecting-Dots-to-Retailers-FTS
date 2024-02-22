import {createStackNavigator} from '@react-navigation/stack';
import AddProduct1 from "./screens/AddProduct1";
import AddProduct2 from "./screens/AddProduct2";
import AddProduct3 from "./screens/AddProduct3";
import ServiceAdded from "./screens/ServiceAdded";

const Stack = createStackNavigator();


export default function AddProductsEntry(props) {

    return (
        <Stack.Navigator
            initialRouteName="AddProduct1"
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen name="AddProduct1" component={AddProduct1}/>
            <Stack.Screen name="AddProduct2" component={AddProduct2}/>
            <Stack.Screen name="AddProduct3" component={AddProduct3}/>
            <Stack.Screen name="ServiceAdded" component={ServiceAdded}/>
        </Stack.Navigator>
    )
}