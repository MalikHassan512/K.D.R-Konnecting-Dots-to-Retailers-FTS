import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View,TouchableHighlight } from 'react-native';
import colors from '../../config/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TextKdr from '../Text';

function ListItem({image,title,subTitle,IconComponent,styleImage,titleStyle,subTitleStyle,onPress,onDelete,style}) {
    return (
   



<TouchableHighlight underlayColor={colors.light} onPress={onPress}>
        <View style={[styles.container,style]}>
          
  {IconComponent}

       {image&& <Image resizeMode='contain' style={[styles.image,styleImage]}  source={image} />}
    
        <View style={styles.content}>
    
            <TextKdr style={[styles.title,titleStyle]} 
            numberOfLines={1}
            >{title}</TextKdr>
            {subTitle&&<TextKdr style={[styles.subTitle,subTitleStyle]}  numberOfLines={2}>{subTitle}</TextKdr>}
    
        </View>
       {onDelete? (<TouchableOpacity onPress={onDelete}> 
       <MaterialCommunityIcons name="trash-can" size={50} backgroundColor="white" color={colors.medium} /></TouchableOpacity>)
       :onPress&&<MaterialCommunityIcons name="chevron-right" size={40} backgroundColor="white" color={colors.medium} />}
     
       
                </View>
                </TouchableHighlight>
            


    );
}

export default ListItem;
const styles = StyleSheet.create({
    container:{
        alignItems: "center",
        flexDirection: "row",
        padding: 15,
        backgroundColor: colors.white,
    },

    image:{
        height:70,
        width:70,
        alignSelf:"center",
        borderRadius:35
      
    },
    content:{
          flex: 1,
    marginLeft: 10,
    justifyContent: "center",
    },
    title:{
color:colors.dark,
fontWeight:"400"
    },
    subTitle:{
        color:colors.medium
        

    }

})