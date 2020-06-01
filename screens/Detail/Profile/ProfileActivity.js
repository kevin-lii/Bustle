import React, { useEffect } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib";
import { connect } from "react-redux";

import { getPosts } from "../../../store/actions";
import PostCard from "../../../components/Cards/PostCard";
import { Theme } from "../../../global/constants";

function ProfileActivity({ navigation, isCurrentUser, user, getPosts, post }) {
  useEffect(() => {
    getPosts({ author: user.uid });
    navigation.addListener("focus", async () => {
      getPosts({ author: user.uid });
    });
  }, []);
  console.log(post);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={styles.scrollView}
        data={post}
        renderItem={({ item, index }) => {
          return (
            <PostCard
              post={item}
              postID={item.id}
              key={index}
              path="UserPost"
            />
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
    display: "flex",
    height: "100%",
  },
  scrollView: {
    flex: 1,
    height: "100%",
  },
  emptyText: {
    color: Theme.secondary,
    height: "100%",
  },
});

export default connect(
  (state) => ({
    post: state.posts,
  }),
  {
    getPosts,
  }
)(ProfileActivity);
