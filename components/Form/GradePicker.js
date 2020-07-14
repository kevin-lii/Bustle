import React from "react";
import moment from "moment";
import { Picker, Text, View } from "react-native-ui-lib";

import { Theme } from "../../global/constants";

const gradeLevels = [];
const maxYear = moment().add(4, "y").get("year");
for (let i = maxYear; i >= 2000; i--) gradeLevels.push(i);

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
          {"Class of " + v || "Year"}
        </Text>
      </View>
    )}
  >
    {gradeLevels.map((grade, i) => (
      <Picker.Item label={"Class of " + grade} value={grade} key={i} />
    ))}
  </Picker>
);
