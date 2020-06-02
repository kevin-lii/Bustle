import React from "react";
import { Text, View } from "react-native-ui-lib";
import { TouchableNativeFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { forumTags } from "../../../global/forumconfig";

export default ({ tags }) => {
  const navigation = useNavigation();
  return (
    <View row>
      {tags.map((tag) => (
        <TouchableNativeFeedback
          key={tag}
          onPress={() => navigation.push("search", { tag })}
        >
          <Text text60 color={forumTags[tag]} marginR-3>
            #{tag}
          </Text>
        </TouchableNativeFeedback>
      ))}
    </View>
  );
};
