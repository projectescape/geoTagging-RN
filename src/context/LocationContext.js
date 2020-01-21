import React, { useReducer } from "react";

const LocationContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "updateCurrentLocation":
      return { ...state, currentLocation: action.payload };
    case "updatePathArray":
      return { ...state, pathArray: [...state.pathArray, action.payload] };
    case "resetPathArray":
      return { ...state, pathArray: [] };
    case "setPathArray":
      console.log("SetpathArray reducer run");
      return { ...state, pathArray: action.payload };
    default:
      return state;
  }
};
export const LocationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    currentLocation: null,
    pathArray: []
  });

  const updateCurrentLocation = location => {
    dispatch({ type: "updateCurrentLocation", payload: location });
  };
  const updatePathArray = location => {
    dispatch({ type: "updatePathArray", payload: location });
  };
  const setPathArray = location => {
    dispatch({ type: "setPathArray", payload: location });
    console.log("SetpathArray action run");
  };
  const resetPathArray = () => {
    dispatch({ type: "resetPathArray" });
  };

  return (
    <LocationContext.Provider
      value={{
        currentLocation: state.currentLocation,
        pathArray: state.pathArray,
        updateCurrentLocation,
        updatePathArray,
        resetPathArray,
        setPathArray
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContext;
