import React, { useEffect, useContext, useCallback } from "react";
import { Text, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import useLocation from "../hooks/useLocation";
import LocationContext from "../context/LocationContext";

const Map = ({ shouldTrack, callback }) => {
  const [err] = useLocation(shouldTrack, callback);

  if (err) {
    return <Text>EnableLocation</Text>;
  }

  useEffect(() => {
    // console.log("Inside map recStatus : ", recStatus);
    // console.log("Inside map isFocused : ", isFocused);
  }, [shouldTrack]);

  const { currentLocation, pathArray } = useContext(LocationContext);

  return (
    <MapView
      style={{ height: 300 }}
      initialRegion={{
        latitude: 30.751883,
        longitude: 76.9125063,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default Map;
