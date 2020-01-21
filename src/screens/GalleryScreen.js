import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image
} from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right
} from "native-base";
import * as MediaLibrary from "expo-media-library";

const GalleryScreen = ({ navigation }) => {
  const [asset, setAsset] = useState([]);
  async function getV() {
    const album = await MediaLibrary.getAlbumAsync("geoLocation");

    const vid = await MediaLibrary.getAssetsAsync({
      first: 10,
      album,
      mediaType: MediaLibrary.MediaType.video
    });
    //console.log(vid.assets + " \n" + vid.totalCount);
    setAsset(vid.assets);
    //console.log(asset);
  }

  useEffect(() => {
    getV();
  }, []);

  return (
    <Container>
      <FlatList
        data={asset}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Playback", {
                uri: item.uri
              });
            }}
          >
            <Card>
              <CardItem></CardItem>
              <CardItem cardBody>
                <Image
                  source={{ uri: item.uri }}
                  style={{ height: 200, width: null, flex: 1 }}
                />
              </CardItem>
            </Card>
          </TouchableOpacity>
        )}
      />
    </Container>
  );
};

const styles = StyleSheet.create({});

export default GalleryScreen;
