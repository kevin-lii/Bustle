import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "react-native-ui-lib";
import Icons from "../../Image/Icons";

import { Theme, anonymous } from "../../../global/constants";

export default ({ postID, author, totalComments }) => (
  <View
    row
    centerV
    style={{
      height: 40,
      width: "100%",
      paddingHorizontal: 10,
      borderTopWidth: StyleSheet.hairlineWidth,
      justifyContent: "space-between",
    }}
  >
    <TouchableOpacity onPress={() => {}}>
      <Text
        text80
        color={author.uid === anonymous ? Theme.grey : Theme.primary}
      >
        by {author.displayName}
      </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => {}}>
      <View row spread centerV>
        <Text text80 marginR-5>
          {totalComments}
        </Text>
        <Icons icon="comment" />
      </View>
    </TouchableOpacity>
  </View>
);
