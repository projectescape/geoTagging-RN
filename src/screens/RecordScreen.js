// import "../_mockLocation";
import React, { useEffect, useState, useCallback, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView, withNavigationFocus } from "react-navigation";
import Map from "../components/Map";
import useLocation from "../hooks/useLocation";
import LocationContext from "../context/LocationContext";

const RecordScreen = ({ isFocused }) => {
  const [recStatus, setRecStatus] = useState(false);

  // useEffect(() => {
  //   console.log("recStatus : ", recStatus);
  //   console.log("isFocused : ", isFocused);
  // }, [recStatus, isFocused]);

  const { updateCurrentLocation, updatePathArray } = useContext(
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
      <Map shouldTrack={isFocused || recStatus} callback={callback} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default withNavigationFocus(RecordScreen);
