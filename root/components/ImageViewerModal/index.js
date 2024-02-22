import { View, Text, Modal, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import ImageViewer from 'react-native-image-zoom-viewer';
import COLOR from '../../Styles/Color';

const ImageViewerModal = ({
    images,
    imageIndex,
    visible,
    onRequestClose,
    ...props
}) => {
  console.log("images in modal::>>",images)
  return (
    
      <Modal visible={visible} transparent={true} onRequestClose={onRequestClose}>
        <View style={{flex:1, backgroundColor:"black"}}>
      <ImageViewer
        imageUrls={[{ url: images?.uri }]} 
        // index={imageIndex}
        enableSwipeDown={true}
        onSwipeDown={onRequestClose}
        renderIndicator={() => null}
        loadingRender={() => <ActivityIndicator
          size="small" color={COLOR.primary}
           />}
        {...props}
      />
    </View>

      </Modal>
  )
}

export default ImageViewerModal