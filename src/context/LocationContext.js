import React, { useState } from "react";

const LocationContext = React.createContext();

export const LocationProvider = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [pathArray, setPathArray] = useState([]);

  const updateCurrentLocation = loc => {
    setCurrentLocation(loc);
  };
  const updatePathArray = loc => {
    setPathArray([...pathArray, loc]);
  };
  const resetPathArray = () => {
    setPathArray([]);
  };

  return (
    <LocationContext.Provider
      value={{
        currentLocation,
        pathArray,
        updateCurrentLocation,
        updatePathArray,
        resetPathArray
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContext;
