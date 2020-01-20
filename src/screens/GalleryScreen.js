import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Camera } from 'expo-camera';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
const BoxScreen = ({ navigation }) => {

  useEffect(() => {
    alertIfRemoteNotificationsDisabledAsync();
    getV();
  }, []);

  const [count, setCount] = useState(0);
  const [asset, setAsset] = useState([]);

  async function getV() {
    const vid = await MediaLibrary.getAssetsAsync({
      first: 10,
      // album: "vamos", add the library name here
      mediaType: MediaLibrary.MediaType.video
    });
    //console.log(vid.assets + " \n" + vid.totalCount);
    setAsset(vid.assets);
    setCount(vid.assets.length);
    //console.log(asset);
  }

  async function alertIfRemoteNotificationsDisabledAsync() {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    //console.log(status);
    const camper = await Camera.requestPermissionsAsync();
    //console.log(camper);
    if (status !== 'granted') {
      alert('This App needs to access your Media Gallary.');
      MediaLibrary.getPermissionsAsync();  //TODO: complete this using a while loop
    }
  }

  return (
    <Container>
      <FlatList
        data={asset}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {navigation.navigate('Playback', {
              uri: item.uri
            })}}>
            <Card>
              <CardItem>
              </CardItem>
              <CardItem cardBody>
                <Image source={{ uri: item.uri }} style={{ height: 200, width: null, flex: 1 }} />
              </CardItem>
            </Card>
          </TouchableOpacity>
        )}

      />

    </Container>
  );



};

const styles = StyleSheet.create({
  button: {
    marginTop: 50,
    borderColor: 'black',
    borderWidth: 10,
    height: 30
  },
  img: {
    height: 100,
    width: 100
  }
});
export default BoxScreen;

