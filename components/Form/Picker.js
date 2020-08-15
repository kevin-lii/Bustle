import React from "react";
import { Picker, Text, View } from "react-native-ui-lib";

import { Theme } from "../../global/constants";

export default ({
  value,
  onChange,
  size = "large",
  underline,
  showSearch,
  data,
  placeholder,
}) => (
  <Picker
    containerStyle={underline && { flex: 1 }}
    onChange={(v) => onChange(v.value)}
    value={value}
    showSearch={showSearch}
    listProps={{
      keyboardShouldPersistTaps: "always",
    }}
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
          {v || placeholder}
        </Text>
      </View>
    )}
  >
    {data.map((item, i) => (
      <Picker.Item label={item} value={item} key={i} />
    ))}
  </Picker>
);
