import React, { useContext, useEffect, useState } from "react";
import { Video } from "expo-av";
import LocationContext from "../context/LocationContext";

const VideoPlayer = ({ asset }) => {
  const { pathArray, updateCurrentLocation } = useContext(LocationContext);
  const [time, setTime] = useState([]);
  function binarySearch(arr, i) {
    var mid = Math.floor(arr.length / 2);
    console.log(arr[mid], i);
    if (arr[mid] === i) {
      console.log("match", arr[mid], i);
      return arr[mid];
    } else if (arr[mid] < i && arr.length > 1) {
      console.log("mid lower", arr[mid], i);
      binarySearch(arr.splice(mid, Number.MAX_VALUE), i);
    } else if (arr[mid] > i && arr.length > 1) {
      console.log("mid higher", arr[mid], i);
      binarySearch(arr.splice(0, mid), i);
    } else {
      console.log("not here", i);
      //if(arr[0] != -1){
      console.log("==-== ", arr[0]);
      return arr[0];
    }
  }

  const linearSearch = (arr, i) => {
    for (index = 0; index < arr.length; index++) {
      if (arr[index] > i) {
        // console.log(index-1);
        return index;
      }
    }
  };
  const subtractTime = (value, index, array) => {
    if (index == 0) {
      return 0;
    } else {
      return value - array[index - 1];
    }
  };

  useEffect(() => {
    let index = 0;
    for (index = 0; index < pathArray.length; index++) {
      //console.log("=> " + pathArray[index].timestamp);
      if (index == 0) {
        time.push(0);
        setTime(time.push(0));
      } else {
        time.push(pathArray[index].timestamp - pathArray[0].timestamp);
        setTime(time);
      }
    }

    //console.log("12345: " + (time));
    //const timest = time.map(subtractTime);
    //console.log("==> " + timst)
  }, [pathArray]);

  const updateMap = positionMillis => {
    //setMapCur(binarySearch(timest, cur));
    // console.log("=====>>>>", time);
    //console.log(time.indexOf(binarySearch(time, positionMillis), 0));
    //console.log(
    // "1===><===",
    //pathArray[time.indexOf(binarySearch(time, positionMillis), 0)].coords
    //);
    // console.log("======>>" , pathArray[linearSearch(time, positionMillis)]);
    updateCurrentLocation(pathArray[linearSearch(time, positionMillis)]);
    
  };

  return (
    <Video
      source={asset}
      rate={1.0}
      volume={1.0}
      isMuted={false}
      resizeMode={Video.RESIZE_MODE_CONTAIN}
      shouldPlay
      useNativeControls
      progressUpdateIntervalMillis={500}
      onPlaybackStatusUpdate={({ positionMillis }) => {
        updateMap(positionMillis);
      }}
      style={{ flex: 1 }}
    />
  );
};

export default VideoPlayer;
