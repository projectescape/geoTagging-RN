import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";

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
    <>
      <FlatList
        data={asset}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Playback", {
                pathUri: item.uri.slice(0, item.uri.lastIndexOf(".mp4")),
                asset: item
              });
            }}
          >
            <Image
              source={{ uri: item.uri }}
              style={{
                height: 200,
                width: null,
                flex: 1,
                marginTop: 15,
                marginHorizontal: 15,
                borderRadius: 10
              }}
            />
          </TouchableOpacity>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default GalleryScreen;
