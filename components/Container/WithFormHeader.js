import React from "react";
import { View } from "react-native-ui-lib";
import { ScrollView } from "react-native";

import FormHeader from "../Header/FormHeader";

export default ({ children, onClose, onSubmit, submitText }) => (
  <View>
    <FormHeader onClose={onClose} onSubmit={onSubmit} submitText={submitText} />
    <ScrollView style={{ paddingHorizontal: 15 }}>{children}</ScrollView>
  </View>
);
