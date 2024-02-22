import {createStackNavigator} from '@react-navigation/stack';
import SpHome from "./screens/Home";
import AddProduct1 from "../AddProducts/screens/AddProduct1";
import AddProduct2 from "../AddProducts/screens/AddProduct2";
import AddProduct3 from "../AddProducts/screens/AddProduct3";
import ServiceAdded from "../AddProducts/screens/ServiceAdded";
import Plans from "./screens/Plans";
import MakePayment from "./screens/MakePayment";
import ServiceDetailScreen from "../../../User/dashboard/Home/Screens/ServiceDetail";
import ServiceDetailScreenSP from "./screens/ServiceDetailSP";

const Stack = createStackNavigator();


export default function SpHomeEntry(props) {

    return (
        <Stack.Navigator
            initialRouteName="SpHome"
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen name="SpHome" component={SpHome}/>
            <Stack.Screen name="ServiceDetailScreen" component={ServiceDetailScreenSP}/>
            <Stack.Screen name="Plans" component={Plans} />
            <Stack.Screen name="MakePayment" component={MakePayment}/>


        </Stack.Navigator>
    )
}