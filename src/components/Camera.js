import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Dimensions } from "react-native";
import { Camera } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  let myCam;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

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
                alignItems: "center",
                borderColor: "purple",
                borderWidth: 2,
                width: "100%",
                flexDirection: "row"
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderColor: "red",
                  borderWidth: 2,
                  flex: 1
                }}
                onPress={async () => {
                  const dat = await myCam.getSupportedRatiosAsync();
                  console.log(dat);
                }}
              >
                <MaterialIcons name="camera" size={150} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderColor: "red",
                  borderWidth: 2,
                  flex: 1
                }}
                // onPress={() => {
                //   setRecStatus(!recStatus);
                // }}
              >
                <MaterialIcons
                  //   name={!recStatus ? "videocam" : "stop"}
                  name="videocam"
                  size={150}
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
            <TouchableOpacity
              style={{
                flex: 0.1,
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
              <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
                Flip
              </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    </View>
  );
}
