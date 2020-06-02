import React from "react";
import { StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Card, Text, View } from "react-native-ui-lib";
import HyperLink from "react-native-hyperlink";
import { useNavigation } from "@react-navigation/native";

import Voter from "./components/Voter";
import PostHeader from "./components/ProfileHeader";
import PostFooter from "./components/PostFooter";

import { navigatePath } from "../../global/utils";
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
      <View paddingH-10>
        <PostHeader {...post.author} postID={postID} createdAt={createdAt} />
      </View>
      <View row style={styles.topContent}>
        <View flex>
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
          <Voter postID={postID} votes={votes} height={100} />
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
    paddingVertical: 10,
  },
  topContent: {
    height: 90,
    width: "100%",
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  text: {
    fontSize: 18,
    paddingTop: 5,
  },
});
