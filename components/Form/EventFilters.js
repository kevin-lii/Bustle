import React from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native-ui-lib";
import { connect } from "react-redux";

import Tokenizer from "./Tokenizer";

export default () => (
  <View padding-10>
    <Picker
      onChange={onPick}
      mode={pickerMode}
      renderPicker={(v) => <Text style={styles.text}>{v.label}</Text>}
      value={pickerValue}
    >
      {zonesByID[zone].regions.map((region, i) => (
        <Picker.Item label={regionByID[region].name} value={region} key={i} />
      ))}
    </Picker>
  </View>
);

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});
