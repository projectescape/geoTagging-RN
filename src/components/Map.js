import React from "react";
import { Text, StyleSheet } from "react-native";
import MapView from "react-native-maps";

const Map = () => {
  return (
    <MapView
      style={{ height: 300 }}
      initialRegion={{
        latitude: 30.362298,
        longitude: 76.3809113,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default Map;
