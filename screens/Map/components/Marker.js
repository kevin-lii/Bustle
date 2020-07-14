import React from "react";
import { View, NetInfo, Image } from "react-native";

import CategoriesIcon from "../Image/CategoriesIcon";

import styles from "./styles";

import { Theme } from "../../global/constants";

export default function ({ photoURL, type }) {
  let image;
  if (photoURL) image = <Image source={{ uri: photoURL }}></Image>;
  else {
    image = <Image source={{ uri: "" }}></Image>;
  }

  const icon = <CategoriesIcon type={type} color={"white"} />;
  return (
    <View
      style={{
        ...styles.marker,
        // backgroundColor:
      }}
    >
      {icon}
    </View>
  );
}
