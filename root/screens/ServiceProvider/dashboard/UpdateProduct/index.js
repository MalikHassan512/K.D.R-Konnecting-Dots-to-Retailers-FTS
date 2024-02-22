import {createStackNavigator} from '@react-navigation/stack';
import AddProduct1 from "./screens/AddProduct1";
import AddProduct2 from "./screens/AddProduct2";
import AddProduct3 from "./screens/AddProduct3";
import ServiceAdded from "./screens/ServiceAdded";

const Stack = createStackNavigator();


export default function UpdateProductsEntry(props) {

    return (
        <Stack.Navigator
            initialRouteName="UpdateProduct1"
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen name="UpdateProduct1" component={AddProduct1}/>
            <Stack.Screen name="UpdateProduct2" component={AddProduct2}/>
            <Stack.Screen name="UpdateProduct3" component={AddProduct3}/>
            <Stack.Screen name="ServiceUpdated" component={ServiceAdded}/>
        </Stack.Navigator>
    )
}