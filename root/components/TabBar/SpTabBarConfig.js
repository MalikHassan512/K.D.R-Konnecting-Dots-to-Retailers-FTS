import {Feather, FontAwesome, Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import COLOR from "../../Styles/Color";


export default function SpTabBarConfig(focused, size, route) {
    const color = focused ? COLOR.primary : "black";
    switch (route.name) {
        case 'SpHomeEntry':
            return <Ionicons name="md-home-outline" size={size} color={color}/>;
        case 'SpProductsEntry':
            return <Feather name="codesandbox" size={size} color={color}/>
        case 'AddProductsEntry':
            return <Ionicons name="chatbubbles-outline" size={size} color={color}/>;
        case 'SpOrdersEntry':
            return <FontAwesome name="opencart" size={size} color={color}/>
        case 'SpSettingsEntry':
            return <Ionicons name="md-settings-outline" size={size} color={color}/>;
        case 'EntryChat':
            return <Ionicons name="chatbubbles-outline" size={size} color={color}/>;
        default:
            return <Ionicons name="md-settings-outline" size={size} color={color}/>;
    }

}

function getScreenName(routeName) {
    switch (routeName) {
        case 'SpHomeEntry':
            return "Home";
        case 'SpProductsEntry':
            return "Products";
        case 'AddProductsEntry':
            return "Add Product";
        case 'SpOrdersEntry':
            return "Orders";
        case 'SpSettingsEntry':
            return "Settings";
        default:
            return "Home";
    }
}

export {
    getScreenName
}