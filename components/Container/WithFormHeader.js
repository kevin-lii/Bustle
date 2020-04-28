import React from "react";
import { View } from "react-native-ui-lib";
import { ScrollView } from "react-native";

import FormHeader from "../Header/FormHeader";

export default (props) => (
  <View>
    <FormHeader {...props} />
    <ScrollView style={{ paddingHorizontal: 15 }}>{props.children}</ScrollView>
  </View>
);
