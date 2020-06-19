import React from "react";
import { Text, View, TouchableOpacity } from "react-native-ui-lib";

import { Theme } from "../../global/constants";
import globalStyles from "../../global/styles";

export default ({ state = false, onChange }) => (
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
      {state ? "Events Hosting" : "Saved Events"}
    </Text>
    <TouchableOpacity
      onPress={() => onChange(!state)}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Text text70 color={Theme.primary}>
        {state ? "View Saved" : "View Hosting"}
      </Text>
    </TouchableOpacity>
  </View>
);
