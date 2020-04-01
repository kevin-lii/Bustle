import React from "react";
import { View } from "react-native";

import { categoriesIcon } from "../../global/utils";

import styles from "./styles";

export default function({ type, ...props }) {
  const icon = categoriesIcon({ type, color: "white" });

  return <View style={styles.marker}>{icon}</View>;
}
