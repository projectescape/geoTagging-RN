import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Spinner } from "native-base";
import SplitPane from "../components/SplitPane";
import Map from "../components/Map";
import { withNavigationFocus } from "react-navigation";
import LocationContext from "../context/LocationContext";
import * as FileSystem from "expo-file-system";
import VideoPlayer from "../components/VideoPlayer";

const PlaybackScreen = ({ navigation, isFocused }) => {
  const asset = navigation.getParam("asset", null);
  const pathUri = navigation.getParam("pathUri", null);
  const { setPathArray, resetPathArray } = useContext(LocationContext);

  useEffect(() => {
    (async () => {
      if (isFocused) {
        const path = JSON.parse(await FileSystem.readAsStringAsync(pathUri));
        setPathArray(path.pathArray);
        // console.log(path);
      } else {
      }
    })();
  }, [isFocused]);

  if (pathUri === "") {
    return (
      <View
        style={{
          flex: 1,
          alignContent: "space-around"
        }}
      >
        <Spinner
          style={{
            flex: 1
          }}
          color="#333"
          size={40}
        />
      </View>
    );
  }

  return (
    <SplitPane
      childOne={<VideoPlayer asset={asset} />}
      childTwo={
        <Map
          shouldTrack={true}
          callback={() => {}}
          style={{ flex: 1 }}
          onRecordScreen={false}
        />
      }
    ></SplitPane>
  );
};

const styles = StyleSheet.create({});

export default withNavigationFocus(PlaybackScreen);
