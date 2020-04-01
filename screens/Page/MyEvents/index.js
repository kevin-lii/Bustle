import React, { Component } from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { withNavigation } from "react-navigation";

import Icons from "../../../components/Image/Icons";
import EventDetail from "../../../components/Window/EventDetailCard";
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              alignSelf: "flex-end",
              marginRight: 25,
              marginTop: 20
            }}
          >
            <Icons
              icon="close-a"
              type="Fontisto"
              size={25}
              onPress={() => navigation.goBack(null)}
            />
          </View>
          <Text style={styles.title}>My Events</Text>
          {events}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default withNavigation(
  connect(
    state => ({
      hostedEvents: state.hostedEvents
    }),
    {
      getHostedEvents
    }
  )(MyEvents)
);
