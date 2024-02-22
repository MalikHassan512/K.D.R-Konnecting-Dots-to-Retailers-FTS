import { useEffect } from "react";
import {StyleSheet, View} from "react-native";
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";


export default function MapLocationComponent({navigation, Latitude, onPressMarker,title, Longitude, style, ...props}) {
    let InitalRegion = Longitude && Latitude ? {
        latitude: Latitude,
        longitude: Longitude,
        latitudeDelta: 0.0022,
        longitudeDelta: 0.0021,
    }: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0,
        longitudeDelta: 0.0,
    }


    return (
        <View style={[styles.container, style]}>
            <MapView style={styles.map}
                       initialRegion={InitalRegion}
                       region={InitalRegion}
                     provider={ PROVIDER_GOOGLE }

                     userInterfaceStyle={"dark"}>
                <Marker
                    onPress={onPressMarker}
                    coordinate={InitalRegion}
                    title={title}
                />
            </MapView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 200,
        padding: 5,
        borderRadius: 10,
    },
    map: {
        width: '100%',
        height: '100%',

    },
});