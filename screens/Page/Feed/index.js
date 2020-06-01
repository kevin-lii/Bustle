import React, { Component, createRef } from "react";
import { FlatList } from "react-native";
import { Card, Text, View } from "react-native-ui-lib";
import { connect } from "react-redux";

import { getEvents, getPosts } from "../../../store/actions";
import PostCard from "../../../components/Cards/PostCard";
import EventFilters from "../../../components/Form/EventFilters";
import WithOverlayButtons from "../../../components/Container/WithOverlayButtons";
import FeedHeader from "../../../components/Header/FeedHeader";
import EventDetailCard from "../../../components/Cards/EventDetailCard";
import WithOverlayBottomSheet from "../../../components/Container/WithOverlayBottomSheet";

import { Theme } from "../../../global/constants";
class Feed extends Component {
  constructor(props) {
    super(props);

    if (props.route.params?.region)
      this.state = { regionIDs: [props.route.params?.region] };
    else this.state = { regionIDs: null };
  }
  componentDidMount() {
    this.props.getEvents();
    this.props.getPosts();
    this.props.navigation.addListener("focus", async () => {
      this.props.getEvents();
      this.props.getPosts();
    });
  }

  render() {
    const { navigation, route, events, posts, getPosts } = this.props;
    const forumView = route.name === "forum";
    const sheet = createRef();

    if (events == null || posts == null) {
      return <Text>Loading...</Text>;
    }

    const setRegion = (regionIDs) => {
      getPosts({ regionIDs });
      this.setState({ regionIDs });
    };

    return (
      <WithOverlayButtons
        navigation={navigation}
        route={route}
        toggleState={forumView}
      >
        <View flex style={{ backgroundColor: Theme.defaultBackground }}>
          <FlatList
            style={{ paddingHorizontal: forumView ? 0 : 10 }}
            contentContainerStyle={{ paddingBottom: 80 }}
            data={forumView ? posts : events}
            renderItem={({ item, index }) => {
              if (forumView)
                return <PostCard post={item} postID={item.id} key={index} />;
              else
                return (
                  <EventDetailCard event={item} navigation={navigation} rsvp />
                );
            }}
          />
        </View>
      </WithOverlayButtons>
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
