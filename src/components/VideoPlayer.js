import React, { useContext, useEffect, useState } from "react";
import { Video } from "expo-av";
import LocationContext from "../context/LocationContext";

const VideoPlayer = ({ asset }) => {
  const { pathArray, updateCurrentLocation } = useContext(LocationContext);
  const [time, setTime] = useState([]);
  const binarySearch = function (arr, x) {
    let start = 0, end = arr.length - 1;
    // Iterate while start not meets end 
    let mid = 0;
    while (start <= end) {
      // Find the mid index 
      mid = Math.floor((start + end) / 2);
      // If element is present at mid, return True 
      if (arr[mid] === x) return (mid);
      // Else look in left or right half accordingly 
      else if (arr[mid] < x)
        start = mid + 1;
      else
        end = mid - 1;
    }
    return mid;
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
    //console.log("Hi");
    updateCurrentLocation(pathArray[binarySearch(time, positionMillis)]);

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
      progressUpdateIntervalMillis={1000}
      onPlaybackStatusUpdate={({ positionMillis }) => {
        updateMap(positionMillis);
      }}
      style={{ flex: 1 }}
    />
  );
};

export default VideoPlayer;
