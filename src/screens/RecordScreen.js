// import "../_mockLocation";
import React, { useState, useCallback, useContext, useEffect } from "react";
import { Text, StyleSheet, Button } from "react-native";
import { SafeAreaView, withNavigationFocus } from "react-navigation";
import Map from "../components/Map";
import Camera from "../components/Camera";
import LocationContext from "../context/LocationContext";
import SplitPane from "../components/SplitPane";

const RecordScreen = ({ isFocused }) => {
  const [recStatus, setRecStatus] = useState(false);

  const {
    updateCurrentLocation,
    updatePathArray,
    pathArray,
    resetPathArray
  } = useContext(LocationContext);

  useEffect(() => {
    resetPathArray();
  }, [isFocused]);

  const callback = useCallback(
    location => {
      updateCurrentLocation(location);
      if (recStatus === true) updatePathArray(location);
    },
    [recStatus]
  );

  const renderContent = () => {
    return (
      <SafeAreaView forceInset={{ top: "always" }} style={{ flex: 1 }}>
        <SplitPane
          childOne={
            <Camera
              style={{ flex: 1 }}
              recStatus={recStatus}
              isFocused={isFocused}
              setRecStatus={() => {
                setRecStatus(!recStatus);
              }}
            />
          }
          childTwo={
            <Map
              shouldTrack={isFocused}
              callback={callback}
              style={{ flex: 1 }}
            />
          }
        />
      </SafeAreaView>
    );
  };
  return isFocused ? renderContent() : null;
};

const styles = StyleSheet.create({});

export default withNavigationFocus(RecordScreen);
