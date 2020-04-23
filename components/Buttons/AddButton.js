import React from "react";
import { View, TouchableOpacity, Image } from "react-native-ui-lib";

import styles from "./styles";
import globalStyles from "../../global/styles";
import Icons from "../Image/Icons";

export default ({ onPressOn, onPressOff, onState }) => (
  <TouchableOpacity
    style={[styles.button, styles.addButton, globalStyles.overlayElementShadow]}
    onPress={onState ? onPressOn : onPressOff}
  >
    <View center>
      <Icons
        type="Custom"
        onChange={onState}
        icon="post-plus"
        iconOff="map-plus"
        size={24}
      />
    </View>
  </TouchableOpacity>
);
