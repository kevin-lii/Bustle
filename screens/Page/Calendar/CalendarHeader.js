import React from "react";
import { Text, View, TouchableOpacity } from "react-native-ui-lib";

import { Theme } from "../../../global/constants";
import globalStyles from "../../../global/styles";
import IconToggleSwitch from "../../../components/Form/IconToggleSwitch";

export default ({ host, onToggle }) => {
  return (
    <View
      row
      centerV
      spread
      paddingH-5
      style={{
        height: 55,
        backgroundColor: "white",
        ...globalStyles.overlayElementShadow,
      }}
    >
      <Text color={Theme.primary} style={{ fontSize: 24, fontWeight: "bold" }}>
        {host ? "Events Hosting" : "Saved Events"}
      </Text>
      <TouchableOpacity
        onPress={onToggle}
        hitSlop={{ top: 15, left: 5, right: 5, bottom: 15 }}
      >
        <Text text80 color={Theme.primary}>
          {host ? "See Saved" : "See Hosting"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
