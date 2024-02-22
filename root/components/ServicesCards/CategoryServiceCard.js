import {StyleSheet, Pressable, Image,Platform, View, TouchableOpacity} from "react-native";
import SHADOWS from "../../Styles/shadows";
import TextKdr from "../Text";
import BORDER_STYLE from "../../Styles/Border";
import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';





const ImageSize = 70;

export default function CategoryServiceCard({navigation, source, onPress, title, ...props}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);


    return ( <>
        <Pressable style={[styles.container, SHADOWS.shadowSm,]} onPress={onPress} {...props}>
            <TouchableOpacity onPress={()=>setModalVisible(true)}>
            <Image source={source} style={[styles.image]} />
            </TouchableOpacity>

        <TextKdr style={styles.title}>{title}</TextKdr>
      </Pressable>

      <Modal visible={modalVisible} transparent={true} onRequestClose={() => setModalVisible(false)}>
        <ImageViewer
          imageUrls={[{ url: source.uri }]} 
          index={imageIndex}
          enableSwipeDown={true}
          onSwipeDown={() => setModalVisible(false)}
        //   enableSwipeDown={true}
        //   onSwipeDown={() => setModalVisible(false)}
          renderIndicator={() => null}
        />
      </Modal>
    </>

        // <Pressable style={[styles.container, SHADOWS.shadowSm]} onPress={onPress} {...props}>
        //     <Image source={source} style={[styles.image,]}/>
        //     <TextKdr style={styles.title}>{title}</TextKdr>
        // </Pressable>
    )

}



const styles = StyleSheet.create({
    container: {
        width: 120,
        borderRadius: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingVertical: 10,
        marginHorizontal: 4,
    }, image: {
        width: ImageSize,
        height: ImageSize,
        borderRadius: ImageSize / 2,
    },
    title: {
        marginTop: 20,
        fontSize:12,
        marginHorizontal:10,
        textAlign:"center",
        // fontWeight:"normal",
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
        
    }
});