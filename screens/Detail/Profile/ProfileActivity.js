import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib";

import PostModel from "../../../models/Post";
import PostCard from "../../../components/Cards/PostCard";
import { Theme } from "../../../global/constants";

export default function ProfileActivity({ navigation, isCurrentUser, user }) {
  const [post, setPost] = useState([]);
  useEffect(() => {
    PostModel.get({ author: user.uid }).then((post) => setPost(post));
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={styles.scrollView}
        data={post}
        renderItem={({ item, index }) => {
          return (
            <PostCard post={item} postID={item.id} key={index} path="post" />
          );
        }}
        ListEmptyComponent={() => (
          <View centerV center style={styles.emptyText}>
            <Text text65 style={{ fontWeight: "bold" }}>
              {isCurrentUser ? "You have " : user.displayName + " has "}made no
              posts.
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
  },
  scrollView: {
    paddingHorizontal: 10,
  },
  emptyText: {
    color: Theme.secondary,
    height: "100%",
  },
});
