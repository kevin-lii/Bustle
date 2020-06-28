import React from "react";
import { View, TouchableOpacity } from "react-native-ui-lib";

import styles from "./styles";
import globalStyles from "../../global/styles";
import Icons from "../Image/Icons";

import { Theme } from "../../global/constants";

export default ({ onPressOn, onPressOff, onState }) => (
  <View
    style={{
      ...styles.button,
      ...styles.addButton,
      ...globalStyles.overlayElementShadow,
      backgroundColor: Theme.lightPrimary,
    }}
  >
    <TouchableOpacity
      style={{
        ...styles.button,
        ...styles.addButton,
        backgroundColor: Theme.primary,
      }}
      onPress={onState ? onPressOn : onPressOff}
    >
      <View center>
        <Icons
          type="Font"
          color="white"
          onChange={onState}
          icon="comment-alt-plus"
          iconOff="calendar-plus"
          size={24}
        />
      </View>
    </TouchableOpacity>
  </View>
);
