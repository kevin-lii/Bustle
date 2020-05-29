import React from "react";
import { StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Card, Text, View } from "react-native-ui-lib";
import HyperLink from "react-native-hyperlink";
import { useNavigation } from "@react-navigation/native";

import Voter from "./components/Voter";
import PostHeader from "./components/ProfileHeader";
import PostFooter from "./components/PostFooter";

import { Theme } from "../../global/constants";

export default ({ post, postID, footer = true }) => {
  const navigation = useNavigation();
  const { text, author, votes, tags, createdAt, replyCount } = post;

  return (
    <Card
      white50
      borderRadius={12}
      width={"100%"}
      containerStyle={styles.container}
    >
      <View row style={styles.topContent}>
        <View flex>
          <PostHeader {...post.author} createdAt={createdAt} />

          <TouchableOpacity
            onPress={() => navigation.navigate("post", { post, postID })}
            style={{ flex: 1 }}
          >
            <HyperLink linkDefault={true}>
              <Text style={styles.text}>{text}</Text>
            </HyperLink>
          </TouchableOpacity>
        </View>
        <View center style={{ height: "100%", paddingVertical: 10 }}>
          <Voter postID={postID} votes={votes} condensed />
        </View>
      </View>
      {footer && (
        <PostFooter
          totalComments={replyCount || 0}
          tags={tags || []}
          commentPress={() =>
            navigation.navigate("post", { post, postID, focusInput: true })
          }
          postID={postID}
        />
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  topContent: {
    height: 100,
    width: "100%",
    paddingTop: 10,
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  text: {
    fontSize: 18,
    paddingTop: 5,
  },
});
