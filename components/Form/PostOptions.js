import React from "react";
import { Text, View } from "react-native-ui-lib";
import { StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import Icons from "../Image/Icons";

import PostModel from "../../models/Post";

const PostOptions = ({ navigation, postID, authorID, user }) => (
  <View flex padding-10>
    {(user.uid === authorID || user.posts?.has(postID)) && (
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

export default connect((state) => ({ user: state.user }), {})(PostOptions);
