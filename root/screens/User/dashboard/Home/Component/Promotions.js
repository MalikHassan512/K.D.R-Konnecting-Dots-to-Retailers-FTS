import { View, StyleSheet, Image, Text, TouchableOpacity, Linking } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import { screenWidth } from '../../../../../other/diemensions';
import COLOR from '../../../../../Styles/Color';

const Promotions = ({ item, onPressImage, setCardImage }) => {

  return (
    <View style={styles.cardContainer} key={item?.id}>
      {item?.image && (
        <TouchableOpacity onPress={() => {
          onPressImage();
          setCardImage(item?.image)
        }
        }>
          <Image source={{ uri: item?.image }} style={styles.cardImage} />
        </TouchableOpacity>
      )}
      <View style={styles.cardContent}>
        <Text style={styles.title} numberOfLines={1}>{item?.title}</Text>
        <Text style={styles.description} numberOfLines={1}>{item?.description}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openURL(item?.link)}
        >
          <Text style={styles.buttonText}>Go to Promotion</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 5,
    width: screenWidth - 32,
    marginVertical: 10,
  },
  cardImage: {
    height: 100,
    width: screenWidth - 32,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: COLOR.primary,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: COLOR.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
})


export default Promotions