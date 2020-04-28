import React, { Component } from "react";
import { Card, Text, View } from "react-native-ui-lib";
import { connect } from "react-redux";

import { getEvents, getPosts } from "../../../store/actions";
import { FlatList } from "react-native";
import PostCard from "../../../components/Cards/PostCard";

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

    let content = [];
    if (route.name === "forums") {
      content = posts.map((post, index) => (
        <PostCard {...post.data()} postID={post.id} key={index} />
      ));
    } else {
      content = events.map((event) => <></>);
    }

    return <View>{content}</View>;
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
