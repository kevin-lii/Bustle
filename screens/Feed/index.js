import React, { Component } from "react";
import { FlatList } from "react-native";
import { Text, View } from "react-native-ui-lib";
import { connect } from "react-redux";

import { setEventFilters, getPosts } from "../../store/actions";
import WithOverlayButtons from "../../components/Container/WithOverlayButtons";
import EventDetailCard from "../../components/Cards/EventDetailCard";

class Feed extends Component {
  constructor(props) {
    super(props);

    if (props.route.params?.region)
      this.state = { regionIDs: [props.route.params?.region] };
    else this.state = { regionIDs: null };
  }
  componentDidMount() {
    this.props.setEventFilters({ active: true, orderBy: "startDate" });
  }

  render() {
    const { navigation, route, events, posts, getPosts } = this.props;
    const forumView = route.name === "forum";

    if (events === null) {
      return <Text>Loading...</Text>;
    }

    return (
      <WithOverlayButtons
        navigation={navigation}
        route={route}
        toggleState={forumView}
      >
        <View style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
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
    setEventFilters,
    getPosts,
  }
)(Feed);
