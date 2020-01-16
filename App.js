import React from "react";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import RecordScreen from "./src/screens/RecordScreen";
import GalleryScreen from "./src/screens/GalleryScreen";
import PlaybackScreen from "./src/screens/PlaybackScreen";

const bottomNavigator = createBottomTabNavigator({
  Record: RecordScreen,
  galleryFlow: createStackNavigator({
    Gallery: GalleryScreen,
    Playback: PlaybackScreen
  })
});

export default createAppContainer(bottomNavigator);
