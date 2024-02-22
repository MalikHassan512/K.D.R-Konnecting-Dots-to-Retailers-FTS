import React from 'react';
import { StyleSheet ,View} from 'react-native';
import colors from '../../config/colors';

function ListItemSeparator({style}) {
    
            return (
              <View
                style={[styles.seprator,style]}
              />
          
    );
}

export default ListItemSeparator;
const styles = StyleSheet.create({
    seprator:{
  
        height: 1,
        width: "100%",
        backgroundColor: colors.light,
      
      }
})
