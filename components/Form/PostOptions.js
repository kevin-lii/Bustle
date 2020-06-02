import React from "react";
import { Text, View } from "react-native-ui-lib";
import { StyleSheet, TouchableNativeFeedback } from "react-native";
import Icons from "../Image/Icons";

export default ({ navigation }) => (
  <View flex>
    <TouchableNativeFeedback>
      <View style={styles.option}>
        <Icons icon="trash" />
        <Text marginL-10>Delete</Text>
      </View>
    </TouchableNativeFeedback>
    <TouchableNativeFeedback>
      <View style={styles.option}>
        <Icons icon="flag" />
        <Text marginL-10>Delete</Text>
      </View>
    </TouchableNativeFeedback>
  </View>
);

const styles = StyleSheet.create({
  option: {
    height: 40,
  },
});
