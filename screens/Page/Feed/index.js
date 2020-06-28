import React, { Component, createRef } from "react";
import { FlatList, SafeAreaView } from "react-native";
import { Text } from "react-native-ui-lib";
import { connect } from "react-redux";

import { getEvents, getPosts } from "../../../store/actions";
import PostCard from "../../../components/Cards/PostCard";
import WithOverlayButtons from "../../../components/Container/WithOverlayButtons";
import EventDetailCard from "../../../components/Cards/EventDetailCard";

import { Theme } from "../../../global/constants";
class Feed extends Component {
  constructor(props) {
    super(props);

    if (props.route.params?.region)
      this.state = { regionIDs: [props.route.params?.region] };
    else this.state = { regionIDs: null };
  }
  componentDidMount() {
    this.props.getEvents({ active: true, orderBy: "startDate" });
  }

  render() {
    const { navigation, route, events, posts, getPosts } = this.props;
    const forumView = route.name === "forum";

    if (events == null) {
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
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
          <FlatList
            style={{ paddingHorizontal: 10 }}
            contentContainerStyle={{ paddingBottom: 80 }}
            data={forumView ? posts : events}
            renderItem={({ item, index }) => {
              return (
                <EventDetailCard event={item} navigation={navigation} rsvp />
              );
            }}
          />
        </SafeAreaView>
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
