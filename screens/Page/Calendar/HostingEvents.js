import React, { Component } from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";

import Icons from "../../../components/Image/Icons";
import EventDetail from "../../../components/Cards/EventDetailCard";
import { getHostedEvents } from "../../../store/actions";

import styles from "./styles";
import { connect } from "react-redux";

class MyEvents extends Component {
  componentDidMount() {
    this.props.getHostedEvents();
  }

  render() {
    const { navigation, hostedEvents } = this.props;
    let events;

    if (hostedEvents) {
      if (hostedEvents.length > 0)
        events = hostedEvents.map((event, index) => (
          <EventDetail
            key={index}
            event={event}
            navigation={navigation}
            map
            edit
            trash
            {...this.props}
          />
        ));
      else events = <Text>You have not hosted any events.</Text>;
    } else {
      events = <Text>Loading...</Text>;
    }

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>{events}</ScrollView>
      </SafeAreaView>
    );
  }
}

export default connect(
  (state) => ({
    hostedEvents: state.hostedEvents,
  }),
  {
    getHostedEvents,
  }
)(MyEvents);
