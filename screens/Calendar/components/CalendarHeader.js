import React from "react";
import { Text, View, TouchableOpacity } from "react-native-ui-lib";
import { useSafeArea } from "react-native-safe-area-context";

import { Theme } from "../../../global/constants";
import globalStyles from "../../../global/styles";

export default ({ host, onToggle }) => {
  const padTop = useSafeArea().top;
  return (
    <View
      row
      centerV
      spread
      paddingH-5
      style={{
        height: 55 + padTop,
        backgroundColor: "white",
        ...globalStyles.overlayElementShadow,
      }}
    >
      <Text
        color={Theme.primary}
        style={{ fontSize: 24, fontWeight: "bold", marginTop: padTop }}
      >
        {host ? "Events Hosting" : "Saved Events"}
      </Text>
      <TouchableOpacity
        onPress={onToggle}
        hitSlop={{ top: 15, left: 5, right: 5, bottom: 15 }}
        style={{ marginTop: padTop }}
      >
        <Text text80 color={Theme.primary}>
          {host ? "See Saved" : "See Hosting"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
