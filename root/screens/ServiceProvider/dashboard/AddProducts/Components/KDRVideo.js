import TextKdr from "../../../../../components/Text";
import HEADINGS from "../../../../../Styles/heading";
import {ResizeMode, Video} from "expo-av";
import {StyleSheet, View} from "react-native";
import {useRef, useState} from "react";
import Urls from "../../../../../other/Urls";
import URLS from "../../../../../API/USER/URLS";


export default function KDRVideo(props) {
    const video = useRef(null);
    const [videoStatus, setVideoStatus] = useState({});
    return (
        <View
            style={{
                width: '100%',
                height: 250,
            }}
        >
            <TextKdr style={[styles.heading, HEADINGS.H3]}>About K.D.R</TextKdr>
            <Video
                ref={video}
                style={{
                    marginTop: 10,
                    width: '100%',
                    height: 200,
                }}

                source={{
                    uri: "https://kdr-storage.s3.eu-north-1.amazonaws.com/media/kdrVideo.mp4",
                }}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
                isMuted={false}

                onPlaybackStatusUpdate={status => setVideoStatus(() => status)}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    }, contentContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',

    },
    content: {
        width: "48%",
        marginTop: 10,
    }
});