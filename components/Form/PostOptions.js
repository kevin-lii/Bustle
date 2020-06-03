import React from "react";
import { Text, View } from "react-native-ui-lib";
import { StyleSheet, TouchableOpacity } from "react-native";
import auth from "@react-native-firebase/auth";
import Icons from "../Image/Icons";

import PostModel from "../../models/Post";

export default ({ navigation, postID, authorID }) => (
  <View flex padding-10>
    {auth().currentUser.uid === authorID && (
      <TouchableOpacity
        onPress={() => {
          PostModel.remove(postID);
          navigation.goBack();
        }}
      >
        <View style={styles.option}>
          <Icons icon="trash" size={30} />
          <Text marginL-10 text60>
            Delete
          </Text>
        </View>
      </TouchableOpacity>
    )}
    <TouchableOpacity onPress={navigation.goBack}>
      <View style={styles.option}>
        <Icons icon="flag" size={30} />
        <Text marginL-10 text60>
          Flag as inappropriate
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  option: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
  },
});
