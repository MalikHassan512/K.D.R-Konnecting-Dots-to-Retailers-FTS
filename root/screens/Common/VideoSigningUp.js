import {StyleSheet, View} from "react-native";
import TextKdr from "../../components/Text";
import FLEX_STYLE from "../../Styles/FLEXSTYLE";
import HEADINGS from "../../Styles/heading";
import {ResizeMode, Video} from "expo-av";
import React from "react";
import RoundButtonKdr from "../../components/Button/roundButton";
import {Feather, Ionicons} from "@expo/vector-icons";
import COLOR from "../../Styles/Color";
import Shadows from "../../Styles/shadows";
import URLS from "../../API/USER/URLS";

export default function VideoSigningUp({navigation, ...props}) {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});

    return (
        <View style={[styles.container]}>
            <View style={[FLEX_STYLE.center, styles.textWrraper]}>
                <TextKdr style={[HEADINGS.H1, styles.heading]}>Thanks for Signing Up!</TextKdr>
                <TextKdr style={[HEADINGS.p, styles.subHeading]}>Your profile is currently under review. We appreciate your patience, and we will notify you via email once the verification process is complete. If you have any urgent queries, feel free to reach out to our support team. Thank you!</TextKdr>
            </View>
            <Video
                ref={video}
                style={{
                    marginTop: 10,
                    width: '100%',
                    height: 200,
                }}

                source={{
                    uri: URLS.images+"/media/kdrVideo.mp4",
                }}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
                isMuted={false}

                onPlaybackStatusUpdate={status => setStatus(() => status)}
            />

            <View style={[FLEX_STYLE.center]}>
                <RoundButtonKdr ButtonSize={50}
                                onPress={() => {
                                    navigation.reset({
                                        index: 0,
                                        routes: [{name: 'WelcomeScreen'}],
                                    })
                                }}

                                style={[
                                    FLEX_STYLE.center,
                                    styles.button,
                                    Shadows.shadowSm
                                ]}>
                    <Feather name="arrow-right" size={24} color="white"/>
                </RoundButtonKdr>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111111',
        justifyContent: "center",
    },
    heading: {
        color: "#fff",
        textAlign: "center",
    },
    subHeading: {
        color: "#fff",
        textAlign: "center",
    },
    textWrraper: {
        marginHorizontal: 40,
        marginTop: -110,

    },
    video: {
        width: "100%",
        height: 200,
        marginTop: 20,
    },
    button: {
        backgroundColor: COLOR.primary,
        borderWidth: 0,
        marginTop: 20,
    }
});