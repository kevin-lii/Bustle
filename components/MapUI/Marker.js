import React from "react";
import { View, NetInfo, Image } from "react-native";

import CategoriesIcon from "../Image/CategoriesIcon";

import styles from "./styles";

export default function ({ photoURL, type }) {
  let image;
  if (photoURL) image = <Image source={{ uri: photoURL }}></Image>;
  else {
    image = <Image source={{ uri: "" }}></Image>;
  }

  const icon = <CategoriesIcon type={type} color={"white"} />;
  return <View style={styles.marker}>{icon}</View>;
}
