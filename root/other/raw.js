import Toast from "react-native-toast-message";
import * as Location from 'expo-location';
import API_URLS from "../API/USER/URLS";
import mime from "mime";
import {Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';
async function getCurrentLocation() {
    let {status} = await Location.requestForegroundPermissionsAsync();
    return new Promise((resolve, reject) => {
        if (status !== "granted") {
            reject("Permission to access location was denied")
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: "Permission to access location was denied"
            });
        }
        let location = Location.getCurrentPositionAsync({});
        resolve(location);
    })
}

export function JsonToQueryString(json) {
    // remove null values
    Object.keys(json).forEach(function (key) {
        if (json[key] === null || json[key] === undefined) {
            delete json[key];
        }
    });
    return '?' +
        Object.keys(json).map(function (key) {
            return encodeURIComponent(key) + '=' +
                encodeURIComponent(json[key]);
        }).join('&');
}

export function getUrl(uri) {


    try {
        if (uri === null || uri === undefined) {
            return {
                uri:"https://kdr-storage.s3.amazonaws.com/media/default.png"
            };
        }
        if (uri.startsWith("/")) {
            uri = uri.substring(1);
        }


        return uri.includes("http") ?
            {
                uri: uri
            } :
            {
                uri: API_URLS.images + uri
            }

    }catch (E){
        return {
            uri:"https://kdr-storage.s3.amazonaws.com/media/default.png"
        }
    }


}


export const getImageUrl = (uri) => {
    let file = {
        uri: uri,
        name: uri.split("/").pop(),
        type: mime.getType(uri)
    }
    return file
}

export function getRandColor() {

    return "#"+((1<<24)*Math.random()|0).toString(16)
}

export function getFileNameFromURL(url) {
    const parts = url.split('/');
    return parts[parts.length - 1];
  }
  
  const saveToDevice = async (file) => {
    const filename = getFileNameFromURL(file);
    const result = await FileSystem.downloadAsync(
        file,
      FileSystem.documentDirectory + filename
    );
    console.log(result);

    save(result.uri, filename, result.headers["Content-Type"]);
  };



  const save = async (uri, filename, mimetype) => {
    if (Platform.OS === "android") {
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
        await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, mimetype)
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
          })
          .catch(e => console.log(e));
      } else {
        shareAsync(uri);
      }
    } else {
      shareAsync(uri);
    }
  };
  export {saveToDevice}
export default getCurrentLocation;