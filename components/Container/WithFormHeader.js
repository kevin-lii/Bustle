import React from "react";
import { View } from "react-native-ui-lib";
import { ScrollView } from "react-native";

import FormHeader from "../Header/FormHeader";

export default (props) => (
  <View style={{ height: "100%" }}>
    <FormHeader {...props} />
    {props.children}
  </View>
);
