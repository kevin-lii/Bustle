import React from "react";
import { Picker, Text, View } from "react-native-ui-lib";

import { Theme } from "../../global/constants";
import { Theme, locations } from "../../global/pickerItems";

export default ({ value, onChange, size = "large", underline }) => (
  <Picker
    containerStyle={underline && { flex: 1 }}
    onChange={(v) => onChange(v.value)}
    value={value}
    renderPicker={(v) => (
      <View
        paddingB-13
        style={
          underline && {
            borderBottomWidth: 1,
            borderColor: Theme.underline,
            flex: 1,
          }
        }
      >
        <Text
          style={{ fontSize: size === "large" ? 30 : 16 }}
          color={v ? null : Theme.grey}
        >
          {v || "Year"}
        </Text>
      </View>
    )}
  >
    {locations.map((location, i) => (
      <Picker.Item label={location} value={location} key={i} />
    ))}
  </Picker>
);
