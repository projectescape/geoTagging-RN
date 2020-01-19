import "../_mockLocation";
import React, { useState, useCallback, useContext } from "react";
import { Text, StyleSheet, Button } from "react-native";
import { SafeAreaView, withNavigationFocus } from "react-navigation";
import Map from "../components/Map";
import LocationContext from "../context/LocationContext";

const RecordScreen = ({ isFocused }) => {
  const [recStatus, setRecStatus] = useState(false);

  const { updateCurrentLocation, updatePathArray, pathArray } = useContext(
    LocationContext
  );

  const callback = useCallback(
    location => {
      updateCurrentLocation(location);
      if (recStatus === true) updatePathArray(location);
    },
    [recStatus]
  );

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text style={{ fontSize: 48 }}>Record Screen</Text>
      <Button
        title="Toggle recStatus"
        onPress={() => {
          setRecStatus(!recStatus);
        }}
      />
      <Button
        title="Console pathArray"
        onPress={() => {
          console.log(pathArray);
        }}
      />
      <Map shouldTrack={isFocused} callback={callback} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default withNavigationFocus(RecordScreen);
