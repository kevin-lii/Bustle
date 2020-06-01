import React from "react";
import { Picker, Text, View } from "react-native-ui-lib";
import { useNavigation } from "@react-navigation/native";

import Icons from "../Image/Icons";

import { forumTags, zones } from "../../global/forumconfig";
import { Theme } from "../../global/constants";

export default () => {
  const navigation = useNavigation();
  return (
    <View centerV>
      <Picker
        onChange={({ value }) => navigation.push("search", { tag: value })}
        mode="SINGLE"
        renderPicker={(l) => (
          <View centerV style={{ padding: 10 }}>
            <Icons icon="search" type="Font5" size={20} color={Theme.primary} />
          </View>
        )}
      >
        {Object.keys(forumTags).map((tag, i) => (
          <Picker.Item label={`#${tag}`} value={tag} key={i} />
        ))}
      </Picker>
    </View>
  );
};
