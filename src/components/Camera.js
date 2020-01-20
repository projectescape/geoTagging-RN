import React, { useState, useEffect, useContext } from "react";
import { Text, View, TouchableOpacity, Dimensions } from "react-native";
import { Camera } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";
import LocationContext from "../context/LocationContext";

export default function App({ recStatus, setRecStatus }) {
  let myCam = null;
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camImgName, setCamImgName] = useState(null);
  const [timeStamp, setTimeStamp] = useState(null);

  const { pathArray, resetPathArray } = useContext(LocationContext);

  //   For Camera Permission
  useEffect(() => {
    (async () => {
      const { status } =
        (await Camera.requestPermissionsAsync()) &&
        (await MediaLibrary.requestPermissionsAsync()) &&
        (await Permissions.askAsync(Permissions.AUDIO_RECORDING));
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    if (recStatus) setTimeStamp(Date.now());
  }, [recStatus]);

  //   For Recording Video
  useEffect(() => {
    if (myCam)
      (async () => {
        if (recStatus) {
          const dat = await myCam.recordAsync({ quality: "480p" });
          //   Renaming from .mp4 to .geo.mp4
          const newAdd =
            dat.uri.slice(0, dat.uri.lastIndexOf(".mp4")) + ".geo.mp4";
          await FileSystem.moveAsync({ from: dat.uri, to: newAdd });
          const asset = await MediaLibrary.createAssetAsync(newAdd);
          const album = await MediaLibrary.getAlbumAsync("geoLocation");
          if (!album) {
            const temp = await MediaLibrary.createAlbumAsync(
              "geoLocation",
              asset,
              false
            );
          } else {
            const temp = await MediaLibrary.addAssetsToAlbumAsync(
              [asset],
              album,
              false
            );
          }
          setCamImgName(
            newAdd.slice(
              newAdd.lastIndexOf("/") + 1,
              newAdd.lastIndexOf(".geo")
            )
          );
        } else {
          myCam.stopRecording();
        }
      })();
  }, [recStatus]);

  // For recording path
  useEffect(() => {
    if (camImgName) {
      (async () => {
        const filename =
          (await FileSystem.cacheDirectory) + camImgName + ".geo";
        const data = await FileSystem.writeAsStringAsync(
          filename,
          JSON.stringify({ timeStamp, pathArray })
        );
        const asset = await MediaLibrary.createAssetAsync(filename);
        const album = await MediaLibrary.getAlbumAsync("geoLocation");
        const temp = await MediaLibrary.addAssetsToAlbumAsync(
          [asset],
          album,
          false
        );
        resetPathArray();
        setCamImgName(null);
      })();
    }
  }, [camImgName]);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View
      style={{ flex: 1, flexDirection: "row", justifyContent: "space-around" }}
    >
      <View style={{ aspectRatio: 3 / 4 }}>
        <Camera
          style={{ flex: 1 }}
          type={type}
          ratio="4:3"
          useCamera2Api
          ref={ref => {
            myCam = ref;
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "row"
            }}
          />
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "row"
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-around"
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setRecStatus(!recStatus);
                }}
              >
                <MaterialIcons
                  name={!recStatus ? "videocam" : "stop"}
                  size={100}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "row"
            }}
          >
            {!recStatus ? (
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: "flex-end",
                  alignItems: "center"
                }}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
              >
                <MaterialIcons name="switch-camera" color="white" size={40} />
              </TouchableOpacity>
            ) : null}
          </View>
        </Camera>
      </View>
    </View>
  );
}
