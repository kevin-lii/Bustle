import React, { Component } from "react";
import { FlatList } from "react-native";
import { Card, Text, View } from "react-native-ui-lib";
import { connect } from "react-redux";

import { getEvents, getPosts } from "../../../store/actions";
import PostCard from "../../../components/Cards/PostCard";
import WithOverlayButtons from "../../../components/Container/WithOverlayButtons";

class Feed extends Component {
  constructor(props) {
    super(props);
    props.getEvents();
    props.getPosts();
  }

  render() {
    const { navigation, route, events, posts } = this.props;

    if (events == null || posts == null) {
      return <Text>Loading...</Text>;
    }

    return (
      <FlatList
        data={posts}
        renderItem={({ item, index }) => {
          if (route.name === "forums")
            return <PostCard post={item.data()} postID={item.id} key={index} />;
          else return <></>;
        }}
      />
    );
  }
}

export default connect(
  (state) => ({
    events: state.events,
    posts: state.posts,
  }),
  {
    getEvents,
    getPosts,
  }
)(Feed);
