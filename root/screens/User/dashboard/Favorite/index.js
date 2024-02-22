import {createStackNavigator} from '@react-navigation/stack';
import Favorite from "./Screens/Favorite";

const Stack = createStackNavigator();


export default function FavoriteEntry(props) {
    return (
        <Stack.Navigator
            initialRouteName="Favorite"
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen name="Favorite" component={Favorite}/>

        </Stack.Navigator>
    )
}