import React, { Component } from "react";
import { FlatList } from "react-native";
import { Text, View } from "react-native-ui-lib";
import { connect } from "react-redux";

import { setEventFilters, getSavedEvents } from "../../store/actions";
import WithOverlayButtons from "../../components/Container/WithOverlayButtons";
import EventDetailCard from "../../components/Cards/EventDetailCard";

class Feed extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.setEventFilters({ active: true, orderBy: "startDate" });
    this.props.getSavedEvents();
  }

  render() {
    const { navigation, route, events } = this.props;
    if (events === null) {
      return <Text>Loading...</Text>;
    }

    return (
      <WithOverlayButtons navigation={navigation} route={route}>
        <View style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
          <FlatList
            style={{ paddingHorizontal: 10 }}
            contentContainerStyle={{ paddingBottom: 80 }}
            data={events}
            renderItem={({ item }) => {
              return (
                <EventDetailCard event={item} navigation={navigation} rsvp />
              );
            }}
            keyExtractor={(item) => item._id.toString()}
            ListEmptyComponent={() => (
              <View centerH centerV>
                <Text text65 style={{ fontWeight: "bold" }}>
                  No events are going on currently
                </Text>
              </View>
            )}
          />
        </View>
      </WithOverlayButtons>
    );
  }
}

export default connect(
  (state) => ({
    events: state.events,
  }),
  {
    setEventFilters,
    getSavedEvents,
  }
)(Feed);
