import React from "react";
import { StyleSheet, ImageBackground } from "react-native";
import { Theme } from "../../global/constants";

export default ({ source }) => (
  <ImageBackground
    style={styles.container}
    imageStyle={styles.image}
    source={source}
  ></ImageBackground>
);

const edge = 50;

const styles = StyleSheet.create({
  container: {
    height: edge,
    width: edge,
    borderRadius: edge / 2,
    backgroundColor: "white"
  },
  image: {
    borderRadius: edge / 2,
    borderWidth: 2,
    borderColor: Theme.secondary
  }
});
