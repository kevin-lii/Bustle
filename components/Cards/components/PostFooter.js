import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "react-native-ui-lib";

import Icons from "../../Image/Icons";

import { Theme, anonymous } from "../../../global/constants";
import { trimString } from "../../../global/utils";
import TagLinks from "./TagLinks";

export default ({ postID, tags, totalComments, commentPress }) => {
  return (
    <View
      row
      centerV
      spread
      style={{
        height: 40,
        width: "100%",
        paddingHorizontal: 10,
      }}
    >
      <TagLinks tags={tags} />
      <TouchableOpacity onPress={commentPress}>
        <View row spread centerV>
          <Text text80 marginR-5>
            {totalComments}
          </Text>
          <Icons icon="comment" color={Theme.secondary} />
        </View>
      </TouchableOpacity>
    </View>
  );
};
