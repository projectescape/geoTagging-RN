import React, { useEffect, useContext } from "react";
import { Text, StyleSheet } from "react-native";
import MapView, { Polyline, Circle } from "react-native-maps";
import useLocation from "../hooks/useLocation";
import LocationContext from "../context/LocationContext";

const Map = ({
  shouldTrack = false,
  callback = () => {
    return null;
  },
  playbackMode = false
}) => {
  const [err] = useLocation(shouldTrack, callback);

  if (err) {
    return <Text>EnableLocation</Text>;
  }
  const { currentLocation, pathArray } = useContext(LocationContext);

  const getCircleLocation = () => {
    if (!playbackMode) {
      return currentLocation.coords;
    }
    return currentLocation.coords;
  };

  useEffect(() => {
    // console.log("Inside map recStatus : ", recStatus);
    // console.log("Inside map isFocused : ", isFocused);
  }, [shouldTrack]);

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={currentLocation?{...currentLocation.coords,latitudeDelta: 0.006,
        longitudeDelta: 0.006}:null}
      region={
        currentLocation && !playbackMode
          ? {
              latitude: currentLocation.coords.latitude,
              longitude: currentLocation.coords.longitude,
              latitudeDelta: 0.006,
              longitudeDelta: 0.006
            }
          : null
      }
    >
      {currentLocation ? (
        <Circle
          center={getCircleLocation()}
          radius={30}
          strokeColor="rgba(158, 158, 255, 1.0)"
          fillColor="rgba(158, 158, 255, 0.85)"
        />
      ) : null}
      <Polyline
        tappable
        strokeWidth={4}
        strokeColor="rgba(0, 0, 127, 0.7)"
        coordinates={pathArray.map(loc => loc.coords)}
        onPress={loc => {
          console.log(loc);
        }}
      />
    </MapView>
  );
};

const styles = StyleSheet.create({});

export default Map;
