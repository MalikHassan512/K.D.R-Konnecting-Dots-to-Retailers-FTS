import {StyleSheet, Pressable, View, Image, TouchableOpacity} from "react-native";
import SHADOWS from "../../Styles/shadows";
import TextKdr from "../Text";
import {Ionicons} from "@expo/vector-icons";
import React, { useState } from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Modal } from 'react-native';


const ImageSize = 150;

export default function ServiceCard({
                                        navigation,
                                        style,
                                        source,
                                        onPress,
                                        totalService,
                                        title,
                                        ...props
                                    }) {
                                        
    const [modalVisible, setModalVisible] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);



    return (<>
        <Pressable style={[styles.container, SHADOWS.shadowSm, style]} onPress={onPress} {...props}>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.touchableOpacity}>
        <Image source={source} style={styles.image} />
      </TouchableOpacity>
            <TextKdr style={styles.title}>{title}</TextKdr>
            <TextKdr style={[styles.title, {fontWeight: "300",fontSize:12,marginBottom:7}]}>{totalService} Services</TextKdr>

        </Pressable>

        <Modal visible={modalVisible} transparent={true} onRequestClose={() => setModalVisible(false)}>
        <ImageViewer
        // saveToLocalByLongPress={yes}
          imageUrls={[{ url: source.uri }]} 
        enableSwipeDown={true}
          onSwipeDown={() => setModalVisible(false)}
          renderIndicator={() => null}
        // renderIndicator={(currentIndex, allSize) => null} // Hide the index number
        />
      </Modal>
    </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: ImageSize,
        borderRadius: 7,
        backgroundColor: 'white',
        alignItems: 'center',
        marginLeft: 5,

    }, 
    touchableOpacity: {
        flex: 1,
        width: '100%',
      },
      image: {
        width: "100%",
        height: 170,
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
    },
    title: {
        marginTop: 5,
        textAlign: 'left',
        width: "100%",
        paddingHorizontal: 10,
        fontSize: 16,
        fontWeight: '400',
    },
    price: {
        flexDirection: "row",
        paddingVertical: 5,
        marginHorizontal: 10,
        paddingBottom: 10,
    }
});