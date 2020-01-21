import React from "react";
import { Video } from "expo-av";

const VideoPlayer = ({ asset }) => {
  return (
    <Video
      source={asset}
      rate={1.0}
      volume={1.0}
      isMuted={false}
      resizeMode={Video.RESIZE_MODE_CONTAIN}
      shouldPlay
      useNativeControls
      style={{ flex: 1 }}
    />
  );
};

export default VideoPlayer;
