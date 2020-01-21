import React from "react";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import RecordScreen from "./src/screens/RecordScreen";
import GalleryScreen from "./src/screens/GalleryScreen";
import PlaybackScreen from "./src/screens/PlaybackScreen";
import { LocationProvider } from "./src/context/LocationContext";

const StackNavigator = createStackNavigator({
  Gallery: GalleryScreen,
  Playback: PlaybackScreen
});

const bottomNavigator = createBottomTabNavigator({
  Record: RecordScreen,
  galleryFlow: StackNavigator
});

StackNavigator.navigationOptions = {
  title: "Gallery"
};

const App = createAppContainer(bottomNavigator);

export default () => {
  return (
    <LocationProvider>
      <App />
    </LocationProvider>
  );
};
