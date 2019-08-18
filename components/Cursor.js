import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions, Text, Animated } from "react-native";
import Colors from "../constants/Colors";

const TOUCH_SIZE = 200;
const { width } = Dimensions.get("window");
const white = "white";

export default ({ d, r, borderWidth, borderColor, text, position }) => {
  return (
    <View style={StyleSheet.absoluteFill}>
      <Animated.View
        style={{
          width: TOUCH_SIZE,
          height: TOUCH_SIZE,
          justifyContent: "center",
          alignItems: "center",
          top: -18
        }}
      >
        <View
          style={{
            width: radius * 2,
            height: radius * 2,
            borderRadius: radius,
            borderColor,
            borderWidth,
            backgroundColor: white
          }}
        />
      </Animated.View>
    </View>
  );
};
