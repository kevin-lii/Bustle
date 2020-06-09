import React from "react";
import { Text } from "react-native-ui-lib";
import { TouchableNativeFeedback, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Theme } from "../../../global/constants";

export default ({ tags, limit }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        paddingLeft: 30,
      }}
    >
      {tags.map((tag) => (
        <TouchableNativeFeedback
          key={tag}
          onPress={() => navigation.push("search", { tag })}
        >
          <Text
            marginR-10
            color={Theme.secondary}
            style={{ fontSize: 13, fontWeight: "bold" }}
          >
            #{tag}
          </Text>
        </TouchableNativeFeedback>
      ))}
    </View>
  );
};
