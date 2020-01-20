// https://github.com/brucelin0325/react-native-resizable-flex-panes/blob/master/Mycomponent.js#L11

import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  PanResponder,
  Animated
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default class MyComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
      topHeight: Dimensions.get("window").height / 4,
      bottomHeight: Dimensions.get("window").height / 3,
      deviceHeight: Dimensions.get("window").height,
      isDividerClicked: false,

      pan: new Animated.ValueXY()
    };

    // Previously in ComponentWillMount lifecycle, depreciated so now being executed in constructor
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      // Initially, set the Y position offset when touch start
      onPanResponderGrant: (e, gestureState) => {
        this.setState({
          offset: e.nativeEvent.pageY,
          isDividerClicked: true
        });
      },

      // When we drag the divider, set the bottomHeight (component state) again.
      onPanResponderMove: (e, gestureState) => {
        this.setState({
          bottomHeight:
            gestureState.moveY > this.state.deviceHeight - 40
              ? 40
              : this.state.deviceHeight - gestureState.moveY,
          offset: e.nativeEvent.pageY
        });
      },

      onPanResponderRelease: (e, gestureState) => {
        // Do something here for the touch end event
        this.setState({
          offset: e.nativeEvent.pageY,
          isDividerClicked: false
        });
      }
    });
  }

  render() {
    return (
      <View style={styles.content}>
        {/* Top View */}
        <Animated.View
          style={{
            backgroundColor: "#eeeeeee",
            minHeight: this.state.topHeight,
            flex: 1
          }}
        >
          {this.props.childOne}
        </Animated.View>

        {/* Divider */}
        <View
          style={[
            {
              height: 20,
              flexDirection: "row",
              justifyContent: "space-around"
            },
            this.state.isDividerClicked
              ? { backgroundColor: "#000" }
              : { backgroundColor: "#333" }
          ]}
          {...this._panResponder.panHandlers}
        >
          <MaterialCommunityIcons
            name="arrow-split-horizontal"
            color="white"
            size={20}
          />
        </View>

        {/* Bottom View */}
        <Animated.View
          style={[
            {
              backgroundColor: "white",
              minHeight: Dimensions.get("window").height / 4
            },
            { height: this.state.bottomHeight }
          ]}
        >
          {this.props.childTwo}
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: "column"
  }
});
