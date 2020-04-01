import React from "react";
import { View } from "react-native";

import CategoriesIcon from "../Image/CategoriesIcon";

import styles from "./styles";

export default function({ type, ...props }) {
  const icon = <CategoriesIcon type={type} color={"white"} />;

  return <View style={styles.marker}>{icon}</View>;
}
