import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { Image } from 'react-native';
import { View, StyleSheet } from 'react-native';
import { getFileNameFromURL, saveToDevice } from '../../other/raw';
import COLOR from '../../Styles/Color';
import { ResizeMode, Video } from 'expo-av';
import TextKdr from '../Text';
import FLEX_STYLE from '../../Styles/FLEXSTYLE';
import HEADINGS from '../../Styles/heading';

function checkType(file){
if([".mp4",".avi"].some(x=>file.endsWith(x)))
return "video"
else if([".jpeg",".jpg","png","gif"].some(x=>file.endsWith(x)))
return "image"
else
return "file"
}
const FileMessage = ({file}) => {
    const type=checkType(file)
    console.log(type,file,"type");
    return (
        (type==="file")?<FileDownload file={file}/>
        :<ImageOrVideo file={file} type={type}/>
    );
};

const ImageOrVideo=({file,type})=>{
    return (

    <View style={styles.photoVideoContainer}>
        {(type=="video")?
                <Video
                style={{
                    marginTop: 10,
                    width: 200,
                    height: 200,
                }}

                source={{
                    uri:file,
                }}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
                isMuted={false}

                // onPlaybackStatusUpdate={status => setVideoStatus(() => status)}
            />:
        <Image source={{uri:file}} style={{width:200,height:200}}/>
    }
    <MaterialCommunityIcons name='download' color={COLOR.gray_700} size={40} onPress={()=>saveToDevice(file)} style={styles.downloadButton}/>
</View>
    )
}
const FileDownload=({file})=>{
    return (

    <View style={{...FLEX_STYLE.row,...FLEX_STYLE.center,...FLEX_STYLE.rap}}>
<TextKdr style={{...HEADINGS.H2,width:"80%",...FLEX_STYLE.rap}}>{getFileNameFromURL(file)}</TextKdr>
    <MaterialCommunityIcons name='download' color={COLOR.gray_700} size={35} onPress={()=>saveToDevice(file)} />
</View>
    )
}

const styles = StyleSheet.create({
    photoVideoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    downloadButton:{
        position:"absolute",
        top:7,
        right:5
    }
});

export default FileMessage;