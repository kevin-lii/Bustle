import React from "react";
import { Text, View } from "react-native-ui-lib";
import { TouchableNativeFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";

import { setForumFilters } from "../../../store/actions";
import { Theme } from "../../../global/constants";

export default ({ tags }) => {
  const navigation = useNavigation();

  return (
    <View row>
      {tags.map((tag) => (
        <TouchableNativeFeedback
          key={tag}
          onPress={() => navigation.push("search", { tag })}
        >
          <Text color={Theme.primary} marginR-3>
            #{tag}
          </Text>
        </TouchableNativeFeedback>
      ))}
    </View>
  );
};
