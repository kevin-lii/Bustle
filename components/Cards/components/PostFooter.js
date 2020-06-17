import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "react-native-ui-lib";

import Icons from "../../Image/Icons";

import { Theme, anonymous } from "../../../global/constants";
import TagLinks from "./TagLinks";

export default ({ postID, tags, totalComments, commentPress }) => {
  return (
    <View
      row
      spread
      style={{
        minHeight: 25,
        width: "100%",
        paddingHorizontal: 10,
        alignItems: "flex-end",
        borderTopWidth: StyleSheet.hairlineWidth,
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
