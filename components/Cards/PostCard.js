import React from "react";
import { StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Text, View } from "react-native-ui-lib";
import HyperLink from "react-native-hyperlink";
import { useNavigation } from "@react-navigation/native";

import Voter from "./components/Voter";
import PostHeader from "./components/ProfileHeader";
import PostFooter from "./components/PostFooter";

export default ({ post, postID, footer = true, path = "post" }) => {
  const navigation = useNavigation();
  const { text, author, votes, regionID, createdAt, replyCount } = post;
  return (
    <View style={styles.container}>
      <View row style={styles.topContent}>
        <TouchableOpacity
          onPress={() => navigation.navigate(path, { post, postID })}
          style={{ flex: 1 }}
        >
          <PostHeader {...post.author} />
          <HyperLink linkDefault={true}>
            <Text style={styles.text}>{text}</Text>
          </HyperLink>
        </TouchableOpacity>
        <View center style={{ height: "100%" }}>
          <Voter postID={postID} votes={votes} />
        </View>
      </View>
      {footer && <PostFooter author={author} totalComments={replyCount || 0} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    marginTop: 10,
  },
  topContent: {
    height: 150,
    width: "100%",
    padding: 10,
    justifyContent: "space-between",
  },
  text: {
    fontSize: 18,
    paddingTop: 5,
  },
});
