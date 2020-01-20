import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PlaybackScreen = ({navigation}) => {
return (<Text style={{ marginTop: 20 }}>{ JSON.stringify(navigation.getParam('uri', null)) }</Text>);
};

const styles = StyleSheet.create({});

export default PlaybackScreen;
