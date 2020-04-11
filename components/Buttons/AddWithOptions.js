import React from "react";
import { View, TouchableOpacity, Text } from "react-native-ui-lib";
import { StyleSheet } from "react-native";

import styles from "./styles";

export default ({
  primaryIcon,
  primaryLabel,
  secondaryIcon,
  secondaryLabel,
  onPressPrimary,
  onPressSecondary
}) => (
  <View flex spread style={{ height: 120 }}>
    <View>
      <Text>{secondaryLabel}</Text>
      <TouchableOpacity style={styles.smallButton} onPress={onPressSecondary}>
        {secondaryIcon}
      </TouchableOpacity>
    </View>
    <View>
      <Text>{primaryLabel}</Text>
      <TouchableOpacity style={styles.smallButton} onPress={onPressPrimary}>
        {primaryIcon}
      </TouchableOpacity>
    </View>
  </View>
);
