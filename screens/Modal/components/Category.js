import React from "react";
import { View, Text, TouchableOpacity } from "react-native-ui-lib";

import CategoriesIcon from "../../../components/Image/CategoriesIcon";

import { Theme, categories } from "../../../global/constants";

export default function ({ onChange, value }) {
  return (
    <View marginT-7 row centerV style={{ justifyContent: "space-between" }}>
      {categories.map((category) => {
        const color = value === category ? Theme.primary : null;
        return (
          <TouchableOpacity onPress={() => onChange(category)} key={category}>
            <View center>
              <CategoriesIcon type={category} color={color} />
              <Text color={color}>{category}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
