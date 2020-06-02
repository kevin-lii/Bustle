import React from "react";
import { Text, View } from "react-native-ui-lib";
import { TouchableNativeFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";

import { setForumFilters } from "../../../store/actions";
import { forumTags } from "../../../global/forumconfig";
import { Theme } from "../../../global/constants";

export default ({ tags, limit }) => {
  const navigation = useNavigation();
  return (
    <View row>
      {tags.map((tag) => (
        <TouchableNativeFeedback
          key={tag}
          onPress={() => navigation.push("search", { tag })}
        >
          <Text
            marginR-10
            color={Theme.primary}
            style={{ fontSize: 16, fontWeight: "bold" }}
          >
            #{tag}
          </Text>
        </TouchableNativeFeedback>
      ))}
    </View>
  );
};
