import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib";
import Voter from "./components/Voter";
import PostHeader from "./components/PostHeader";

export default ({ postID, text, author, votes, regionID, ...rest }) => (
  <View style={styles.container}>
    <View row style={styles.topContent}>
      <View style={styles.mainContent}>
        <PostHeader {...author} regionID={regionID} />
        <Text>{text}</Text>
      </View>
      <View center style={{ height: "100%" }}>
        <Voter postID={postID} votes={votes} />
      </View>
    </View>
    <View row style={styles.bottomBar}></View>
  </View>
);

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
  bottomBar: {
    height: 30,
    width: "100%",
    borderTopWidth: StyleSheet.hairlineWidth,
    justifyContent: "space-between",
  },
});
