import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Linking, Modal, StyleSheet, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HEADINGS from '../../Styles/heading';

const RateOurApp = () => {
    const [isVisible, setIsVisible] = useState(false);
    // AsyncStorage.removeItem('rateModal')
  // AsyncStorage.getItem('rateModal').then(x=>{
  //       console.log(x);
  //   })
    useEffect(() => {
      AsyncStorage.getItem('rateModal')
        .then((value) => {
          if (value&&value !== "no") {
         
                const tenDaysInMilliseconds = 10 * 24 * 60 * 60 * 1000; // 10 days in milliseconds
                if ( Date.now() - parseInt(value) >= tenDaysInMilliseconds) {
                  setIsVisible(true);
                }
         
          }
          else if(!value)
          setIsVisible(true)
        })
        .catch((error) => {
          console.error('Error reading AsyncStorage:', error);
        });
    }, []);
  
    const handleUserChoice = (choice) => {
        const now = Date.now();
  
  
        setIsVisible(false);
      AsyncStorage.setItem('rateModal', choice==="yes"?now.toString():"no")
        .then(() => {
          if (choice === 'open') {
            openAppStore();
          }
        })
        .catch((error) => {
          console.error('Error writing to AsyncStorage:', error);
        });
    };
  
    const openAppStore = () => {
        let appStoreUrl = '';
        if (Platform.OS === 'android') {
          // appStoreUrl = 'https://play.google.com/store/apps/details?id=com.lunatech1.kdr';
          appStoreUrl = 'https://play.google.com/store/apps/details?id=com.lunatech1.kdr&hl=en&gl=US'
        } else if (Platform.OS === 'ios') {
          // Replace 'your-ios-app-id' with the actual iOS app ID
          // appStoreUrl = 'https://apps.apple.com/app/com.lunatech1.kdr';
          appStoreUrl = 'https://apps.apple.com/pk/app/kdr/id6459108320'
        }
      
        Linking.openURL(appStoreUrl)
          .then(() => {
            // Handle success (the app store page opened successfully)
            console.log('App store opened', appStoreUrl);
          })
          .catch((error) => {
            console.error('Could not open app store:', error);
          });
      };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onDismiss={() =>{
        
        handleUserChoice('yes')
        }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={{...HEADINGS.H2}}>Enjoying our app?</Text>
          <Text style={{...HEADINGS.H4}}>Please rate us on the Play Store!</Text>
          <TouchableOpacity onPress={() => handleUserChoice('open')} style={styles.rateButton}>
            <Text style={{...HEADINGS.H3}}>Rate Now</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleUserChoice('no')} style={styles.dontRateButton}>
            <Text>Don't Show Again</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleUserChoice('yes')} style={styles.closeButton}>
            <Text>Remind me Later</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  rateButton: {
    marginTop: 10,
  },
  dontRateButton: {
    marginTop: 10,
    color: 'red',
  },
  closeButton: {
    marginTop: 10,
  },
});
export default RateOurApp