import React from "react";
import { Card, Text } from "react-native-ui-lib";
import { connect } from "react-redux";

import { getEvents, getPosts } from "../../../store/actions";

function Feed({ navigation, route }) {
  return (
    <Card
      row // control the children flow direction
      borderRadius={12}
      height={150}
      containerStyle={{ marginRight: 20 }}
      enableShadow={true}
      fontWeight="bold"
    >
      <Text>Feed</Text>
    </Card>
  );
}

export default connect(
  state => ({
    events: state.events,
    posts: state.posts
  }),
  {
    getEvents,
    getPosts
  }
)(Feed);
