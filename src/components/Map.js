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

  const getCircleLocation = () => {
    if (!playbackMode) {
      return currentLocation.coords;
    }
    return pathArray[0].coords;
  };

  useEffect(() => {
    // console.log("Inside map recStatus : ", recStatus);
    // console.log("Inside map isFocused : ", isFocused);
  }, [shouldTrack]);

  const { currentLocation, pathArray } = useContext(LocationContext);

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        ...(playbackMode
          ? pathArray[0].coords
          : currentLocation
          ? currentLocation.coords
          : { longitude: 76.3609616, latitude: 30.3525405 }),
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }}
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
