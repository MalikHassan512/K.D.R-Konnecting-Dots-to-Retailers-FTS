import {
    ImageBackground,
    Modal,
    StyleSheet, Text,
    View,
} from "react-native";
import React from "react";
import LottieView from 'lottie-react-native';

const LoadingModal = (props) => {
    let setModalVisible = props.setVisible
    let modalVisible = props.visible
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.visible}
            onRequestClose={() => {
                // setModalVisible(!modalVisible);
            }}
        >
            <ImageBackground  blurRadius={8}
                             style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                <View style={styles.Card}>
                    <LottieView
                        autoPlay
                        style={{
                            width: 200,
                            height: 200,
                        }}
                        source={require('../../assets/anim/loading.json')}
                    />
                </View>

            </ImageBackground>
        </Modal>
    );
};

export default LoadingModal;

const styles = StyleSheet.create({
    InputsContainer: {
        // flex: 1,
        // borderWidth:1,
        width: "100%",
        paddingHorizontal: 10,
        paddingTop: 15,
        // marginTop:30
    },
    container: {
        backgroundColor: "#EFEFEF",
        width: "100%",
        height: 50,
        borderRadius: 7,
        justifyContent: "center",
        alignItems: "center",
    },
    Card: {
        padding: 10,
        paddingTop: 20,
        borderRadius: 10,
        width: "70%",

        alignItems: "center",
        justifyContent: "center"

    }
});
