import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { View, Text } from "react-native-ui-lib";

import UserModel from "../../../models/User";
import { getHostedEvents } from "../../../store/actions";
import EventDetail from "../../../components/Cards/EventDetailCard";

import { Theme } from "../../../global/constants";

function ProfileHosted({
  navigation,
  isCurrentUser,
  user,
  realm,
  getHostedEvents,
  hostedEvents,
}) {
  const [hosted, setHosted] = useState([]);
  useEffect(() => {
    if (!isCurrentUser) {
      const getHostedEvents = Array.from(
        UserModel.get(realm, user._id).hostedEvents.values()
      );
      setHosted(getHostedEvents);
    } else {
      getHostedEvents();
    }
  }, []);
  const eventsHosted = isCurrentUser ? hostedEvents : hosted;
  let content;
  if (eventsHosted?.length > 0) {
    content = eventsHosted.map((item) => {
      return (
        <EventDetail
          key={item._id}
          event={item}
          navigation={navigation}
          trash
          edit
        />
      );
    });
  } else {
    content = (
      <View centerV centerH style={styles.emptyView}>
        <Text text65 style={{ fontWeight: "bold" }}>
          {isCurrentUser ? "You are " : user.displayName + " is "}not hosting
          any events.
        </Text>
      </View>
    );
  }
  return <View style={styles.container}>{content}</View>;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  emptyView: {
    color: Theme.secondary,
    marginTop: 25,
  },
});

export default connect(
  (state) => ({
    hostedEvents: state.hostedEvents,
    realm: state.realm,
  }),
  {
    getHostedEvents,
  }
)(ProfileHosted);
