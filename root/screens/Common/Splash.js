import { View, Text, Image, StyleSheet, StatusBar } from 'react-native'
import React, {useEffect, useState} from 'react'
import colors from '../../config/colors'
import ProgressBar from 'react-native-progress/Bar'



const Splash = () => {
    const [loadingProgress, setLoadingProgress] = useState(0)
    const [animationDone, setAnimationDone] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
          setLoadingProgress((prevProgress) => {
            const newProgress = prevProgress + 0.28;
            return newProgress >= 1 ? 1 : newProgress;
          });

          if (loadingProgress === 1) {
            setAnimationDone(true);
            
          }
        }, 500)
    
        return () => clearInterval(interval);
      }, []);


      
    
  return (
    <>
    <StatusBar backgroundColor={colors.black} barStyle='default' />
    <View style={styles.container} >

        <View style={styles.topHeight} />

        <Image
        source={require("../../../assets/splashLogoKDR.png")}
        style={styles.logo}
        resizeMode='contain'
        />

        <View style={styles.progressSection} >
        <Text style={styles.text}>Konnecting Dots for Retailers</Text>
        <ProgressBar
        progress={loadingProgress}
        width={250}
        height={3}
        color={colors.danger}
        />

        </View>


    </View>
    </>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        // backgroundColor:colors.splashBg,
        backgroundColor:'#131414',
        alignItems:'center'
    },
    progressSection:{
        alignItems:'center',
        justifyContent:'center',
        marginTop:"50%"
    },
    topHeight:{
        height:"32%"
    },
    logo:{ width: "31%", 
    height: '22%', },
    text:{color:colors.white, fontSize:20, marginBottom:10},
    kdrText:{color:colors.danger, fontSize:45, marginTop:-40}
})


export default Splash