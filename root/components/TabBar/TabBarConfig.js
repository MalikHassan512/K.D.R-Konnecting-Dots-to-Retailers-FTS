import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";


export default function TabBarConfig({focused, color, size, route}) {
    switch (route.name) {
        case 'EntryHome':
            return <Ionicons name="md-home-outline" size={size} color={color}/>;
        case 'EntryFavorite':
            return <Ionicons name="heart-outline" size={size} color={color}/>;
        case 'EntryChat':
            return <Ionicons name="chatbubbles-outline" size={size} color={color}/>;
        case 'EntrySettings':
            return <Ionicons name="person-outline" size={size} color={color}/>;
        default:
            return <Ionicons name="md-home-outline" size={size} color={color}/>;
    }

}