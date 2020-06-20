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
      <IconToggleSwitch
        offIcon="check-square"
        icon="door-open"
        isOn={host}
        onToggle={onToggle}
        shadow={false}
        border
        size="medium"
      />
    </View>
  );
};
