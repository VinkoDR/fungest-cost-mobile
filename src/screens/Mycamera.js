import React from "react";

import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import { useEffect, useRef, useState, useContext } from "react";
import { Camera, CameraType } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import Button from "../components/Button";
import MyModal from "../components/MyModal";
import { useNavigation } from "@react-navigation/native";
import "react-native-get-random-values";

import { v4 as uuidv4 } from "uuid";

import { Context } from "../contexts.js/Context";
import { b64toBlob } from "../utils/b64ToBlob";

function Mycamera() {
  const { image, setImage, imageInfoToSend, setImageInfoToSend } = useContext(Context);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  // const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef();
  const navigation = useNavigation();

  console.log(image, "from on load");

  //demander la permission d'utiliser la camera et l acces à la gallerie du tel
  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  //sauvegarder l image dans le tel =>
  const saveImage = async () => {
    if (image) {
      try {
        await MediaLibrary.createAssetAsync(image);
        alert("Picture saved");
        // setImage(null);
        deleteImage;
      } catch (e) {
        console.log(e);
      }
    }
  };
  // prendre et sauvegarder l'image prise par la camera dans le state image
  const takePicture = async () => {
    console.log("clicked");
    console.log("hasCameraPermission", hasCameraPermission);
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };
    if (cameraRef.current) {
      console.log("has cameraRef.current");

      try {
        console.log("is trying...");
        const data = await cameraRef.current.takePictureAsync(options);
        // console.log("data: ", Object.keys(data));
        // console.log("base64", data.base64)
        // var contentType = 'image/jpg';
        // var b64Data = data.base64;
        // var blob = b64toBlob(b64Data, contentType);
        // setImageInfoToSend(URL.createObjectURL(blob));

        
        setImage(data.uri);
      } catch (error) {
        console.log(error);
      }
      console.log(image, "image in context from takePicture()in myCamera.js");
    }
  };

  //continuer vers le formulaire
  const postImage = async (image) => {
    navigation.navigate("Form");
  };

  if (hasCameraPermission === false) {
    return <Text>You need to give permission to access camera</Text>;
  }
  return (
    <View style={styles.container}>
      {!image ? (
        <Camera
          style={styles.camera}
          type={type}
          flashMode={flash}
          ref={cameraRef}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 35,
            }}
          >
            <Button
              title={"Turn camera"}
              icon="retweet"
              onPress={() =>
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                )
              }
            />
            <Button
              title={"Flash  "}
              icon="flash"
              colorBg={
                flash === Camera.Constants.FlashMode.off ? "#f1f1f1" : "#FFFF04"
              }
              onPress={() =>
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
                )
              }
            />
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}
      <View>
        {!image ? (
          <Button
            title={"Take a picture"}
            icon="camera"
            colorText="white"
            onPress={takePicture}
            colorBg="blue"
          ></Button>
        ) : (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              paddingHorizontal: 20,
            }}
          >
            <Button
              title={"Re-take the picture"}
              icon="retweet"
              onPress={() => setImage(undefined)}
              colorText="white"
              colorBg="orange"
            />

            <Button
              title={"Fill form"}
              icon="pencil"
              onPress={() => postImage(image)}
              colorText="white"
              colorBg="blue"
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",
    backgroundColor: "black",
    color: "white",
    paddingBottom: 20,
  },
  camera: {
    flex: 1,
    color: "yellow",
  },
  text: {
    color: "white",
    fontWeight: "bolder",
  },
  buttonContainer: {
    backgroundColor: "#fff",
    alignSelf: "flex-end",
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
});
export default Mycamera;
