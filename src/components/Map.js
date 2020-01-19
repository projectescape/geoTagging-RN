import React, { useEffect, useContext } from "react";
import { Text, StyleSheet } from "react-native";
import MapView, { Polyline, Circle } from "react-native-maps";
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
      style={{ flex: 1 }}
      initialRegion={{
        latitude: currentLocation ? currentLocation.coords.latitude : 30.751883,
        longitude: currentLocation
          ? currentLocation.coords.longitude
          : 76.9125063,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }}
      region={
        currentLocation
          ? {
              latitude: currentLocation.coords.latitude,
              longitude: currentLocation.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01
            }
          : null
      }
    >
      {currentLocation ? (
        <Circle
          center={currentLocation.coords}
          radius={30}
          strokeColor="rgba(158, 158, 255, 1.0)"
          fillColor="rgba(158, 158, 255, 0.3)"
        />
      ) : null}
      <Polyline coordinates={pathArray.map(loc => loc.coords)} />
    </MapView>
  );
};

const styles = StyleSheet.create({});

export default Map;
