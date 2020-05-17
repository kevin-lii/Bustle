import React from "react";
import { View, Text, TagsInput } from "react-native-ui-lib";
import { FlatList } from "react-native";

import { categories } from "../../global/constants";

export default ({ placeholder }) => (
  <View>
    <TagsInput hideUnderline placeholder={placeholder} text50 />
  </View>
);
