import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const GalleryScreen = ({ navigation }) => {
  return (
    <>
      <Text style={{ fontSize: 48 }}>Gallery Screen</Text>
      <Button
        onPress={() => {
          navigation.navigate("Playback");
        }}
        title="Go to playback screen"
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default GalleryScreen;
